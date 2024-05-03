document.addEventListener("DOMContentLoaded", (event) => {

    // API key for OpenWeatherMap
    const apiKey = "907a69a22061e53fa4baf18b7ce1305d";
    // Base URL for OpenWeatherMap API
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?"
    // Temperature unit (metric for Celsius)
    const tempUnit = "metric"
    
    // Selecting necessary DOM elements
    const searchButton = document.querySelector(".search button");
    const searchText = document.querySelector(".search input");
    const weatherImg = document.querySelector(".weather-state-img img");
    
    // Object mapping weather states to image URLs
    const weatherstates = {
        "Clear": "images/clear.png",
        "Clouds": "images/clouds.png",
        "Rain": "images/rain.png",
        "Mist": "images/mist.png",
        "Drizzle": "images/drizzle.png",
        "Snow": "images/snow.png",
    }
    
    // Default city
    var city = "egypt";
    
    // Function to fetch weather data
    async function getWeatherData() {
        // Retrieve city from input field
        city = searchText.value;
    
        // Fetch weather data from API
        const response = await fetch(weatherApiUrl + "q=" + city + "&appid=" + apiKey + "&units=" + tempUnit);
    
        // If city not found, display error message
        if (response.status == 404) {
            document.querySelector(".error-message").style.display ="block";
            document.querySelector(".weather").style.display = "none";
        }
        // If city found, display weather information
        else {
            const apiData = await response.json();
    
            // Get weather state from API response
            apiWeatherimg = apiData.weather[0].main;
    
            // Set weather state image
            weatherImg.src = weatherstates[apiWeatherimg];
    
            // Display weather data
            document.querySelector(".city-name").innerHTML = apiData.name;
            document.querySelector(".weather-state-info .temperature").innerHTML = Math.round(apiData.main.temp) + "°C";
            document.querySelector(".weather-information .humidity-info .humidity").innerHTML = apiData.main.humidity + "%";
            document.querySelector(".wind-speed .speed").innerHTML = apiData.wind.speed + " Km/h";
    
            // Display weather section and hide error message
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error-message").style.display ="none";
    
        }
    }
    
    // Event listener for search button click
    searchButton.addEventListener("click", () => {
        getWeatherData();
    });
    
    // Event listener for pressing Enter key in search input
    searchText.addEventListener("keydown", (pressed) => {
        if (pressed.keyCode == 13) {
            searchButton.click();
        }
    })
    
});
