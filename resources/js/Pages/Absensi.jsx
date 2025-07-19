import CostumInput from "@/Components/CostumInput";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import useSweetAlertNotification from "@/Hook/useSweetAlertNotification";
import { Camera, PictureAsPdfOutlined, Refresh } from "@mui/icons-material";
import useSweetAlertFunction from "@/Hook/UseSweetAlertFunction";
import Maps from "@/Components/Maps";
import "moment/locale/id"; // Tambahkan locale Indonesia jika ingin pakai bahasa Indonesia
import { Link, router } from "@inertiajs/react";

export default function Absensi() {
    const [onOutsideRadius, setonOutsideRadius] = useState(false);
    const [locationSiswa, setLocationSiswa] = useState();
    const showAlert = useSweetAlertNotification();
    const showAlertFunction = useSweetAlertFunction();
    const webcamRef = useRef(null);
    const intervalRef = useRef(null); // untuk menyimpan interval agar tidak dobel
    const [data, setData] = useState(null);
    const [screenshot, setScreenshot] = useState(null);
    const [hasCaptured, setHasCaptured] = useState(false);
    const [load, setLoad] = useState(false);
    const [labeledDescriptor, setLabeledDescriptor] = useState(null);
    const [statusKenal, setStatusKenal] = useState(false);
    const canvasRef = useRef();
    const [countdown, setCountdown] = useState(0);
    const [detectionStatus, setDetectionStatus] = useState(
        "🔍 Mendeteksi wajah..."
    );
    const countdownRef = useRef(null);

    const [nis, setNis] = useState("");
    const checkSiswa = async () => {
        // router.get(route("get-absensi-mapel"), { nis: nis });
        if (onOutsideRadius == false) {
            setLoad(true);
            try {
                const response = await axios.get(
                    route("get-absensi-mapel", {
                        nis: nis,
                    })
                );

                setData(response.data);
                showAlert(
                    "success",
                    "Siswa Ditemukan",
                    "Silakan berdiri di depan kamera dengan wajah terlihat jelas. Jangan bersama orang lain di frame. Sistem akan menghitung mundur selama 10 detik setelah wajah terdeteksi. Tetap diam selama proses berlangsung."
                );
                setLoad(false);
            } catch (err) {
                setLoad(false);

                setData(null);
                showAlert(
                    err.response.data.type,
                    "Error",
                    err.response.data.message
                );
            }
        } else {
            showAlert(
                "error",
                "Error",
                "Ups... anda tidak bisa melakukan absen karena anda tidak berada pada jarak 100 meter pada lokasi sekolah. silahkan pergi kesekolah untuk melakukan absen"
            );
        }
    };

    const capture = async () => {
        setLoad(true);
        const imageSrc = webcamRef.current.getScreenshot();
        setHasCaptured(true);
        setScreenshot(imageSrc);
        // setScreenshot(
        //     "/storage/profile/siswa/Chelsie Daugherty/Chelsie Daugherty_0.jpg"
        // );
        console.log(data.foto);

        const descriptor = await loadLabeledImages(data.foto, data.nama_siswa);
        setLabeledDescriptor(descriptor);
    };
    // face api function
    // load models
    useEffect(() => {
        async function loadModels() {
            try {
                await Promise.all([
                    faceapi.nets.ageGenderNet.loadFromUri("/models"),
                    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
                    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                ]);
            } catch (error) {
                console.error("❌ Gagal memuat model:", error);
            }
        }
        loadModels();
    }, []);
    // end load models
    const startFaceDetection = () => {
        const interval = setInterval(async () => {
            if (
                !webcamRef.current ||
                !webcamRef.current.video ||
                webcamRef.current.video.readyState !== 4
            ) {
                return;
            }

            const video = webcamRef.current.video;
            const canvas = canvasRef.current;
            const displaySize = {
                width: video.videoWidth,
                height: video.videoHeight,
            };

            faceapi.matchDimensions(canvas, displaySize);

            const detections = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions()
                .withFaceDescriptors();

            const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
            );
            canvas
                .getContext("2d")
                .clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);

            if (detections.length === 0) {
                setDetectionStatus("🚫 Tidak ada wajah terdeteksi.");
                stopCountdown();
            } else if (detections.length > 1) {
                setDetectionStatus("⚠️ Terdeteksi lebih dari satu wajah!");
                stopCountdown();
            } else {
                setDetectionStatus("✅ Wajah terdeteksi. Tunggu 10 detik...");
                if (countdown === 0) startCountdown();
            }
        }, 500);

        return () => clearInterval(interval); // Cleanup
    };

    const startCountdown = () => {
        if (intervalRef.current || hasCaptured) return;

        let timeLeft = 10;
        setCountdown(timeLeft);

        intervalRef.current = setInterval(() => {
            timeLeft -= 1;
            setCountdown(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                capture();
                setHasCaptured(true);
            }
        }, 1000);
    };

    const stopCountdown = () => {
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
            setCountdown(0);
        }
    };

    const loadLabeledImages = async (fotoArray, label) => {
        const descriptions = [];

        for (let fotoObj of fotoArray) {
            const imageUrl = `/storage/${fotoObj.foto}`;

            const img = await faceapi.fetchImage(imageUrl);

            const detection = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (detection) {
                descriptions.push(detection.descriptor);
            }
        }

        return new faceapi.LabeledFaceDescriptors(label, descriptions);
    };

    const handleCheckFace = async () => {
        if (!labeledDescriptor) {
            return;
        }

        if (!screenshot) {
            alert("Gambar screenshot belum tersedia!");
            return;
        }

        try {
            const img = await faceapi.fetchImage(screenshot); // Gambar yang diambil
            const detection = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection) {
                setLoad(false);
                setStatusKenal(false);
                showAlertFunction(
                    "Error",
                    "error",
                    "Tidak ada wajah yang di deteksi kamera, silahkan lakukan pengambilan gambar ulang",
                    "Ulangi",
                    () => {
                        setData(null);
                        setScreenshot(null);
                    },
                    () => {}
                );
            }

            const matcher = new faceapi.FaceMatcher([labeledDescriptor], 0.6);
            const match = matcher.findBestMatch(detection.descriptor);
            alert(match.label + " ----- " + labeledDescriptor.label);
            if (match.label === labeledDescriptor.label) {
                setLoad(false);
                setStatusKenal(true);
                showAlertFunction(
                    "Sukses",
                    "success",
                    `Wajah dikenali. ${labeledDescriptor.label}, silahkan menekan tombol kirim absensi untuk melakukan absen`,
                    "Kirim Absensi",
                    async () => {
                        await kirimAbsensi();
                    },
                    () => {
                        // takeAgain();
                    }
                );
            } else {
                setLoad(false);
                setStatusKenal(false);
                showAlertFunction(
                    "Error",
                    "error",
                    "Wajah terdeteksi namun, wajah tidak dikenali oleh sistem" +
                        error.message,
                    "Ulangi Absensi",
                    () => {
                        takeAgain();
                    },
                    () => {
                        takeAgain();
                    }
                );
            }
        } catch (error) {
            showAlertFunction(
                "Error",
                "error",
                "Terjadi kesalahan saat memverifikasi wajah. " + error.message,
                "Ulangi",
                () => {
                    takeAgain();
                },
                () => {
                    takeAgain();
                }
            );
            setStatusKenal(false);
            setLoad(false);
        }
    };

    useEffect(() => {
        handleCheckFace();
    }, [labeledDescriptor]);

    const takeAgain = () => {
        setHasCaptured(false);
        setData(null);
        setScreenshot(null);
        setStatusKenal(false);
    };
    const kirimAbsensi = async () => {
        router.post(route("siswa.store-absensi"), {
            ...data,
            nis: nis,
            screenshot: screenshot,
            lat: locationSiswa.lat,
            lng: locationSiswa.lng,
        });
        // try {
        //     const response = await axios.post(route("siswa.store-absensi"), {
        //         ...data,
        //         nis: nis,
        //         screenshot: screenshot,
        //         lat: locationSiswa.lat,
        //         lng: locationSiswa.lng,
        //     });
        //     showAlert(
        //         err.response.data.type,
        //         err.response.data.tpe,
        //         err.response.data.message
        //     );
        //     takeAgain();
        // } catch (err) {
        //     showAlert(
        //         err.response.data.type,
        //         err.response.data.tpe,
        //         err.response.data.message
        //     );
        // }
    };
    return (
        <div>
            <div className="w-full h-[1100px] lg:h-[685px] flex gap-x-3 items-start bg-red-500 bg-[url('/storage/Image/bg.jpg')] bg-right-bottom bg-cover md:bg-cover overflow-y-auto overflow-x-hidden">
                <div className="w-full h-[920px] lg:h-[685px] absolute top-0 left-0 bg-black/30">
                    <div className=" w-full h-full flex flex-col md:flex-row items-center justify-start md:justify-center py-16 z-10 gap-6">
                        {data && (
                            <div className="w-full h-full flex  flex-col justify-center items-center px-8">
                                <div className="h-[98%]  rounded-md drop-shadow-md relative">
                                    {screenshot ? (
                                        <img
                                            src={screenshot}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <Webcam
                                                ref={webcamRef}
                                                audio={false}
                                                screenshotFormat="image/jpeg"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                                onUserMedia={startFaceDetection} // Trigger detection on webcam ready
                                            />
                                            <canvas
                                                ref={canvasRef}
                                                className="absolute top-0 left-0"
                                                width={640}
                                                height={480}
                                            />
                                        </>
                                    )}

                                    <div className="absolute top-0 left-0 w-full h-full bg-black/10 flex flex-col items-center justify-end">
                                        {hasCaptured == false ? (
                                            <button
                                                onClick={capture}
                                                className="w-16 h-16 bg-black hover:opacity-50 rounded-full my-6 flex flex-col justify-center items-center drop-shadow-sm"
                                            >
                                                <div className="h-14 w-14 rounded-full bg-white flex justify-center items-center">
                                                    <Camera />
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={takeAgain}
                                                className="w-16 h-16 bg-black hover:opacity-50 rounded-full my-6 flex flex-col justify-center items-center drop-shadow-sm"
                                            >
                                                <div className="h-14 w-14 rounded-full bg-white flex justify-center items-center">
                                                    <Refresh />
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                    {/* Pesan Deteksi */}
                                    <div className="absolute top-4 left-4 text-white bg-black/60 px-4 py-2 rounded">
                                        {detectionStatus}
                                        {countdown > 0 && (
                                            <div className="mt-1 text-xl font-bold">
                                                ⏳ {countdown}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="w-full h-screen flex flex-col justify-center items-center px-8">
                            <div className="w-full">
                                <h1 className="text-white text-2xl md:text-4xl tracking-tighter font-extrabold">
                                    Selamat Datang Di
                                </h1>
                                <p className="text-xl text-white tracking-tighter">
                                    Sistem Informasi Absensi Berbasis Face
                                    Recognition
                                </p>
                                <h1 className="text-white text-5xl md:text-7xl tracking-tighter font-extrabold">
                                    SDN Simbuang 2
                                </h1>
                            </div>
                            <div className="bg-white/80 py-2 px-3 rounded-md drop-shadow-md my-2 w-full relative">
                                {data?.status && (
                                    <p
                                        className={`${
                                            data?.status == "ontime"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        } text-white absolute bottom-2 right-2 py-2 px-3 rounded-md uppercase `}
                                    >
                                        Absen {data?.status}
                                    </p>
                                )}
                                <div className="flex flex-row gap-x-4 items-center justify-between">
                                    <h1>
                                        Pastikan data yang tampil adalah diri
                                        anda, dan jam sesuai dengan mata
                                        pelajaran yang saat ini berlangsung
                                    </h1>
                                    <Link
                                        href={route("login")}
                                        className="bg-blue-600 text-white py-2 px-3 drop-shadow-sm rounded-md text-xs tracking-tighter text-center font-bold"
                                    >
                                        Login Admin/Guru
                                    </Link>
                                </div>
                                <div className="py-3">
                                    <CostumInput
                                        name="nis"
                                        value={nis}
                                        onChange={(e) => {
                                            setNis(e.target.value);
                                        }}
                                        placeHolder="Masukkan Nis Untuk Proses Absensi"
                                        className={"w-full"}
                                    />
                                </div>
                                <div className="bg-slate-950 py-2 px-3 my-3 rounded-md">
                                    <h1 className="text-white">
                                        Informasi Siswa Dan Jam Mata Pelajaran
                                    </h1>
                                    <div className="text-white text-sm">
                                        <div className="  flex items-center">
                                            <p className="w-[150px]">
                                                Tanggal Absensi
                                            </p>
                                            <span className="w-[10px]">:</span>
                                            <span>
                                                {moment(new Date())
                                                    .locale("id")
                                                    .format("LLLL")}
                                            </span>
                                        </div>
                                        <div className="  flex items-center">
                                            <p className="w-[150px]">
                                                Nama Siswa
                                            </p>
                                            <span className="w-[10px]">:</span>
                                            <span>{data?.nama_siswa}</span>
                                        </div>
                                        <div className="  flex items-center">
                                            <p className="w-[150px]">Kelas</p>
                                            <span className="w-[10px]">:</span>
                                            <span>{data?.kelas}</span>
                                        </div>
                                        <div className="  flex items-center">
                                            <p className="w-[150px]">
                                                Nama Mapel
                                            </p>
                                            <span className="w-[10px]">:</span>
                                            <span>{data?.mapel}</span>
                                        </div>
                                        <div className="  flex items-center">
                                            <p className="w-[150px]">Guru</p>
                                            <span className="w-[10px]">:</span>
                                            <span>{data?.guru}</span>
                                        </div>
                                        <div className="  flex items-center">
                                            <p className="w-[150px]">
                                                Jam Masuk
                                            </p>
                                            <span className="w-[10px]">:</span>
                                            <span>{data?.jam_masuk}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => checkSiswa()}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md drop-shadow-md"
                                >
                                    Check Siswa
                                </button>
                                {statusKenal && (
                                    <button
                                        onClick={() => kirimAbsensi()}
                                        className="mx-2 bg-green-500 text-white py-2 px-4 rounded-md drop-shadow-md"
                                    >
                                        Kirim Absen
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 w-full h-[300px] relative -z-[50]">
                        <Maps
                            onOutsideRadius={setonOutsideRadius}
                            setLocationSiswa={setLocationSiswa}
                        />
                    </div>
                </div>

                {/* loading */}
                {load && (
                    <div className="absolute z-[9999] top-0 left-0 w-full h-screen bg-slate-950/50 backdrop-blur-sm flex justify-center items-center flex-col">
                        <img src="/loading.gif" alt="" className="w-[250px]" />
                        <p className="text-white text-3xl font-bold tracking-tighter text-center my-4 animate-pulse">
                            LOADING...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
