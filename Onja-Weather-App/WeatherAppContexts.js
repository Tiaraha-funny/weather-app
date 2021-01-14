import React, { createContext, useEffect, useReducer, useState } from "react";

const WeatherAppContexts = createContext();

const CORSE_API = "https://cors-anywhere.herokuapp.com/";

const DEFAULT_API = "https://www.metaweather.com//api/location/search/?query=";

const WOEID_API = "https://www.metaweather.com//api/location/";

function WeatherContextsProvider({ children }) {
    const [query, setQuery] = useState("cologne");

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "DEFAULT_API": {
          return {
            ...state,
            weather: action.dataQuery,
          };
        }

        case "DETAILS_API": {
            return {
                ...state,
                details: action.dataWoeid
            }
        }
        default: {
          console.error("No actions defined for", action.type);
          break;
        }
      }
      return state;
    },
    { weather: [], details: [] }
  );

  const {weather, details} = state;
  console.log("first fetch", weather);
  console.log("seconde fetch", details);

  async function fetchDefaultApi() {
    const response = await fetch(CORSE_API + DEFAULT_API + query);
    const dataQuery = await response.json();
    dispatch({ type: "DEFAULT_API", dataQuery });
    console.log("dataQuery response", dataQuery);
  }

  async function detailsApi() {
      console.log("check the fetch again with woeid", weather);
      const result = weather && await fetch(`${CORSE_API}${WOEID_API}${weather[0].woeid}`)
      const dataWoeid = await result.json();
      dispatch({ type: "DETAILS_API", dataWoeid});
      console.log("fetch the woeid", dataWoeid);
  }

  useEffect(() => {
    fetchDefaultApi();
  }, [query]);

  useEffect(() => {
    detailsApi()
  }, [weather])

  function handleSubmitQuery(e) {
      e.preventDefault();
  }

  function handleInputQuery(e) {
      setQuery(e.target.value)
  }

  return (
    <WeatherAppContexts.Provider value={{ state, query, setQuery, handleSubmitQuery, handleInputQuery }}>
      {children}
    </WeatherAppContexts.Provider>
  );
}

export { WeatherAppContexts, WeatherContextsProvider };
