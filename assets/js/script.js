var apiCity = 'seattle';
var WeatherApiKey = '4d63ba9d93efddcbcaf8047f7d2ec8b0';
var requestUrl;
var latitude;
var longitude;

let currentCityWeather = {};
let weatherObject = {};

var firewood = document.getElementById('firewood');
var showers = document.getElementById('showers');
var CellPhone = document.getElementById('CellPhone');
var Dropdown = document.getElementById('Dropdown');
var firewoodCheckBox = document.getElementById('firewood');
var showersCheckBox = document.getElementById('showers');
var CellPhoneCheckBox = document.getElementById('CellPhone');
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
      // console.log(data);
      saveChecked();
      displayData(data);
    });
}
// firewood option
var displayData = function (data) {
  var finalCampsite = [];
  var campBox = $('.camp');
  var resultsBox = $('.resultsBox');
  if (campBox.children()) {
    campBox.children().remove();
  }

  for (let i = 0; i < data.data.length; i++) {
    var createDiv = $('<div>').addClass(
      '  has-text-centered box is-size-2 has-background-success-light has-text-warning-dark '
    );
    var createDiv2 = $('<div>').addClass(
      ' has-text-centered box is-size-2 has-background-success-light has-text-warning-dark  '
    );

    var url = data.data[i].url;

    var website = $('<a>').attr('href', url).text(url);
    //  var text = $('<h1>').text(website);
    var willAddCampSite = true;
    var firewoodAvailable =
      data.data[i].amenities.firewoodForSale.includes('Yes');
    // var showerAvailable =
    //   data.data[i].amenities.showers[0] !== 'None' &&
    //   data.data[i].amenities.showers.length;
    var cellPhoneAvailable =
      data.data[i].amenities.cellPhoneReception.includes('Yes');
    // * looking for firewood available for purchase
    if (firewoodCheckBox.checked) {
      if (!firewoodAvailable) {
        willAddCampSite = false;
      }
      // console.log();
      // * looking for showers
      // } else if (showersCheckBox.checked) {
      //   if (!showerAvailable) {
      //     willAddCampSite = false;
      //   }
      // console.log(data.data[i]);
      // *looking for cellphone reception
    } else if (CellPhoneCheckBox.checked) {
      if (!cellPhoneAvailable) {
        willAddCampSite = false;
      }
      // console.log(data.data[i]);
    }
    if (willAddCampSite) {
      var resultOfRWL;

      console.log(resultOfRWL);
      renderWeatherLatLon(data.data[i].latitude, data.data[i].longitude);
      finalCampsite.push(data.data[i]);
      createDiv.append(website);
      campBox.append(createDiv);
      renderWeatherLatLon(data.data[i].latitude, data.data[i].longitude).then(
        function (num) {
          // write num to the page
          var weatherH1 = $('<p>');
          weatherH1.text(num);

          createDiv2.append(weatherH1);
          campBox.append(createDiv2);
          // some el . append(weatherH1)
        }
      );
    }
  }
  console.log('final campsite', finalCampsite);
};

/* Local Storage section */

// This code will check if previous states exists in local storage
// if it does, initialize chosen states with the value of previous states in local storage
if (localStorage.getItem('previousStates')) {
  var chosenStates = JSON.parse(localStorage.getItem('previousStates'));
  console.log('previous states exist');
} else {
  // if it does not, create a new array with the states that the user choses
  var chosenStates = [];
  console.log('no previous states exist');
}
console.log(typeof chosenStates);

// This will save the checked boxes within the local storage, or update the checkboxes when they have not been checked
function saveChecked() {
  localStorage.setItem('savedFirewood', 'false');
  localStorage.setItem('savedShowers', 'false');
  localStorage.setItem('savedCellPhone', 'false');

  if (firewoodCheckBox.checked) {
    localStorage.setItem('savedFirewood', 'true');
  }

  if (showersCheckBox.checked) {
    localStorage.setItem('savedShowers', 'true');
  }

  if (CellPhoneCheckBox.checked) {
    localStorage.setItem('savedCellPhone', 'true');
  }

  // When the user clicks on a state, the state that they submit with the button will appear in their local storage
  if (Dropdown) {
    chosenStates.push(Dropdown.value);
    localStorage.setItem('previousStates', JSON.stringify(chosenStates));
  }
}

// When the user loads into the page, the saved checked boxes, from the previous session, will appear checkedmarked as the last thing they saved
function loadChecked() {
  var firewoodchecked = localStorage.getItem('savedFirewood');
  var showersChecked = localStorage.getItem('savedShowers');
  var CellPhoneChecked = localStorage.getItem('savedCellPhone');

  if (firewoodchecked == 'true') {
    document.getElementById('firewood').checked = true;
  }

  if (showersChecked == 'true') {
    document.getElementById('showers').checked = true;
  }

  if (CellPhoneChecked == 'true') {
    document.getElementById('CellPhone').checked = true;
  }
}

loadChecked();

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
  // console.log(currentCityWeather.main.temp);

  return currentCityWeather.main.temp;
}

// End of weather api functions

button.addEventListener('click', getApi);
