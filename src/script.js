// show time and date
function formattedDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentWeekday = weekdays[date.getDay()];
  let currentDay = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentWeekday}, ${currentDay} ${currentMonth} ${currentYear} | ${currentHour}:${currentMinute}`;
}

let currentDate = document.querySelector("#current-date-time");
currentDate.innerHTML = formattedDate(new Date());




//display weather
function updateTemperature(response) {

  let yourLocation = response.data.name;
  let displayLocationName = document.querySelector("#current-city");
  displayLocationName.innerHTML = `${yourLocation}`;

  let currentTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temp-now");
  displayTemp.innerHTML = `${currentTemp}°C`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let displayFeelsLike = document.querySelector("#feels-temp");
  displayFeelsLike.innerHTML = `Feels like ${feelsLike}°C`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let displayMaxTemp = document.querySelector("#max-temp");
  displayMaxTemp.innerHTML = `${maxTemp}°C`;

  let minTemp = Math.round(response.data.main.temp_min);
  let displayMinTemp = document.querySelector("#min-temp");
  displayMinTemp.innerHTML = `${minTemp}°C`;

  let currentPressure = (response.data.main.pressure);
  let displayPressure = document.querySelector("#stat-pressure");
  displayPressure.innerHTML = `${currentPressure}hPa`;

  let currentHumidity = (response.data.main.humidity);
  let displayHumidity = document.querySelector("#stat-humidity");
  displayHumidity.innerHTML = `${currentHumidity}%`;

  let currentWind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#stat-wind");
  displayWind.innerHTML = `${currentWind}km/h`;

}



// city search result
function updateCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input").value;

  let apiKey = "7221c1b666843ec019546f9ad14749ae";
  let unit = "metric";
  let currentCity = `${inputCity}`;
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}q=${currentCity}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(updateTemperature);

}

  
//search input
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", updateCity);



// your location

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7221c1b666843ec019546f9ad14749ae";
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(updateTemperature);
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(showPosition);
}


let button = document.querySelector("#location-button");
button.addEventListener("click", getLocation);

