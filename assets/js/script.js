var apiCity = 'seattle';
var WeatherApiKey = '4d63ba9d93efddcbcaf8047f7d2ec8b0';
var requestUrl;
var latitude;
var longitude;

let currentCityWeather = {};
let weatherObject = {};

// End of weather api variables


var firewood = document.getElementById('firewood');
var showers = document.getElementById('showers');
var laundry = document.getElementById('laundry');
var Dropdown = document.getElementById('state');
var button = document.getElementById('button');
var apiKey = '6pJRVZpzh01tEktlNNLSmI1hVw5wXNTOuoca58uW';
var stateCode = '';
var state = '&api_key=';
var stateNameArray = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
var stateCodeArray = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

var requestUrl =
  'https://developer.nps.gov/api/v1/campgrounds/?statecode=' +
  stateCode +
  state +
  apiKey;

// todo var createDiv = $('<div>').addClass(
//   ' box column has-background-primary is-size-2 is-2 has-text-centered'
// );

// Campground API fetch request function
function getApi() {
  // console.log(Dropdown.value);

  var index = stateNameArray.indexOf(Dropdown.value);
  // console.log(stateCodeArray[index]);
  stateCode = stateCodeArray[index];
  var requestUrl =
    'https://developer.nps.gov/api/v1/campgrounds/?statecode=' +
    stateCode +
    state +
    apiKey;
  console.log(stateCode);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayData(data);
    });
}
// firewood option
var displayData = function (data) {
  console.log(data);
  // var firewoodSale = data.amenities.firewoodForSale;
  // console.log(firewoodSale);
  // console.log(data.data[i]);
  for (let i = 0; i < data.data.length; i++) {
    // console.log(data.data[i].amenities.firewoodForSale);
    // * looking for firewood available for purchase
    if (data.data[i].amenities.firewoodForSale.includes('Yes')) {
      // console.log(data.data[i]);
      // * looking for showers
    } else if (
      data.data[i].amenities.showers[0] !== 'None' &&
      data.data[i].amenities.showers.length
    ) {
      // console.log(data.data[i]);
      // *looking for cellphone reception
    } else if (data.data[i].amenities.cellPhoneReception.includes('Yes')) {
      // console.log(data.data[i]);
    }
  }
};



// Weather api functions

async function getWeatherLatLon(lat, lon) {
  requestUrl =
    'http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat +
    '&lon=' +
    lon +
    '&appid=' +
    WeatherApiKey;

  currentCityWeather = await fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

async function renderWeatherLatLon(lat, lon) {
  latitude = lat;
  longitude = lon;
  await getWeatherLatLon(latitude, longitude);

  // console.log(currentCityWeather);

  weatherObject = {
    city: currentCityWeather.name,
    currentTemp: currentCityWeather.main.temp,
    minTemp: currentCityWeather.main.temp_min,
    maxTemp: currentCityWeather.main.temp_max,
    weatherDescription: currentCityWeather.weather[0].description,
  };

  return weatherObject;
}

// End of weather api functions


button.addEventListener('click', getApi);





