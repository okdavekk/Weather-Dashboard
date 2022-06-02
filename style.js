var APIKey = "6ca2b4a417c131dfd2fadd3234e442ea";

var currentDate = moment().format("MM/DD/YYYY")
$("#display-date").html("Date: " + currentDate);

var button = document.getElementById("search-button");


function init(city) {
    var geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6ca2b4a417c131dfd2fadd3234e442ea`
    fetch(geoAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0].lat, data[0].lon);
            getOneCallWeather(data[0].lat, data[0].lon);
        });
}


function getOneCallWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6ca2b4a417c131dfd2fadd3234e442ea&units=imperial&limit=5`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var currentDay = data.current;

            var currentTemp = currentDay.temp;
            var currentHumidity = currentDay.humidity;
            var currentWindSpeed = currentDay.wind_speed;
            var currentUVI = currentDay.uvi;

            var currentTempEl = document.createElement("p");
            var currentHumidityEl = document.createElement("p");
            var currentWindSpeedEl = document.createElement("p");
            var currentUVIEl = document.createElement("p");

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
        var currentUnixTimeStamp = nextDay.dt *1000; 

        var tempTime = new Date(currentUnixTimeStamp);
        var localTime = tempTime.toLocaleDateString()
        console.log(localTime);

        var nextDayTemp = nextDay.temp.day;
        var nextDayHumidity = nextDay.humidity;
        var nextDayWindSpeed = nextDay.wind_speed;
        var nextDayUVI = nextDay.uvi;

        var localTimeEl = document.createElement("p");
        var nextDayTempEl = document.createElement("p");
        var nextDayHumidityEl = document.createElement("p");
        var nextDayWindSpeedEl = document.createElement("p");

        localTimeEl.textContent = "Date: " + localTime;
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
});
