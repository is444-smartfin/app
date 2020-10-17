import React from "react";
import { Link } from "react-router-dom";

const cardEqualHeight = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const cardFooter = {
  marginTop: "auto",
};

function Home() {
  return (
    <>
      <section className="hero is-dark mb-4">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Make Insurance Fair and Accessible</h1>
            <p>
              Decentralized insurance protocol to collectively build insurance
              products.
            </p>
          </div>
        </div>
      </section>
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <span role="img" aria-label="airplane">
                      🛫
                    </span>{" "}
                    Flight Insurance
                  </h2>
                  First decentralized insurance. Payouts are automatic and
                  almost instant. Now fully licensed.{" "}
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <Link to="/" className="card-footer-item">
                  Buy
                </Link>
                <a href="https://t.me/is452_smu" className="card-footer-item">
                  Join the Community
                </a>
              </footer>
            </div>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <span role="img" aria-label="rain">
                      🌧️
                    </span>{" "}
                    Rain Insurance
                  </h2>
                  Protect yourself against price surge when it rains! Get back
                  60% of your fare on Grab, Ryde & GOJEK.
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <Link to="/" className="card-footer-item">
                  Buy
                </Link>
                <a href="https://t.me/is452_smu" className="card-footer-item">
                  Join the Community
                </a>
              </footer>
            </div>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <span role="img" aria-label="airplane">
                      🌾
                    </span>{" "}
                    Crop Insurance
                  </h2>
                  Select your crop and the location of your field. Automated
                  payouts are triggered by drought or flood events reported by
                  government agencies.
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <Link to="/" className="card-footer-item">
                  Buy
                </Link>
                <a href="https://t.me/is452_smu" className="card-footer-item">
                  Join the Community
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
