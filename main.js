import { initMap } from './js/map.js';
import { haversineDistance } from './js/haversine.js';
import { handleLocationError } from './js/errorHandler.js';

// Coordinates for KPU Surrey Library
const kpuSurreyLibrary = [49.132155392371075, -122.87096064785433];

// Initialize the map and set up event listeners for geolocation
window.onload = () => initMap(kpuSurreyLibrary, haversineDistance, handleLocationError);
