import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/utils";

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

function AccountsLinktBank() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState(initialFormData);
  const [formStatusType, setFormStatusType] = useState("");
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // Step 1: Request OTP
  const handleRequestOtp = () => {
    // e.preventDefault();
    const data = { ...formData, bank: "tbank" };

    const requestOtp = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        fetch(`${API_URL}/accounts/mfa`, {
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

    requestOtp();
  };

  // Step 2: Link account
  const handleSubmit = () => {
    // e.preventDefault();
    const data = { ...formData, bank: "tbank" };

    const requestAccountLinkage = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        fetch(`${API_URL}/accounts/link`, {
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

    requestAccountLinkage();
  };

  const notificationIsHidden = formStatusType !== "" ? "" : "is-hidden";
  const notificationClass = `notification ${formStatusType} ${notificationIsHidden}`;

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Link tBank Account</h1>
            <h2 className="subtitle">You&rsquo;re almost there!</h2>
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
                  <div className="columns">
                    <div className="column">
                      <div className={notificationClass}>{formStatus}</div>
                      <div className="field">
                        <label className="label" htmlFor="userId">
                          User ID
                          <input
                            className="control input"
                            name="userId"
                            type="text"
                            placeholder=""
                            onChange={handleChange}
                          />
                        </label>
                      </div>

                      <div className="field">
                        <label className="label" htmlFor="pin">
                          PIN
                          <input
                            className="control input"
                            name="pin"
                            type="password"
                            placeholder=""
                            onChange={handleChange}
                          />
                        </label>
                      </div>

                      <label className="label" id="otp" htmlFor="otp">
                        OTP
                      </label>
                      <div className="field has-addons">
                        <div className="control">
                          <input
                            className="control input"
                            name="otp"
                            type="text"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            maxLength="6"
                            onChange={handleChange}
                            autoComplete="one-time-code"
                          />
                        </div>
                        <div className="control">
                          <button
                            type="button"
                            className="button is-info"
                            onClick={() => handleRequestOtp()}
                          >
                            Request OTP
                          </button>
                        </div>
                      </div>

                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            type="submit"
                            className="button is-link"
                            onClick={() => handleSubmit()}
                          >
                            Login
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

export default AccountsLinktBank;
