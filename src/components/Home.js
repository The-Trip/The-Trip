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
    document.body.classList.add("splash-context");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    document.body.classList.remove("splash-context");
  }

  render() {
    const wordsArr = [
      " ...woo",
      " ...Ooh la la",
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
            <section className="splash__promo">
              <nav className="splash__nav">
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
            </section>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
