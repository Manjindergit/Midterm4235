const kpuSurreyLibrary = [49.1332, -122.8890];

function initMap() {
    const map = L.map('map').setView(kpuSurreyLibrary, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const libraryMarker = L.marker(kpuSurreyLibrary).addTo(map)
        .bindPopup('KPU Surrey Library')
        .openPopup();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = [position.coords.latitude, position.coords.longitude];

                const userMarker = L.marker(userLocation, { icon: L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map)
                    .bindPopup('Your Location')
                    .openPopup();

                map.setView(userLocation, 15);

                document.getElementById("your-location").textContent = `${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}`;

                const distance = haversineDistance(userLocation, kpuSurreyLibrary).toFixed(2);
                document.getElementById("distance").textContent = distance;
            },
            () => {
                handleLocationError(true);
            }
        );
    } else {
        handleLocationError(false);
    }
}

function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return (x * Math.PI) / 180;
    }

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coords2[0] - coords1[0]);
    const dLon = toRad(coords2[1] - coords1[1]);
    const lat1 = toRad(coords1[0]);
    const lat2 = toRad(coords2[0]);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function handleLocationError(browserHasGeolocation) {
    const infoElement = document.getElementById("info");
    infoElement.innerHTML = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";
}

window.onload = initMap;
