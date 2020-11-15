import { useAuth0 } from "@auth0/auth0-react";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils/utils";

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

function RecipesExplore() {
  const { getAccessTokenSilently } = useAuth0();
  const [requirements, setRequirements] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const apiUrl = `${API_URL}/recipes/requirements_satisfied`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal,
        });
        const data = await response.json();
        setRequirements(data.data);
        console.log(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    getUserMetadata();

    // Need to unsubscribe to API calls if the user moves away from the page before fetch() is done
    return function cleanup() {
      abortController.abort();
    };
  }, [getAccessTokenSilently]);

  function AllRecipes() {
    return (
      <>
        <div className="column">
          <div className="card" style={cardEqualHeight}>
            <div className="card-content">
              <div className="content">
                <h2>
                  <span role="img" aria-label="money">
                    💰{" "}
                  </span>
                  Save some of my salary to another account
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
              {requirements?.tbank ? (
                <Link to="/recipes/add/salary" className="card-footer-item">
                  Connect
                </Link>
              ) : (
                <span className="card-footer-item">Unable to connect</span>
              )}
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
                  Send me a weekly aggregated transactions digest
                </h2>
                SmartFIN
              </div>
            </div>
            <footer className="card-footer" style={cardFooter}>
              {requirements?.tbank ? (
                <Link to="/recipes/add/salary" className="card-footer-item">
                  Connect
                </Link>
              ) : (
                <span className="card-footer-item">Unable to connect</span>
              )}
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
              <span className="card-footer-item" disabled>
                Coming Soon
              </span>
            </footer>
          </div>
        </div>
      </>
    );
  }

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
              <p className="menu-label">Recipes</p>
              <ul className="menu-list">
                <li>
                  <Link to="/recipes">My Recipes</Link>
                  <Link to="/recipes/explore" className="is-active">
                    Explore Recipes
                  </Link>
                  <Link to="/recipes/run_history">Run History</Link>
                </li>
              </ul>
            </aside>
          </div>
          {requirements ? (
            <AllRecipes />
          ) : (
            <>
              <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                height={200}
                className="mb-4 mr-4"
              />{" "}
              <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                height={200}
                className="mb-4 mr-4"
              />{" "}
              <Skeleton
                variant="rect"
                animation="wave"
                width="100%"
                height={200}
                className="mb-4 mr-4"
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default RecipesExplore;
