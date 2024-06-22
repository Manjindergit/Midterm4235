// Function to calculate the haversine distance between two coordinates
//https://www.movable-type.co.uk/scripts/latlong.html
export function haversineDistance(coords1, coords2) {
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
