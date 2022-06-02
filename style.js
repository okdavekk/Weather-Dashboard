var APIKey = "6ca2b4a417c131dfd2fadd3234e442ea";

var currentDate = moment().format("dddd, DD MMMM YYYY")
$("#display-date").html("Date: " + currentDate);

var button = document.getElementById("search-button");
console.log(button);


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
        var localTime = tempTime.toLocaleString()
        console.log(localTime);

        var currentTempD1 = nextDay.temp.day;
        var currentHumidityD1 = nextDay.humidity;
        var currentWindSpeedD1 = nextDay.wind_speed;
        var currentUVID1 = nextDay.uvi;

        var currentTempD1El = document.createElement("p");
        var currentHumidityD1El = document.createElement("p");
        var currentWindSpeedD1El = document.createElement("p");
        var currentUVID1El = document.createElement("p");

        currentTempD1El.textContent = "Temperature: " + currentTempD1 + " degrees F";
        currentWindSpeedD1El.textContent = "Wind Speed: " + currentWindSpeedD1 + " MPH";
        currentUVID1El.textContent = "UVI: " + currentUVID1;
        currentHumidityD1El.textContent = "Humidity: " + currentHumidityD1 + " %";

        document.body.append(currentTempD1El, currentWindSpeedD1El, currentUVID1El, currentHumidityD1El);

    }
}


button.addEventListener('click', function (event) {
    event.preventDefault()
    var searchBoxValue = document.getElementById("form-input").value;
    if (searchBoxValue != "") {
        init(searchBoxValue);
    }
});
