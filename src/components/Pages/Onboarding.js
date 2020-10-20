import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL, AUTH0_DOMAIN } from "../../utils/utils";

const initialFormData = Object.freeze({
  name: "",
});

function Onboarding() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  // console.log(jwtClaims);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const data = { ...formData, token };

    // Post to API
    console.log(data);
    fetch(`${API_URL}/users/onboarding`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // So that our API will know who's calling it :)
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => console.log(response));
    const state = params.get("state");
    // We're not done with authentication, redirect back to Auth0!
    window.location.href = `${AUTH0_DOMAIN}/continue?state=${state}`;
  };

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Signup</h1>
            <h2 className="subtitle">Fill in your profile information</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label" htmlFor="name">
                Name
                <input
                  className="control input"
                  name="name"
                  type="text"
                  placeholder="Johnny Appleseed"
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox" id="checkbox" htmlFor="checkbox">
                  <input type="checkbox" /> I agree to the{" "}
                  <a
                    href="https://is452.cloud/terms-and-conditions"
                    target="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  className="button is-link"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button type="button" className="button is-link is-light">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Onboarding;
