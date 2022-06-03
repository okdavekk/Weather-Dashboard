var keyAPI = "6ca2b4a417c131dfd2fadd3234e442ea";

var currentDate = moment().format("MM/DD/YYYY")
$("#display-date").html("Today's Forecast: " + currentDate);

var button = document.getElementById("search-button");


function init(city) {
    var geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=` + keyAPI;
    fetch(geoAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getOneCallWeather(data[0].lat, data[0].lon);

            var cityName = document.getElementById("form-input").value;

            var cityNameDisplay = document.getElementById("city-name");
            cityNameDisplay.innerHTML = cityName;


        });
}

function getOneCallWeather(lat, lon) {
    var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&limit=5&appid=` + keyAPI;
    fetch(oneCallAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentDay = data.current;

            // var currentWeatherIcon = currentDay.icon;
            var currentTemp = currentDay.temp;
            var currentHumidity = currentDay.humidity;
            var currentWindSpeed = currentDay.wind_speed;
            var currentUVI = currentDay.uvi;

            // var currentWeatherIconEl = document.createElement("div");
            var currentTempEl = document.createElement("div");
            var currentHumidityEl = document.createElement("div");
            var currentWindSpeedEl = document.createElement("div");
            var currentUVIEl = document.createElement("div");


            if (currentUVI <= 2) {
                currentUVIEl.style.backgroundColor = "green";
            } else if (currentUVI >= 8) {
                currentUVIEl.style.backgroundColor = "red";
            } else if (currentUVI > 2 < 8) {
                currentUVIEl.style.backgroundColor = "yellow";
            }

            // currentWeatherIconEl.innerHTML = currentWeatherIcon;
            currentTempEl.textContent = "Temperature: " + currentTemp + " degrees F";
            currentWindSpeedEl.textContent = "Wind Speed: " + currentWindSpeed + " MPH";
            currentUVIEl.textContent = "UVI: " + currentUVI;
            currentHumidityEl.textContent = "Humidity: " + currentHumidity + " %";

            document.body.append(currentTempEl, currentWindSpeedEl, currentUVIEl, currentHumidityEl);

            renderForecast(data.daily);
        })
}


function renderForecast(forecastData) {
    for (var i = 0; i < 5; i++) {
        var nextDay = forecastData[i + 1];
        var currentUnixTimeStamp = nextDay.dt * 1000;

        var tempTime = new Date(currentUnixTimeStamp);
        var localTime = tempTime.toLocaleDateString()

        var nextDayTemp = nextDay.temp.day;
        var nextDayHumidity = nextDay.humidity;
        var nextDayWindSpeed = nextDay.wind_speed;

        var localTimeEl = document.createElement("h3");
        var nextDayTempEl = document.createElement("div");
        var nextDayHumidityEl = document.createElement("div");
        var nextDayWindSpeedEl = document.createElement("div");

        localTimeEl.textContent = "Forecast for: " + localTime;
        nextDayTempEl.textContent = "Temperature: " + nextDayTemp + " degrees F";
        nextDayWindSpeedEl.textContent = "Wind Speed: " + nextDayWindSpeed + " MPH";
        nextDayHumidityEl.textContent = "Humidity: " + nextDayHumidity + " %";

        document.body.append(localTimeEl, nextDayTempEl, nextDayWindSpeedEl, nextDayHumidityEl);

    }
}


button.addEventListener('click', function (event) {
    event.preventDefault()
    var searchBoxValue = document.getElementById("form-input").value;
    if (searchBoxValue != "") {
        init(searchBoxValue);
    }
    var cityName = document.getElementById("form-input").value;
    localStorage.setItem("City", cityName);
});


function getItemsFromStorage() {
    var cityName = localStorage.getItem("City");
    var citySearchHistory = document.getElementById("city-search-history");
    citySearchHistory.innerHTML = cityName;

}
getItemsFromStorage();

