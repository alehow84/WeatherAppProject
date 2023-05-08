//display current time and day
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = String(date.getHours()).padStart(2, `0`);
  let minutes = String(date.getMinutes()).padStart(2, `0`);
  let time = `${hours}:${minutes}`;
  return `${day} ${time}`;
}

let today = new Date();
let now = document.querySelector("#current-day");
now.innerHTML = formatDate(today);

//amend name and stats based on user input and results returned from api
function showCurrent(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  console.log(response.data.weather[0].description);
  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrent);
}

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#user-city").value;
  search(cityInput);
}
let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", submitCity);

//automatically searches for Tokyo on loading page
search("Tokyo");

//Current Location button
function searchCurrentLocale(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrent);
}

function obtainCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocale);
}

let button = document.querySelector("button");
button.addEventListener("click", obtainCurrentLocation);
