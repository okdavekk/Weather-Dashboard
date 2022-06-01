var APIKey = "6ca2b4a417c131dfd2fadd3234e442ea";
var geoAPI = "http://api.openweathermap.org/geo/1.0/direct?q=Charlotte&limit=5&appid=6ca2b4a417c131dfd2fadd3234e442ea"
// var oneCallAPI = "`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6ca2b4a417c131dfd2fadd3234e442ea`"

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
    })
}

init();