import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function ExampleMap() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const myMap = useRef<Map | null>(null);
    const [coordinates, setCoordinates] = useState<{ lng: number; lat: number } | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoibmFodWkiLCJhIjoiY20yOTBiNjltMDBhYjJzcHk5MDdmc2xxNCJ9.mV_b0a8Xd74QivUBZqmADg";

        if (mapContainer.current) {
            myMap.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [-86.85161932680145, 21.165507646857648],
                zoom: 11,
            });

            const locations = [
                { name: "Walmart", lng: -86.85809521506769, lat: 21.151121382002085 },
                { name: "Soriana", lng: -86.91702604641601, lat: 21.13944783333148 },
                { name: "Chedraui", lng: -86.90607220522692, lat: 21.14866877628159 },
                { name: "Plaza las Américas", lng: -86.82343351573874, lat: 21.146037183959834 },
                { name: "La Isla Shopping Village", lng: -86.72962038288985, lat: 21.237626047243772 },
                { name: "Costsco", lng: -86.8352505957448, lat: 21.148308956390856 },
                { name: "Mega Soriana", lng: -86.8449470225075, lat: 21.153241685700525 },
                { name: "Liverpool", lng: -86.82143999784485, lat: 21.14720418543281 },
                { name: "Bodega Aurrerá", lng: -86.8885663680379, lat: 21.15852997913608 },
                { name: "Mercado 28", lng: -86.83444493198287, lat: 21.161370250220486 },
            ];

            locations.forEach((location) => {
                const marker = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([location.lng, location.lat])
                    .setPopup(new mapboxgl.Popup().setText(location.name))
                    .addTo(myMap.current as mapboxgl.Map);
            });

            myMap.current.on("click", (e) => {
                const { lng, lat } = e.lngLat;
                setCoordinates({ lng, lat });
                console.log({ lng, lat });
            });
        }

        return () => {
            if (myMap.current) {
                myMap.current.remove();
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Título sobre el mapa */}
            <h2 className="text-center mt-4">Ubicaciones de Sucursales más famosas de Cancún</h2>

            {/* Contenedor del mapa */}
            <div ref={mapContainer} style={{ flex: '1', width: "100%" }}></div>

            {/* Pie de página */}
            <footer className="footer bg-dark text-light py-3">
                <div className="container text-center">
                    <p>&copy; 2024 Market Foro. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default ExampleMap;