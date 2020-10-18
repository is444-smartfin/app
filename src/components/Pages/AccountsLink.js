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

function AccountsLink() {
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
      <section className="hero is-dark mb-4">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">My accounts</h1>
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
                  DBS Coming Soon
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
      </div>
    </div>
  );
}

export default AccountsLink;
