import { key } from "./key";

let tabIndex = 0;
// form
const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.createElement("section");
const invisible = document.querySelector("#invisible");
const main = document.querySelector("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  request(key, input.value);
});

const request = async (key, city) => {
  let forecast = await (
    await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&lang=fr`
    )
  ).json();
  /* const json = response.json() */
  console.log(forecast);
  populateCurrent(forecast, city);
};

/* request(key,"Lille") */

const populateCurrent = (forecast, city) => {
  // City Element
  const citye = document.createElement("div");
  citye.id = "city";
  citye.setAttribute("data-tab", tabIndex);
  citye.innerHTML = `
  <div>
    <div>
        <p>${forecast.location.name}</p>
        <p>${forecast.current.condition.text}</p>
    </div>
    <p>${forecast.current["temp_c"]}</p>
  </div>
  <div></div>
  `;
  // Today's forecast element
  const todaysForecast = document.createElement("div");
  todaysForecast.id = "todaysforecast";
  todaysForecast.setAttribute("data-tab", tabIndex);
    // hour forecast array
  const hourforecast = forecast.forecast.forecastday[0].hour
  const hourDiv = document.createElement('div');
  hourDiv.id = "hourdiv"
  for (let hour of hourforecast){
    const hourContainer = document.createElement('div');
    hourContainer.classList.add("hour")
    const hourEl = document.createElement('div');
    hourEl.textContent = `${hour.time.slice(-5)}`
    const hourImg = document.createElement('div');
    hourImg.innerHTML = `<img src="${hour.condition.icon}" alt="">`
    const hourTemp = document.createElement('p');
    hourTemp.textContent = `${hour.temp_c}°C`
    hourContainer.append(hourEl,hourImg,hourTemp)
    hourDiv.append(hourContainer)
  }
  todaysForecast.innerHTML = `<h2>Prévisions par heure</h2>`;
  todaysForecast.append(hourDiv)
  // Details Element
  const details = document.createElement('div');
  details.id = "details"
  details.setAttribute("data-tab",tabIndex)
  details.innerHTML = "<h2>Détails</h2>"
  const detailsContainer = document.createElement('div');
  detailsContainer.id = "details-container"
  detailsContainer.innerHTML += `<div>
      <p>Ressenti</p> <br> <p class="value">${forecast.current.feelslike_c}°C</p>
  </div>`
  detailsContainer.innerHTML += `<div>
      <p>Vent</p> <br> <p class="value">${forecast.current.wind_kph} km/h</p>
  </div>`
  detailsContainer.innerHTML += `<div>
      <p>Pluie</p> <br> <p class="value">${forecast.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
  </div>`
  detailsContainer.innerHTML += `<div>
      <p>Humidité</p> <br> <p class="value">${forecast.current.humidity}%</p>
  </div>`
  details.append(detailsContainer)
  // Weekly forecast
  const weeklyForecast = document.createElement('div');
  weeklyForecast.innerHTML = `<h2>Cette semaine</h2>`
  const weeklist = document.createElement('ul');
  weeklyForecast.id = "weekly-forecast"
  weeklyForecast.setAttribute("data-tab",tabIndex)
  for (let day of forecast.forecast.forecastday){
    console.log(day)
  }

  /* location.innerHTML = `<span class="city">${forecast.location.name}</span>, <span class="region">${forecast.location.region}</span>, <span class="country">${forecast.location.country}</span>`;
  const temps = document.createElement("div");
  temps.innerHTML = `<span class="temp_c">${forecast.current["temp_c"]}°C</span> <span class="condition-text">${forecast.current.condition.text}</span>`; */
  /* container.append(citye);
  invisible.append(container);
  const li = document.createElement("li");
  li.setAttribute("data-tab", tabIndex);
  li.textContent = city;
  const ul = document.querySelector("ul");
  ul.append(li); */
  main.append(citye);
  main.append(todaysForecast)
  main.append(details)
  addEvents();
  tabIndex += 1;
};

const addEvents = () => {
  const lis = document.querySelectorAll("li");
  for (let li of lis) {
    li.addEventListener("click", (e) => {
      /* cleanContainer(); */
      invisible.append(main.children[1]);
      const index = e.target.dataset.tab;
      const page = document.querySelector(`section[data-tab="${index}"]`);
      main.appendChild(page);
    });
  }
};
