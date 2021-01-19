import React, { useContext, useState } from "react";
import Header from "./Header";
import { WeatherAppContexts } from "./WeatherAppContexts";

function DisplayWeatherApi() {
  const { state } = useContext(WeatherAppContexts);

  const [toFahrenheit, setToFahrenheit] = useState(false);

  const { weather, details, loading } = state;
  console.log("loading", loading);
  console.log("global weather", weather);
  console.log("global weather details", details);

  const weatherEveryday = loading && weather && details && details.consolidated_weather;
  const weatherToday =
    loading && details && weatherEveryday && weatherEveryday[0];

  const weather1 = loading && details && weatherEveryday && weatherEveryday[1];
  console.log("start tomorow", weather1);
  const weather2 = loading && details && weatherToday && weatherEveryday[2];
  const weather3 = loading && details && weatherToday && weatherEveryday[3];
  const weather4 = loading && details && weatherToday && weatherEveryday[4];
  const weather5 = loading && details && weatherToday && weatherEveryday[5];

  const weekWeather = [weather1, weather2, weather3, weather4, weather5];

  const [bg, setBg] = useState({backgroundColor: "white"} )

  function handleConvertingCelsius() {
    setToFahrenheit(false);
    if(!toFahrenheit) {
      setBg({backgroundColor: "white"})
    } else {
      setBg({backgroundColor: "black"})
    }
    console.log("background", bg);
  }

  function handleConvertingFahrenheit() {
    setToFahrenheit(true);
    if(!toFahrenheit) {
      setBg({backgroundColor: "black"})
    } else {
      setBg({backgroundColor: "white"})
    }
    console.log("background", bg);
  }

  return (
    <section>
      <header className="subheadings">
        <Header />
        {!loading ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <div className="main-container-description">
            <img
              className="image-heading"
              src={`https://www.metaweather.com//static/img/weather/${weatherToday?.weather_state_abbr}.svg`}
            />
            <p className="temp">
              {`${Math.round(
                toFahrenheit
                  ? (weatherToday?.the_temp * 9) / 5 + 32
                  : weatherToday?.the_temp
              )} ${toFahrenheit ? `\xB0F` : `\xB0C`}`}
            </p>
            <p className="name">{weatherToday?.weather_state_name}</p>
            <p className="date">
              Today:
              {new Date(weatherToday?.applicable_date).toDateString("en-us", {
                day: "numeric",
                weekday: "short",
                month: "short",
              })}
            </p>
            <h1>{details?.title}</h1>
          </div>
        )}
      </header>
      <div className="more-info">
        {!loading ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <div>
            <div className="atittude">
              <button style={{bg}} onClick={handleConvertingCelsius}>&deg;C</button>
              <button style={{bg}} onClick={handleConvertingFahrenheit}>&deg;F</button>
            </div>
            <ul className="container">
              {loading &&
                details &&
                weatherEveryday &&
                weekWeather &&
                weekWeather.map((day) => (
                  <li key={day?.id} className="list-items" >
                    <p>{new Date(day?.applicable_date).toDateString()}</p>
                    <img
                      className="image-content"
                      src={`https://www.metaweather.com//static/img/weather/${day?.weather_state_abbr}.svg`}
                    />
                    <div className="tempeture">
                      <p>{`${Math.round(
                        toFahrenheit
                          ? (day?.max_temp * 9) / 5 + 32
                          : day?.max_temp
                      )} ${toFahrenheit ? `\xB0F` : `\xB0C`}`}</p>
                      <p>{`${Math.round(
                        toFahrenheit
                          ? (day?.min_temp * 9) / 5 + 32
                          : day?.min_temp
                      )} ${toFahrenheit ? `\xB0F` : `\xB0C`}`}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <div>
              <h2>
                {new Date(weatherToday?.applicable_date).toDateString()}{" "}
                Highlight
              </h2>
              <ul className="lists-info">
                <li>
                  <p>Wind status</p>
                  <p>{Math.round(weatherToday?.wind_speed)} mph</p>
                  <p>{weatherToday?.wind_direction_compass}</p>
                </li>
                <li>
                  <p>Humidity</p>
                  <p>{weatherToday?.humidity} %</p>
                  <dfn className="progress-bar">
                    <div className="progress">
                      <small>0</small>
                      <small className="half-progress">50</small>
                      <small>100</small>
                    </div>
                    <progress
                      value={weatherToday?.humidity}
                      max="100"
                    ></progress>
                    %
                  </dfn>
                </li>
                <li>
                  <p>Visibility</p>
                  <p>{Math.round(weatherToday?.visibility)} miles</p>
                </li>
                <li>
                  <p>Air pressure</p>
                  <p>{Math.round(weatherToday?.air_pressure)} mb</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DisplayWeatherApi;
