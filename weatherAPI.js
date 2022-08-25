
var city= "salt+lake+city";
var apiKey = '4d63ba9d93efddcbcaf8047f7d2ec8b0';
var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      console.log(data.main.feels_like);
    });

    // https://api.openweathermap.org/data/2.5/onecall?lat=40.7608&lon=111.8910&appid=4d63ba9d93efddcbcaf8047f7d2ec8b0 