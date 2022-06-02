var APIKey = "6ca2b4a417c131dfd2fadd3234e442ea";
var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q=Charlotte&limit=5&appid=6ca2b4a417c131dfd2fadd3234e442ea"
// var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6ca2b4a417c131dfd2fadd3234e442ea`


// var APICall = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={6ca2b4a417c131dfd2fadd3234e442ea";
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


// var button = document.getElementById('search-button');
// var city;

var currentDate = moment().format("dddd, DD MMMM YYYY")
$("#display-data").html("Date: " + currentDate);


function init() {
    fetch(geoAPI)
    .then(function (response) {
        return response.json();
    }) 
    .then(function(data) {
        console.log(data[0].lat, data[0].lon);
        getOneCallWeather(data[0].lat, data[0].lon);
    });
}


function getOneCallWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6ca2b4a417c131dfd2fadd3234e442ea&units=imperial`)
    .then(function (response) {
        return response.json();
    }) 
    .then(function(data) {
        console.log(data);
        var currentTemp = data.current.temp;
        var currentHumidity = data.current.humidity;
        var currentWindSpeed = data.current.wind_speed;
        var currentUVI = data.current.uvi;
        var currentTempEl = document.createElement("p");
        var currentHumidityEl = document.createElement("p");
        var currentWindSpeedEl = document.createElement("p");
        var currentUVIEl = document.createElement("p");
        
        currentTempEl.textContent = "Temperature: " + currentTemp + " degrees F";
        currentWindSpeedEl.textContent = "Wind Speed: " + currentWindSpeed + " MPH";
        currentUVIEl.textContent = "UVI: " + currentUVI;
        currentHumidityEl.textContent = "Humidity: " + currentHumidity + " %";

        document.body.append(currentTempEl, currentWindSpeedEl, currentUVIEl, currentHumidityEl);

        for(var i = 0; i < 5; i++) {
            var day = data.daily[i];

        }
    

    })
}


// button.addEventListener('click', function () {
//     preventDefault()
//     var searchTextBox = $("textarea#form-input").val();
//     localStorage.setItem("city", searchTextBox);
//     console.log(searchTextBox);
// });

init();










// function init() {
//     fetch(geoAPI)
//     .then(function (response) {
//         return response.json();
//     }) 
//     .then(function(data) {
//         console.log(data[0].lat, data[0].lon);
//         getOneCallWeather(data[0].lat, data[0].lon);
//     });
// }


// function getOneCallWeather(lat, lon) {
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6ca2b4a417c131dfd2fadd3234e442ea&units=imperial`)
//     .then(function (response) {
//         return response.json();
//     }) 
//     .then(function(data) {
//         console.log(data);
//     })
// }
