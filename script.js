// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

var APIKey= "07a5fce6974956268351636ee14cf6ae";
var searchBtn = document.querySelector(".btn");

function weatherSearch () {
    var city =document.querySelector("#cityInput");
    var searchInputValue = city.value
    var requestUrl= 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInputValue + '&units=imperial&appid=07a5fce6974956268351636ee14cf6ae' 
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputValue + '&cnt=&units=imperial&appid=07a5fce6974956268351636ee14cf6ae'
    

    fetch (requestUrl) 
    .then(function (response){
        return response.json();
    })
    // WHEN I view current weather conditions for that city
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    .then(function (data) {
        // console.log(data)
        var today = document.querySelector("#todayDate")
        var temp = document.querySelector("#currentTemp")
        var feels = document.querySelector("#feelsLike")
        var icon = data.weather[0].icon
        var iconUrl = "<img src ='http://openweathermap.org/img/wn/" + icon + ".png' alt='Icon depicting current weather.'>";
        // console.log(iconUrl)
        document.querySelector("#conditionsIcon").innerHTML =iconUrl
        var humidity = document.querySelector("#humidity")
        var speed = document.querySelector("#windSpeed")

        
        today.textContent = moment().format("MMM Do YY" )+ data.name;
        temp.textContent = "The current temperature is " + data.main.temp;
        feels.textContent = "It feels like " + data.main.feels_like;
        humidity.textContent = "Humidity is " + data.main.humidity +"%";
        speed.textContent = "Winds are blowing at " + data.wind.speed;
    });
    // WHEN I view future weather conditions for that city
    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    fetch (forecastUrl)
    .then (function (response){
        return response.json()
    })

    .then(function(data){
        console.log(data)
        // for (let i = 0; i < data.list.length; i+=8){
        var forecastDay = document.querySelector("#forecastDate");
        var forecastIcon = data.list[7].weather[0].icon;
        var iconUrl = "<img src ='http://openweathermap.org/img/wn/" + forecastIcon + ".png' alt='Icon depicting current weather.'>";
        document.querySelector("#forecastIcon").innerHTML =iconUrl
        var forecastTemp = document.querySelector("#forecastTemperature");
        var forecastWind = document.querySelector("#forecastWinds");
        var forecastHumidity = document.querySelector("#forecastHumidity");

        forecastDay.textContent = "The weather for " + moment().format('dddd') + " in " + data.city.name;
        forecastTemp.textContent = "The temp for this day is " + data.list[i].main.temp;
        forecastWind.textContent= "Winds will be blowing at " + data.list[i].wind.speed;
        forecastHumidity.textContent= "Humidity is expected to be at " + data.list[i].main.humidity + "%";
        
    });
}
searchBtn.addEventListener("click", weatherSearch)
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// function renderLastSearch(){
//     var input = localStorage.getItem ("#cityInput")

// }



// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// this no longer available or provided by the api

