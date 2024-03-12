import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Search() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Name of City..."
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        (form)
        <ul>
          <li>Temperature: {weather.temperature}°C</li>
          <li> Description:{weather.description}</li>
          <li> Humidity: {weather.humidity}</li>
          <li> Wind: {weather.wind}km/h</li>
          <li>
            {" "}
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
