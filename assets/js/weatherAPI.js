
var apiCity = "seattle";
var weatherAPIKey = '4d63ba9d93efddcbcaf8047f7d2ec8b0';
var requestUrl;
var latitude;
var longitude;

let currentCityWeather = {};
let weatherObject = {};


async function getWeather(city) {

  apiCity = city;

  requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;



  currentCityWeather = await fetch(requestUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
      

      return data;

      

    });



}

async function renderWeather(city){
  apiCity = city;
  await getWeather(apiCity);

  // console.log(currentCityWeather);

  weatherObject = {
    city: apiCity,
    currentTemp: currentCityWeather.main.temp,
    minTemp: currentCityWeather.main.temp_min,
    maxTemp: currentCityWeather.main.temp_max,
    weatherDescription: currentCityWeather.weather[0].description
  }

  return weatherObject;

}

// console.log(renderWeather("los+angeles"));





async function getWeatherLatLon(lat,lon) {

  

  requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

  

  currentCityWeather = await fetch(requestUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
      

      return data;

      

    });



}




async function renderWeatherLatLon(lat,lon){
  latitude = lat;
  longitude = lon;
  await getWeatherLatLon(latitude,longitude);

  // console.log(currentCityWeather);

  weatherObject = {
    city: currentCityWeather.name,
    currentTemp: currentCityWeather.main.temp,
    minTemp: currentCityWeather.main.temp_min,
    maxTemp: currentCityWeather.main.temp_max,
    weatherDescription: currentCityWeather.weather[0].description
  }

  return weatherObject;

}

// console.log(renderWeatherLatLon(34.0522,-118.2437));




