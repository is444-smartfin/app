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

function AccountsLink() {
  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">My accounts</h1>
            <h2 className="subtitle">Link your banks accounts</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column is-2">
            <aside className="menu">
              <p className="menu-label">Integration</p>
              <ul className="menu-list">
                <li>
                  <Link to="/accounts">View All Accounts</Link>
                </li>
                <li>
                  <Link to="/accounts/link" className="is-active">
                    Link Accounts
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <img
                      src="https://tbankonline.com/img/tBank.ico"
                      alt="tBank Logo"
                      className="image is-24x24 is-inline-block"
                    />{" "}
                    tBank
                  </h2>
                  Link your tBank Account
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <Link to="/accounts/link/tbank" className="card-footer-item">
                  Link
                </Link>
              </footer>
            </div>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <img
                      src="https://www.dbs.com.sg/o/corporate-theme/images/favicon.ico"
                      alt="tBank Logo"
                      className="image is-24x24 is-inline-block"
                    />{" "}
                    DBS
                  </h2>
                  Coming Soon
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <span className="card-footer-item" disabled>
                  Coming Soon
                </span>
              </footer>
            </div>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <h2>
                    <img
                      src="https://www.stashaway.sg/static/stashaway-icon-1796d56ee76309af75c4398bfa167ca1.png"
                      alt="StashAway Logo"
                      className="image is-24x24 is-inline-block"
                    />{" "}
                    StashAway
                  </h2>
                  Coming Soon
                </div>
              </div>
              <footer className="card-footer" style={cardFooter}>
                <span className="card-footer-item" disabled>
                  Coming Soon
                </span>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountsLink;
