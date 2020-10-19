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

function Accounts() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState([]);

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
            <h2 className="subtitle">View all my linked accounts</h2>
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
                    View All Accounts
                  </Link>
                </li>
                <li>
                  <Link to="/accounts/link">Link Accounts</Link>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column">
            {userMetadata?.accounts?.length > 0 ||
            "accounts" in userMetadata ? (
              <div className="card" style={cardEqualHeight}>
                <div className="card-content">
                  <div className="content">
                    <h2>
                      <img
                        src="https://tbankonline.com/img/tBank.ico"
                        alt="tBank Logo"
                        className="image is-24x24 is-inline-block"
                      />{" "}
                      {userMetadata?.accounts[0].bank}
                    </h2>
                    You linked your tBank account{" "}
                    <code>{userMetadata?.accounts[0].userId}</code> with us on 1
                    Oct 2020.
                  </div>
                </div>
                <footer className="card-footer" style={cardFooter}>
                  <Link to="/accounts/link/tbank" className="card-footer-item">
                    Disconnect
                  </Link>
                </footer>
              </div>
            ) : (
              <div className="card" style={cardEqualHeight}>
                <div className="card-content">
                  <div className="content">
                    <h2>Oh no!</h2>
                    You do not have any accounts linked.
                  </div>
                </div>
                <footer className="card-footer" style={cardFooter}>
                  <Link to="/accounts/link" className="card-footer-item">
                    Why not take a look at what accounts you can link?
                  </Link>
                </footer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
