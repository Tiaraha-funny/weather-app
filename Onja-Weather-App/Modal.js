import axios from "axios";
import React, { useContext } from "react";
import { WeatherAppContexts } from "./WeatherAppContexts";

function Modal({ search, setSearch }) {
  const { state, handleSubmitQuery, handleInputQuery, queryInputValue, query } = useContext(
    WeatherAppContexts
  );

  const {weather} = state;
  console.log("weather in the modal", weather);

  const classModalName = search ? "displayBlock" : "displayNone";
console.log(queryInputValue)
console.log(query)
  return (
    <div className={classModalName}>
      <form className="modal-content" onSubmit={handleSubmitQuery}>
        <input
          type="text"
          name="query"
          value={queryInputValue}
          onChange={handleInputQuery}
          placeholder="search location"
        />
        <button className="search-btn">
          Search
        </button>
      </form>
      <button onClick={() => setSearch(false)} className="close">
        X
      </button>
      <p className="search_locatons">
      {weather.map(input => <p className="searchNames" key={input.woeid}>{input.title}</p>)}
      </p>
    </div>
  );
}

export default Modal;
