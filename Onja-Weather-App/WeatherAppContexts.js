import React, { createContext, useEffect, useReducer, useState } from "react";

const WeatherAppContexts = createContext();

const CORSE_API = "https://cors-anywhere.herokuapp.com/";

const DEFAULT_API = "https://www.metaweather.com//api/location/search/?query=";

const WOEID_API = "https://www.metaweather.com//api/location/";

function WeatherContextsProvider({ children }) {
  const [query, setQuery] = useState("cologne");
  const [queryInputValue, setQueryInputValue] = useState("cologne");

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "DEFAULT_API": {
          return {
            ...state,
            weather: action.dataQuery,
            loading: action.loading,
          };
        }

        case "DETAILS_API": {
          return {
            ...state,
            details: action.dataWoeid,
          };
        }
        default: {
          console.error("No actions defined for", action.type);
          break;
        }
      }
      return state;
    },
    { weather: [], details: [], loading: true }
  );

  const { weather, details, loading } = state;

  async function fetchDefaultApi() {
    const response = await fetch(CORSE_API + DEFAULT_API + query);
    const dataQuery = await response.json();
    dispatch({ type: "DEFAULT_API", dataQuery, loading: false });
  }

  async function detailsApi() {
    console.log("check the fetch again with woeid", weather);
    const result =
      weather && (await fetch(`${CORSE_API}${WOEID_API}${weather[0]?.woeid}`));
    const dataWoeid = await result.json();
    dispatch({ type: "DETAILS_API", dataWoeid });
  }

  useEffect(() => {
    fetchDefaultApi();
  }, [query]);

  useEffect(() => {
    detailsApi();
  }, [query, weather]);

  function handleSubmitQuery(e) {
    e.preventDefault();
    setQuery(e.target.query.value);
  }

  function handleInputQuery(e) {
    setQueryInputValue(e.target.value);
  }

  return (
    <WeatherAppContexts.Provider
      value={{
        state,
        query,
        setQuery,
        queryInputValue,
        setQueryInputValue,
        handleSubmitQuery,
        handleInputQuery,
        detailsApi,
      }}
    >
      {children}
    </WeatherAppContexts.Provider>
  );
}

export { WeatherAppContexts, WeatherContextsProvider };
