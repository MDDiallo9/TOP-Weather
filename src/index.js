import { key } from "./key";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

let tabIndex = 0;
// form
const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.createElement("section");
const invisible = document.querySelector("#invisible");
const main = document.querySelector("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  request(key, input.value,"first");
  form.reset()
});

const request = async (key, city,mode) => {
  let forecast = await (
    await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&lang=fr`
    )
  ).json();
  /* const json = response.json() */
  console.log(forecast);
  populateCurrent(forecast, mode);
};

/* request(key,"Lille") */

const populateCurrent = (forecast, mode ) => {
  // Clean up the main div
  cleanMain();
  // City Element
  const citye = document.createElement("div");
  citye.id = "city";
  citye.setAttribute("data-tab", tabIndex);
  citye.innerHTML = `
  <div>
    <div>
        <h3>${forecast.location.name}</h3>
        <p>${forecast.current.condition.text}</p>
    </div>
    <p>${forecast.current["temp_c"]}°C</p>
  </div>
  <div>
  <img src="${forecast.current.condition.icon.replaceAll(
    "64",
    "128"
  )}" alt=""></img>
  </div>
  `;
  // Today's forecast element
  const todaysForecast = document.createElement("div");
  todaysForecast.id = "todaysforecast";
  todaysForecast.setAttribute("data-tab", tabIndex);
  // hour forecast array
  const hourforecast = forecast.forecast.forecastday[0].hour;
  const hourDiv = document.createElement("div");
  hourDiv.id = "hourdiv";
  for (let hour of hourforecast) {
    const hourContainer = document.createElement("div");
    hourContainer.classList.add("hour");
    const hourEl = document.createElement("div");
    hourEl.textContent = `${hour.time.slice(-5)}`;
    const hourImg = document.createElement("div");
    hourImg.innerHTML = `<img src="${hour.condition.icon}" alt="">`;
    const hourTemp = document.createElement("p");
    hourTemp.textContent = `${hour.temp_c}°C`;
    hourContainer.append(hourEl, hourImg, hourTemp);
    hourDiv.append(hourContainer);
  }
  todaysForecast.innerHTML = `<h2>Prévisions par heure</h2>`;
  todaysForecast.append(hourDiv);
  // Details Element
  const details = document.createElement("div");
  details.id = "details";
  details.setAttribute("data-tab", tabIndex);
  details.innerHTML = "<h2>Détails</h2>";
  const detailsContainer = document.createElement("div");
  detailsContainer.id = "details-container";
  detailsContainer.innerHTML += `<div>
  <i class="fa-solid fa-temperature-half"></i> <p>Ressenti</p> <br> <p class="value">${forecast.current.feelslike_c}°C</p>
  </div>`;
  detailsContainer.innerHTML += `<div>
  <i class="fa-solid fa-wind"></i> <p>Vent</p> <br> <p class="value">${forecast.current.wind_kph} km/h</p>
  </div>`;
  detailsContainer.innerHTML += `<div>
  <i class="fa-solid fa-umbrella"></i> <p>Pluie</p> <br> <p class="value">${forecast.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
  </div>`;
  detailsContainer.innerHTML += `<div>
  <i class="fa-solid fa-droplet"></i> <p>Humidité</p> <br> <p class="value">${forecast.current.humidity}%</p>
  </div>`;
  details.append(detailsContainer);
  // Weekly forecast
  const weeklyForecast = document.createElement("div");
  weeklyForecast.innerHTML = `<h2>Cette semaine</h2>`;
  const weeklist = document.createElement("ul");
  weeklyForecast.id = "weekly-forecast";
  weeklyForecast.setAttribute("data-tab", tabIndex);
  for (let day of forecast.forecast.forecastday) {
    console.log(day);
    const li = document.createElement("li");
    li.innerHTML = `<p>${format(new Date(day.date), "eeee", {
      locale: fr,
    })}</p><div class="miniweek">${day.day.condition.text}<div><img src="${
      day.day.condition.icon
    }" alt=""></img></div></div><div>${day.day.mintemp_c}/${
      day.day.maxtemp_c
    }</div>`;
    weeklist.append(li);
  }
  weeklyForecast.append(weeklist);
  // Appending the elements
  main.append(citye);
  main.append(todaysForecast);
  main.append(details);
  main.append(weeklyForecast);
  // Tab
  if (mode === "first") {
    const navUl = document.querySelector("#nav-ul");
    const li = document.createElement("li");
    li.textContent = forecast.location.name;
    li.setAttribute("data-tab", tabIndex);
    navUl.append(li);
  }
  addEvents();
  tabIndex += 1;
};

const addEvents = () => {
  const lis = document.querySelectorAll("#nav-ul li");
  for (let li of lis) {
    li.addEventListener("click", (e) => {
      console.log(e.target);
      request(key, e.target.textContent);
    });
  }
};

const cleanMain = () => {
  const elements = document.querySelectorAll("main [data-tab]");
  for (let element of elements) {
    main.removeChild(element);
  }
};

request(key, "Paris","first");