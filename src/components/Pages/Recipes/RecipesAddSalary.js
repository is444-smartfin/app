import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../utils/utils";

const cardEqualHeight = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const initialFormData = Object.freeze({
  userId: "",
  pin: "",
  otp: "",
});

function RecipesAddSalary() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState(null);
  const [accountsList, setAccountsList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const apiUrl = `${API_URL}/integrations/tbank/user_accounts`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal,
        });
        const data = await response.json();
        setAccountsList(data.data);
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

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <h1 className="title">
              💰 Save 30% of my salary to another account
            </h1>
            <h2 className="subtitle">Powered by tBank</h2>
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
                  <Link to="/recipes">View All Recipes</Link>
                </li>
                <li>
                  <Link to="/recipes" className="is-active">
                    Add Recipes
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <div className="columns">
                    <div className="column">
                      <div className="notification">
                        Form status text. <code>{formStatus}</code>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor="userId">
                          From account number
                          <div className="control">
                            <div className="select">
                              <select>
                                {accountsList.length > 0 ? (
                                  <>
                                    {Object.values(accountsList).map((row) => (
                                      <option
                                        value={row.accountID}
                                        key={row.accountID}
                                      >
                                        {row.accountID} ({row.currency}{" "}
                                        {row.balance})
                                      </option>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </select>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="field">
                        <label className="label" htmlFor="pin">
                          To account number
                          <div className="control">
                            <div className="select">
                              <select>
                                {accountsList.length > 0 ? (
                                  <>
                                    {Object.values(accountsList).map((row) => (
                                      <option
                                        value={row.accountID}
                                        key={row.accountID}
                                      >
                                        {row.accountID} ({row.currency}{" "}
                                        {row.balance})
                                      </option>
                                    ))}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </select>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="field">
                        <label className="label" htmlFor="pin">
                          When a transaction contains
                          <input
                            type="text"
                            className="input control"
                            defaultValue="SALARY"
                          />
                        </label>
                      </div>

                      <div className="field">
                        <label className="label" htmlFor="pin">
                          % of incoming amount to transfer
                          <input
                            type="number"
                            className="input control"
                            defaultValue="30"
                          />
                        </label>
                      </div>

                      <div className="field is-grouped">
                        <div className="control">
                          <button type="submit" className="button is-link">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecipesAddSalary;
