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

const imageVerticalAlign = {
  verticalAlign: "middle",
};

function Home() {
  return (
    <>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Do more with the things you{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>
            </h1>
            <p>
              Helping you personalize your finances smartly, in new and
              remarkable ways.
            </p>
          </div>
        </div>
      </section>
      <section className="section is-fluid">
        <div className="columns">
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <span role="img" aria-label="money">
                      💰{" "}
                    </span>
                    Save 30% of my salary to another account
                  </h2>
                  <img
                    src="https://tbankonline.com/img/tBank.ico"
                    alt="tBank Logo"
                    className="image is-16x16 is-inline-block"
                    style={imageVerticalAlign}
                  />{" "}
                  tBank
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <Link to="/" className="card-footer-item">
                  Connect
                </Link>
              </footer>
            </div>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <span role="img" aria-label="email">
                      📧{" "}
                    </span>
                    Send me a weekly spending digest
                  </h2>
                  <img
                    src="https://tbankonline.com/img/tBank.ico"
                    alt="tBank Logo"
                    className="image is-16x16 is-inline-block"
                    style={imageVerticalAlign}
                  />{" "}
                  tBank
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <Link to="/" className="card-footer-item">
                  Connect
                </Link>
              </footer>
            </div>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <span role="img" aria-label="money">
                      💰{" "}
                    </span>
                    Round up my debit card purchases to the nearest S$1 and save
                    it
                  </h2>
                  <img
                    src="https://tbankonline.com/img/tBank.ico"
                    alt="tBank Logo"
                    className="image is-16x16 is-inline-block"
                    style={imageVerticalAlign}
                  />{" "}
                  tBank
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <Link to="/" className="card-footer-item">
                  Connect
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
