import { key } from "./key"

let tabIndex = 0
const tabs = []
// form
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener("submit",(e) => {
    e.preventDefault()
    request(key,input.value)
})

const request = async(key,city) => {
    let forecast = await (await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&lang=fr`)).json()
    /* const json = response.json() */
    console.log(forecast);
    populateCurrent(forecast)
}

/* request(key,"Lille") */

const populateCurrent = (forecast) => {
    const container = document.createElement('section');
    container.setAttribute("data-tab",tabIndex)
    const location = document.createElement("div")
    location.innerHTML = `<span class="city">${forecast.location.name}</span>, <span class="region">${forecast.location.region}</span>, <span class="country">${forecast.location.country}</span>`
    const temps = document.createElement("div")
    temps.innerHTML = `<span class="temp_c">${forecast.current["temp_c"]}°C</span> <span class="condition-text">${forecast.current.condition.text}</span>`
    container.append(location,temps)
    tabIndex += 1
    const main = document.querySelector('main');
    main.append(container)
    tabs.push(container)
    console.log(tabs);
}


`<span class=""></span> <span class=""></span> <span class=""></span>`