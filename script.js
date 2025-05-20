// Lista de ciudades grandes del mundo
const cities = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao',
    'Paris', 'London', 'New York', 'Tokyo', 'Sydney',
    'Rome', 'Berlin', 'Moscow', 'Dubai', 'Singapore',
    'Toronto', 'Amsterdam', 'Oslo', 'Stockholm', 'Vienna'
];

// Tu API key de OpenWeatherMap (reemplaza esto con tu propia API key)
const API_KEY = 'YOUR_API_KEY';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

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

// Función para obtener el tiempo
async function getWeather(city) {
    try {
        const response = await fetch(
            `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`
        );
        
        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        const data = await response.json();
        
        // Actualizar la interfaz
        cityElement.textContent = data.name;
        tempElement.textContent = Math.round(data.main.temp);
        descElement.textContent = data.weather[0].description;
        humidityElement.textContent = data.main.humidity;
        windElement.textContent = Math.round(data.wind.speed * 3.6); // Convertir m/s a km/h
        iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

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
