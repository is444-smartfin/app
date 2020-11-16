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
  accountTbank: "",
  accountOcbc: "",
  accountDbs: "",
  frequency: "weekly",
  taskName: "smartfin.aggregated_email",
});

function RecipesAddAggregatedEmail() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState(initialFormData);
  const [formStatusType, setFormStatusType] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [tbankList, setTbankList] = useState([]);
  const [ocbcList, setOcbcList] = useState([]);
  const [dbsList, setDbsList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    console.log(e.target.name, e.target.value.trim());
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const apiUrl = `${API_URL}/integrations/smartfin/user_accounts`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal,
        });
        const data = await response.json();
        console.log(data);
        setTbankList(data.data?.tbank);
        setOcbcList(data.data?.ocbc);
        setDbsList(data.data?.dbs);
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

  // Step 2: Link account
  const handleSubmit = () => {
    // e.preventDefault();
    const data = { ...formData };

    const postForm = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        fetch(`${API_URL}/recipes/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setFormStatus(json?.message);
            if (json?.status === 200) {
              setFormStatusType("is-success is-light");
            } else {
              setFormStatusType("is-danger is-light");
            }
          });
      } catch (e) {
        console.error(e.message);
        setFormStatus(e.message);
        setFormStatusType("is-danger is-light");
      }
    };

    postForm();
  };

  const notificationIsHidden = formStatusType !== "" ? "" : "is-hidden";
  const notificationClass = `notification ${formStatusType} ${notificationIsHidden}`;

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <h1 className="title">
              <span role="img" aria-label="email">
                📧{" "}
              </span>
              Send me a weekly aggregated transactions digest
            </h1>
            <h2 className="subtitle">Powered by SmartFIN</h2>
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
          <div className="column">
            <div className="card" style={cardEqualHeight}>
              <div className="card-content">
                <div className="content">
                  <div className="columns">
                    <div className="column">
                      <div className={notificationClass}>{formStatus}</div>
                      <div className="field">
                        <label className="label" htmlFor="userId">
                          Accounts (tBank)
                          <div className="control">
                            <div className="select">
                              <select
                                name="accountTbank"
                                onChange={handleChange}
                                defaultValue=""
                              >
                                <option disabled value="">
                                  {" "}
                                  -- select an account --{" "}
                                </option>
                                {tbankList.length > 0 ? (
                                  <>
                                    {Object.values(tbankList).map((row) => (
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
                          Accounts (OCBC)
                          <div className="control">
                            <div className="select">
                              <select
                                name="accountOcbc"
                                onChange={handleChange}
                                defaultValue=""
                              >
                                <option disabled value="">
                                  {" "}
                                  -- select an account --{" "}
                                </option>
                                {ocbcList.length > 0 ? (
                                  <>
                                    {Object.values(ocbcList).map((row) => (
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
                          Accounts (DBS)
                          <div className="control">
                            <div className="select">
                              <select
                                name="accountDbs"
                                onChange={handleChange}
                                defaultValue=""
                              >
                                <option disabled value="">
                                  {" "}
                                  -- select an account --{" "}
                                </option>
                                {dbsList.length > 0 ? (
                                  <>
                                    {Object.values(dbsList).map((row) => (
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
                        <label className="label" htmlFor="frequency">
                          Frequency
                          <input
                            type="text"
                            name="frequency"
                            className="input control"
                            defaultValue={initialFormData.frequency}
                            onChange={handleChange}
                            disabled
                          />
                        </label>
                      </div>

                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            type="submit"
                            className="button is-link"
                            onClick={handleSubmit}
                          >
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

export default RecipesAddAggregatedEmail;
