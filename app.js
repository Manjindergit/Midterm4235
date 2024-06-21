// Coordinates for KPU Surrey Library
const kpuSurreyLibrary = [49.13204028085656, -122.87139007794727];

function initMap() {
    // Initialize the map centered at KPU Surrey Library with a zoom level of 15
    const map = L.map('map').setView(kpuSurreyLibrary, 15);

    // Add OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for KPU Surrey Library and bind a popup to it
    const libraryMarker = L.marker(kpuSurreyLibrary).addTo(map)
        .bindPopup('KPU Surrey Library')
        .openPopup();

    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        // If supported, get the user's current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // User's current location
                const userLocation = [position.coords.latitude, position.coords.longitude];

                // Add a marker for the user's location with a custom icon and bind a popup to it
                const userMarker = L.marker(userLocation, { 
                    icon: L.icon({ 
                        iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png', 
                        iconSize: [25, 41], 
                        iconAnchor: [12, 41], 
                        popupAnchor: [1, -34], 
                        shadowSize: [41, 41] 
                    }) 
                }).addTo(map)
                    .bindPopup('Your Location')
                    .openPopup();

                // Center the map on the user's location
                map.setView(userLocation, 15);

                // Display the user's location coordinates in the HTML element with ID 'your-location'
                document.getElementById("your-location").textContent = `${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}`;

                // Calculate the distance between the user's location and KPU Surrey Library using the Haversine formula
                const distance = haversineDistance(userLocation, kpuSurreyLibrary).toFixed(2);
                // Display the calculated distance in the HTML element with ID 'distance'
                document.getElementById("distance").textContent = distance;
            },
            () => {
                // Handle geolocation error if permission is denied or there's an issue retrieving location
                handleLocationError(true);
            }
        );
    } else {
        // Handle case where browser does not support geolocation
        handleLocationError(false);
    }
}

// Function to calculate the Haversine distance between two sets of coordinates
function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return (x * Math.PI) / 180;
    }

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coords2[0] - coords1[0]); // Convert latitude difference to radians
    const dLon = toRad(coords2[1] - coords1[1]); // Convert longitude difference to radians
    const lat1 = toRad(coords1[0]); // Convert first latitude to radians
    const lat2 = toRad(coords2[0]); // Convert second latitude to radians

    // Apply the Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

// Function to handle errors related to geolocation
function handleLocationError(browserHasGeolocation) {
    const infoElement = document.getElementById("info");
    infoElement.innerHTML = browserHasGeolocation
        ? "Error: The Geolocation service failed." // If geolocation service failed
        : "Error: Your browser doesn't support geolocation."; // If browser does not support geolocation
}

// Initialize the map when the window loads
window.onload = initMap;
