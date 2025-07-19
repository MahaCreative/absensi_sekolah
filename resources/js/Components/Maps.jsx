import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Perbaikan icon bawaan Leaflet agar marker muncul
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Fungsi untuk menghitung jarak antara dua koordinat menggunakan rumus Haversine
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius bumi dalam kilometer
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // dalam kilometer
    return distance;
};

export default function Peta({
    onOutsideRadius,
    setLocationSiswa,
    locationSiswa,
    lokasiSekolah,
}) {
    const [isOutsideRadius, setIsOutsideRadius] = useState(false);

    useEffect(() => {
        // Mendapatkan lokasi pengguna saat ini
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    setLocationSiswa({ lat: userLat, long: userLng });

                    const schoolLat = lokasiSekolah.lat;
                    const schoolLng = lokasiSekolah.long;

                    // Menghitung jarak antara lokasi pengguna dan sekolah
                    const distance = getDistance(
                        userLat,
                        userLng,
                        schoolLat,
                        schoolLng
                    );

                    // Mengecek apakah pengguna berada di luar radius 100 meter (0.1 km)
                    if (distance > 0.1) {
                        setIsOutsideRadius(true);
                        onOutsideRadius(true); // Mengirimkan state ke parent
                    } else {
                        setIsOutsideRadius(false);
                        onOutsideRadius(false); // Mengirimkan state ke parent
                    }
                },
                () => {
                    alert("Lokasi tidak dapat diakses");
                }
            );
        } else {
            alert("Geolocation tidak didukung di browser ini");
        }
    }, [onOutsideRadius, lokasiSekolah]);

    // Ganti ikon dengan gambar siswa
    const studentIcon = new L.Icon({
        iconUrl: "https://example.com/student-icon.png", // Ganti dengan URL gambar ikon siswa
        iconSize: [40, 40], // Ukuran ikon (lebar, tinggi)
        iconAnchor: [20, 40], // Titik referensi ikon (di bagian bawah)
        popupAnchor: [0, -40], // Jarak popup dari ikon
    });

    // const position = [-2.708641733413396, 118.84436823989057];

    return (
        <MapContainer
            center={[lokasiSekolah.lat, lokasiSekolah.long]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marker dengan ikon sekolah */}
            <Marker position={[lokasiSekolah.lat, lokasiSekolah.long]}>
                <Popup>
                    <p>SD Negeri Simbuang 2</p>
                </Popup>
            </Marker>

            {/* Lingkaran dengan radius 100 meter */}
            <Circle
                center={[lokasiSekolah.lat, lokasiSekolah.long]}
                radius={100}
                color="blue"
                fillColor="blue"
                fillOpacity={0.2}
            />

            {/* Marker lokasi pengguna jika tersedia */}
            {locationSiswa.lang ||
                (locationSiswa.long && (
                    <Marker
                        position={[locationSiswa.lat, locationSiswa.long]}
                        icon={studentIcon}
                    >
                        <Popup>
                            <p>Lokasi Pengguna</p>
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
}
