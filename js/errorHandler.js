// Function to handle geolocation errors
export function handleLocationError(browserHasGeolocation) {
    const infoElement = document.getElementById("info");
    infoElement.innerHTML = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";
}
