import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FrozenBull_SecondLogo } from '../../assets/images';
import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

const location = [35.898419, 128.515906];

export default function Map() {
// 📡 Custom marker icon com imagem

const customIcon = L.icon({
    iconUrl: FrozenBull_SecondLogo,
    iconSize: [48, 48], // Tamanho do ícone
    iconAnchor: [24, 48], // Ponto de ancoragem
    popupAnchor: [0, -48], // Posição do popup
    className: 'map-marker-icon'
});

return (
    <div style={{ height: '20.8333vw', width: '20.8333vw' }}>
        <MapContainer
            center={location}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} icon={customIcon}>
                <Popup>
                    <img
                        src={FrozenBull_SecondLogo}
                        alt="Local"
                        style={{ width: '120px', height: 'auto', borderRadius: '8px' }}
                    />
                </Popup>
            </Marker>
        </MapContainer>
    </div>
);
}
