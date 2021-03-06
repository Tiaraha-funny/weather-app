import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import WeatherApp from "./Onja-Weather-App/WeatherApp";
import { WeatherContextsProvider } from "./Onja-Weather-App/WeatherAppContexts";
import "./Onja-Weather-App/Css/index.css";

ReactDOM.render(
  <WeatherContextsProvider>
    <Router>
      <WeatherApp />
    </Router>
  </WeatherContextsProvider>,
  document.getElementById("root")
);
