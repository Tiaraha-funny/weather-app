import React, { useContext, useState } from "react";
import locationSearchSvg from "../Onja-Weather-App/icons/location_searching.svg"
import Modal from "./Modal";

function Header() {
  const [search, setSearch] = useState(false);
  console.log(search);

  return (
    <div>
      <div className="main-container">
        <button className="container__search" onClick={() => setSearch(true)}>
          Search for places
        </button>
        <button className="container__icon">
          <img src={locationSearchSvg} />
        </button>
      </div>
      {search ? <Modal search={search} setSearch={setSearch} /> : ""}
    </div>
  );
}

export default Header;
