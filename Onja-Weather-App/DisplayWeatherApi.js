import React, { useContext } from "react";
import { WeatherAppContexts } from "./WeatherAppContexts";

function DisplayWeatherApi() {
  const { state, handleSubmitQuery, handleInputQuery, query } = useContext(
    WeatherAppContexts
  );

  const { weather, details } = state;
  console.log("global weather", weather);
  console.log("global weather details", details);

  const weatherAlldays = weather && details && details.consolidated_weather
  console.log("consolidated_weather", weatherAlldays);
  const weatherToday = details && weatherAlldays && weatherAlldays[0]
  console.log("weather today", weatherToday);

  return (
    <div>
      <header className="subheadings">
        <form onSubmit={handleSubmitQuery}>
          <input
            type="text"
            placeholder=""
            value={query}
            onChange={handleInputQuery}
          />
          <button>search</button>
        </form>

        <div className="main-container-description">
          <img
            className="image-heading"
            src={`https://www.metaweather.com//static/img/weather/${details.weather_state_abbr}.svg`}
          />
          <p className="temp">{Math.round(details.the_temp)}&deg;C</p>
          <p className="name">{details.weather_state_name}</p>
          <p className="date">
            Today:
            {new Date(details.applicable_date).toDateString("en-us", {
              day: "numeric",
              weekday: "short",
              month: "short",
            })}
          </p>
          <h1>{details.title}</h1>
        </div>
      </header>
    </div>
  );
}

//   const nameLocation = details && details.parent;
//   console.log("name of the city", nameLocation);
//
//   const details = details && details.consolidated_weather[0];
//   console.log("weather today", details);
//
//   const dateWeath = details && details.applicable_date;
//   console.log("weather of the date", dateWeath);
//
//   const weather1 = details && details.consolidated_weather[0];
//   console.log("start tomorow", weather1);
//   const weather2 = details && details.consolidated_weather[2];
//   const weather3 = details && details.consolidated_weather[3];
//   const weather4 = details && details.consolidated_weather[4];
//   const weather5 = details && details.consolidated_weather[5];
//
//   const weekWeather = [weather1, weather2, weather3, weather4, weather5];
//   console.log(weekWeather);

export default DisplayWeatherApi;
