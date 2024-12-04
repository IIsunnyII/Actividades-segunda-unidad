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
                { name: "La anahuac", lng: -86.83366660190003, lat: 21.12979089809102 }, 
                { name: "La salle", lng:  -86.84739097552865, lat:21.053300019793912 },  
                { name: "Universidad Tecnologica De Cancun", lng:  -86.84695599087213, lat: 21.049756990120482 }, 
                { name: "Universidad Del Caribe", lng: -86.8234128846566 , lat: 21.200567043456715 },      
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
            <h2 className="text-center mt-4">Ubicaciones de Universidades más famosas de Cancún</h2>

            {/* Contenedor del mapa */}
            <div ref={mapContainer} style={{ flex: '1', width: "100%" }}></div>

            {/* Pie de página */}
            <footer className="footer bg-dark text-light py-3">
                <div className="container text-center">
                    <p>&copy; 2024 Sunny Store. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default ExampleMap;