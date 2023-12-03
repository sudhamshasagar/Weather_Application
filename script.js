const apiKey = 'da7f023b35c72183498d2e1484258830';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchElement = document.querySelector('.search input');
const searchIcon = document.querySelector('#searchBtn');

async function fetchWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    updateWeatherInfo(data);
}

function updateWeatherInfo(data) {
    const cityName = document.querySelector('.city');
    cityName.innerHTML = data.name;

    const temperature = document.querySelector('.temp');
    temperature.innerHTML = `${data.weather[0].main} ${Math.floor(data.main.temp)} °C`;

    document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity} %`;
    document.querySelector('.wspd').innerHTML = `Wind-Speed: ${data.wind.speed} Km/h`;

    const weatherImg = document.querySelector('.img');
    switch (data.weather[0].main) {
        case 'Clear':
            weatherImg.src = 'https://cdn-icons-png.flaticon.com/128/6974/6974833.png';
            break;
        case 'Clouds':
            weatherImg.src = 'https://cdn-icons-png.flaticon.com/128/1146/1146869.png';
            break;
        case 'Rain':
            weatherImg.src = 'https://cdn-icons-png.flaticon.com/128/8841/8841317.png';
            break;
        case 'Drizzle':
            weatherImg.src = 'https://cdn-icons-png.flaticon.com/128/3076/3076129.png';
            break;
        case 'Mist':
            weatherImg.src = 'https://cdn-icons-png.flaticon.com/128/4151/4151022.png';
            break;
        case 'Haze':
            weatherImg.src = 'https://cdn-icons-png.flaticon.com/128/6543/6543546.png';
            break;
        default:
            weatherImg.src = 'https://cdn-icons-png.flaticon.com/128/648/648198.png';
            break;
    }
}

searchIcon.addEventListener('click', () => {
    fetchWeather(searchElement.value);
});
searchElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeather(searchElement.value);
    }
});


// Get user's location and display weather info on page load
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const response = await fetch(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
            const data = await response.json();
            updateWeatherInfo(data);
        });
    }
});
