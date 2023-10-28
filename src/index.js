import { key } from "./key";

let tabIndex = 0;
// form
const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.createElement("section");
const invisible = document.querySelector("#invisible")
const main = document.querySelector('main');

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
  const container = document.createElement("section");
  container.setAttribute("data-tab", tabIndex);
  const location = document.createElement("div");
  location.innerHTML = `<span class="city">${forecast.location.name}</span>, <span class="region">${forecast.location.region}</span>, <span class="country">${forecast.location.country}</span>`;
  const temps = document.createElement("div");
  temps.innerHTML = `<span class="temp_c">${forecast.current["temp_c"]}°C</span> <span class="condition-text">${forecast.current.condition.text}</span>`;
  container.append(location, temps);
  invisible.append(container);
  const li = document.createElement("li");
  li.setAttribute("data-tab", tabIndex);
  li.textContent = city;
  const ul = document.querySelector("ul");
  ul.append(li);
  addEvents();
  tabIndex += 1;

};

const addEvents = () => {
  const lis = document.querySelectorAll("li");
  for (let li of lis) {
    li.addEventListener("click", (e) => {
      /* cleanContainer(); */
      invisible.append(main.children[0])
      const index = e.target.dataset.tab;
      const page = document.querySelector(`section[data-tab="${index}"]`);
      main.append(page)
    });
  }
};

