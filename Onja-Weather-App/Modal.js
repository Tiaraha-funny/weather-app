import React, { useContext } from "react";
import { WeatherAppContexts } from "./WeatherAppContexts";

function Modal({ search, setSearch }) {
  const {
    state,
    handleSubmitQuery,
    detailsApi,
    handleInputQuery,
    queryInputValue,
    query,
  } = useContext(WeatherAppContexts);

  const { weather } = state;
  console.log("weather in the modal", weather);

  const classModalName = search ? "displayBlock" : "displayNone";
  console.log(queryInputValue);
  console.log(query);

  function handleSearchThisCity() {
    console.log("get the new city", weather);
    detailsApi();
    setSearch(false);
  }

  function handleCloseModal() {
    setSearch(false);
  }

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
        <button className="search-btn">Search</button>
      </form>
      <button onClick={handleCloseModal} className="close">
        X
      </button>
      <div className="search_locatons">
        {weather.map((input) => (
          <p
            className="searchNames"
            onClick={handleSearchThisCity}
            key={input.woeid}
          >
            {input.title}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Modal;
