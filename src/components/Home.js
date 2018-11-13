import React from "react";
import { NavLink } from "react-router-dom";

function Home({ handleClick }) {
  return (
    <React.Fragment>
      <h2>SPLASH</h2>

      <nav className="splash__nav">
        <h3>
          <NavLink to="/trips/" activeClassName="active" className="nav__item">
            Trips
          </NavLink>
        </h3>
        <h3>
          <NavLink
            to="/create-trip/"
            activeClassName="active btn"
            className="nav__item"
          >
            Create a trip
          </NavLink>
        </h3>
      </nav>

      {/* <button
        onClick={() => handleClick("login")}
        className="login btn btn__login"
      >
        Login / Register
      </button>
      <button
        onClick={() => handleClick("your-trips")}
        className="your__trips btn btn__link"
      >
        Your trips
      </button>
      <button
        onClick={() => handleClick("create-trip")}
        className="create__trip btn btn__link"
      >
        Create a trip
      </button> */}
    </React.Fragment>
  );
}

export default Home;
