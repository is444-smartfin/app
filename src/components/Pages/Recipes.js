import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/utils";

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

function Recipes() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userDetails = `${API_URL}/accounts/info`;
        console.log(accessToken);
        const metadataResponse = await fetch(userDetails, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const metadata = await metadataResponse.json();
        setUserMetadata(metadata);
        console.log(metadata);
      } catch (e) {
        console.error(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Explore recipes</h1>
            <h2 className="subtitle">
              Find ways for us to handle repetitive tasks in the banking apps
              you use everyday.
            </h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column is-2">
            <aside className="menu">
              <p className="menu-label">Partners</p>
              <ul className="menu-list">
                <li>
                  <Link to="/recipes" className="is-active">
                    View All Recipes
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
                <Link to="/recipes/add/salary" className="card-footer-item">
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
    </div>
  );
}

export default Recipes;
