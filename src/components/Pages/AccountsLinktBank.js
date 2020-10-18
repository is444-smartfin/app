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

function AccountsLinktBank() {
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const data = "123";
        fetch(`${API_URL}/users/onboarding`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => console.log(response));
      } catch (e) {
        console.error(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  return (
    <div>
      <section className="hero is-dark mb-4">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Link tBank Account</h1>
            <h2 className="subtitle">Link your banks accounts</h2>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="columns">
          <div className="column is-2">
            <aside className="menu">
              <p className="menu-label">Integration</p>
              <ul className="menu-list">
                <li>
                  <Link to="/accounts" className="is-active">
                    Link Accounts
                  </Link>
                </li>
                <li>
                  <Link to="/profile">View All Accounts</Link>
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
                <Link to="/" className="card-footer-item">
                  Link
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsLinktBank;
