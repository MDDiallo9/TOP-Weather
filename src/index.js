import { key } from "./key"

let forecast = ""

const request = async(key,city) => {
    forecast = await (await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&lang=fr`)).json()
    /* const json = response.json() */
    console.log(forecast);
    populateCurrent(forecast)
}

request(key,"Lille")

const populateCurrent = (forecast) => {
    document.querySelector(".location").innerHTML = `<span class="city">${forecast.location.name}</span>, <span class="region">${forecast.location.region}</span>, <span class="country">${forecast.location.country}</span>`
    document.querySelector(".temps").innerHTML = `<span class="temp_c">${forecast.current["temp_c"]}°C</span> <span class="condition-text">${forecast.current.condition.text}</span>`
}


`<span class=""></span> <span class=""></span> <span class=""></span>`