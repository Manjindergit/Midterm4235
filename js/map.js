// Function to initialize the map
export function initMap(kpuSurreyLibrary, haversineDistance, handleLocationError) {
    let map = L.map("map").setView(kpuSurreyLibrary, 15);

    let userMarker;
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for KPU Surrey Library
    const libraryMarker = L.marker(kpuSurreyLibrary)
        .addTo(map)
        .bindPopup("KPU Surrey Library")
        .openPopup();

    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                const userLocation = [
                    position.coords.latitude,
                    position.coords.longitude,
                ];

                // Add a marker for the user's location
                if (!userMarker) {
                    userMarker = L.marker(userLocation, { icon: L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map)
                        .bindPopup('Your Location')
                        .openPopup();
                } else {
                    userMarker.setLatLng(userLocation);//update the marker
                }


                // Display the user's coordinates
                document.getElementById("your-location").textContent = `${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}`;

                // Calculate and display the distance to KPU Surrey Library
                const distance = haversineDistance(userLocation, kpuSurreyLibrary).toFixed(2);
                document.getElementById("distance").textContent = distance;
            },
            () => {
                // Handle location errors
                handleLocationError(true);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
        );
    } else {
        // Handle browser not supporting geolocation
        handleLocationError(false);
    }
}
