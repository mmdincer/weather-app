let lat;
let lon;

document.querySelector("#btnLocation").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            const weatherapi_key = "key";
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            let country; 
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherapi_key}`;
            fetchWeather1(weatherApiUrl, );
        });
    }
});

document.querySelector("#btnSearch").addEventListener("click", () => {
    const cageapi_key = `key`;
    const cityName = document.querySelector("#cityInput").value;
    const cage_url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${cageapi_key}`;
    fetch(cage_url)
        .then(response => response.json())
        .then(data => {
            const weatherapi_key = "key";
            const result = data.results[0];
            lat = result.geometry.lat;
            lon = result.geometry.lng;
            weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherapi_key}`;
            fetchWeather2(weatherApiUrl, cityName);
        })
        .catch(error => {
            showError("Şehir bilgileri alınamadı.");
        });
})


function fetchWeather1(api) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            country = data.sys.country; 
            const city = data.name;
            const desc = data.weather[0].description;
            const temp = (data.main.temp - 273.15).toFixed(1);
            const wind = data.wind.speed;
            document.querySelector(".card-title").innerText = `${city}`;
            document.querySelector("#description").innerText = `Description: ${desc}`;
            document.querySelector("#temp").innerText = `Temp: ${temp}`;
            document.querySelector("#wind").innerText = `Wind Speed: ${wind}`;
    
            const countryApiUrl = `https://restcountries.com/v3.1/alpha/${country}`;
            return fetch(countryApiUrl);
        })
        .then(resp => resp.json())
        .then(countryData => {
            const img = countryData[0].flags.png;
            document.querySelector("#flag").src = img;
            document.querySelector(".card").style.display = "inline";
        })
        .catch(error => {
            showError("Hava durumu bilgileri alınamadı.");
        });
}

function fetchWeather2(api, city) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            country = data.sys.country; 
            const desc = data.weather[0].description;
            const temp = (data.main.temp - 273.15).toFixed(1);
            const wind = data.wind.speed;
            document.querySelector(".card-title").innerText = `${city}`;
            document.querySelector("#description").innerText = `Description: ${desc}`;
            document.querySelector("#temp").innerText = `Temp: ${temp}`;
            document.querySelector("#wind").innerText = `Wind Speed: ${wind}`;
    
            const countryApiUrl = `https://restcountries.com/v3.1/alpha/${country}`;
            return fetch(countryApiUrl);
        })
        .then(resp => resp.json())
        .then(countryData => {
            const img = countryData[0].flags.png;
            document.querySelector("#flag").src = img;
            document.querySelector(".card").style.display = "inline";
        })
        .catch(error => {
            showError("Hava durumu bilgileri alınamadı.");
        });
}

function showError(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;

    document.body.appendChild(errorElement);

    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        document.querySelector("#btnSearch").click();
    }
}
