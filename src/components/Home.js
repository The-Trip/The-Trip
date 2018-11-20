import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/Home.scss";

class Home extends React.Component {
  getData() {
    this.interval = setInterval(() => this.props.fetchImages(), 6000);
  }

  componentDidMount() {
    this.props.fetchImages();
    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const wordsArr = [
      " ...woo",
      " ...Oh la la",
      " ...lucky them",
      " ...so not jealous"
    ];
    var randomWords = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    return (
      <React.Fragment>
        {this.props.splashImage && (
          <div
            className="splash"
            style={{
              backgroundImage: `url(${this.props.splashImage.image})`
            }}
          >
            <nav className="splash__nav">
              <h3>
                {/* <NavLink
                  to="/trips/"
                  activeClassName="active"
                  className="nav__item"
                >
                  Trips
                </NavLink> */}
              </h3>
              <button className="btn btn--large">
                <NavLink
                  to="/create-trip/"
                  activeClassName="active btn"
                  className="nav__item"
                >
                  Create a trip
                </NavLink>
              </button>
            </nav>

            <div className="splash__trip-info">
              <h3>
                {this.props.splashImage.first_name.charAt(0).toUpperCase()}
                {this.props.splashImage.first_name.slice(1)} is going to{" "}
                {this.props.splashImage.destination.charAt(0).toUpperCase()}
                {this.props.splashImage.destination.slice(1)}
                {randomWords}
              </h3>
            </div>

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
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
