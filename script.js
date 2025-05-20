// Lista de ciudades con sus coordenadas
const cities = [
    { name: 'Madrid', lat: 40.4165, lon: -3.7026 },
    { name: 'Barcelona', lat: 41.3851, lon: 2.1734 },
    { name: 'Valencia', lat: 39.4699, lon: -0.3763 },
    { name: 'Sevilla', lat: 37.3891, lon: -5.9845 },
    { name: 'Bilbao', lat: 43.2627, lon: -2.9253 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Rome', lat: 41.9028, lon: 12.4964 },
    { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
    { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 }
];

// API URL base
const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Elementos del DOM
const cityElement = document.getElementById('city');
const tempElement = document.getElementById('temp');
const descElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const iconElement = document.getElementById('weather-icon');
const changeButton = document.getElementById('changeCity');

// Función para obtener una ciudad aleatoria
function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
}

// Función para determinar el icono y la descripción según el código WMO
function getWeatherInfo(code) {
    const weatherCodes = {
        0: { description: 'Despejado', icon: '01d' },
        1: { description: 'Mayormente despejado', icon: '02d' },
        2: { description: 'Parcialmente nublado', icon: '03d' },
        3: { description: 'Nublado', icon: '04d' },
        45: { description: 'Niebla', icon: '50d' },
        48: { description: 'Niebla helada', icon: '50d' },
        51: { description: 'Llovizna ligera', icon: '09d' },
        53: { description: 'Llovizna moderada', icon: '09d' },
        55: { description: 'Llovizna intensa', icon: '09d' },
        61: { description: 'Lluvia ligera', icon: '10d' },
        63: { description: 'Lluvia moderada', icon: '10d' },
        65: { description: 'Lluvia fuerte', icon: '10d' },
        71: { description: 'Nieve ligera', icon: '13d' },
        73: { description: 'Nieve moderada', icon: '13d' },
        75: { description: 'Nieve fuerte', icon: '13d' },
        77: { description: 'Granizo', icon: '13d' },
        80: { description: 'Lluvia ligera', icon: '09d' },
        81: { description: 'Lluvia moderada', icon: '09d' },
        82: { description: 'Lluvia violenta', icon: '09d' },
        95: { description: 'Tormenta', icon: '11d' }
    };
    
    return weatherCodes[code] || { description: 'Desconocido', icon: '03d' };
}

// Función para obtener el tiempo
async function getWeather(city) {
    try {
        const response = await fetch(
            `${API_BASE_URL}?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&hourly=relativehumidity_2m`
        );
        
        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const data = await response.json();
        const currentHour = new Date(data.current_weather.time).getHours();
        const currentHumidity = data.hourly.relativehumidity_2m[currentHour];
        
        // Obtener información del tiempo según el código WMO
        const weatherInfo = getWeatherInfo(data.current_weather.weathercode);
        
        // Actualizar la interfaz
        cityElement.textContent = city.name;
        tempElement.textContent = Math.round(data.current_weather.temperature);
        descElement.textContent = weatherInfo.description;
        humidityElement.textContent = Math.round(currentHumidity);
        windElement.textContent = Math.round(data.current_weather.windspeed);
        iconElement.src = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo obtener la información del tiempo');
    }
}

// Event listener para el botón
changeButton.addEventListener('click', () => {
    const randomCity = getRandomCity();
    getWeather(randomCity);
});

// Cargar tiempo inicial
getWeather(getRandomCity());
