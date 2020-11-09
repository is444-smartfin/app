import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
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
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const apiUrl = `${API_URL}/accounts/info`;
        const metadataResponse = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal,
        });
        const metadata = await metadataResponse.json();
        setUserMetadata(metadata);
      } catch (e) {
        console.error(e.message);
      }
    };

    getUserMetadata();

    // Need to unsubscribe to API calls if the user moves away from the page before fetch() is done
    return function cleanup() {
      abortController.abort();
    };
  }, [getAccessTokenSilently, user]);

  // TODO: Make it dynamic
  function AccountBankName({ name }) {
    if (name === "ocbc") {
      return (
        <>
          <img
            src="https://www.ocbc.com/favicon.ico"
            alt="OCBC Logo"
            className="image is-24x24 is-inline-block"
          />{" "}
          {name}
        </>
      );
    }
    return (
      <>
        <img
          src="https://tbankonline.com/img/tBank.ico"
          alt="tBank Logo"
          className="image is-24x24 is-inline-block"
        />{" "}
        {name}
      </>
    );
  }
  function AccountContext({ accountName }) {
    return (
      <>
        You linked your account <code>{accountName}</code> with us on 1 Oct
        2020.
      </>
    );
  }

  async function handleDisconnect(name) {
    try {
      const accessToken = await getAccessTokenSilently();
      const apiUrl = `${API_URL}/accounts/unlink`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
    } catch (e) {
      console.error(e.message);
    }
  }

  function AccountFooterButton({ name }) {
    return (
      <>
        <Link
          to="/accounts"
          role="button"
          className="card-footer-item"
          onClick={async () => handleDisconnect(name)}
        >
          Disconnect
        </Link>
      </>
    );
  }
  // Destructuring to get accounts only
  function AccountsList({ accounts }) {
    if (Object.keys(accounts).length > 0) {
      return (
        <>
          {Object.keys(accounts).map((name) => {
            const account = accounts[name].userId;

            return (
              <div className="card mb-4" key={name}>
                <div className="card-content">
                  <div className="content">
                    <h2>
                      <AccountBankName name={name} />
                    </h2>
                    <AccountContext accountName={account} />
                  </div>
                </div>
                <footer className="card-footer" style={cardFooter}>
                  <AccountFooterButton name={name} />
                </footer>
              </div>
            );
          })}
        </>
      );
    }
    return (
      <>
        <div className="card" style={cardEqualHeight}>
          <div className="card-content">
            <div className="content">
              <h2>Oh no!</h2>
              You do not have any linked accounts.
            </div>
          </div>
          <footer className="card-footer" style={cardFooter}>
            <Link to="/accounts/link" className="card-footer-item">
              Why not take a look at what accounts you can link?
            </Link>
          </footer>
        </div>
      </>
    );
  }

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">My accounts</h1>
            <h2 className="subtitle">View all my linked accounts</h2>
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
            {userMetadata ? (
              <AccountsList accounts={userMetadata?.accounts} />
            ) : (
              <>
                <Skeleton
                  variant="rect"
                  animation="wave"
                  width="100%"
                  height={150}
                  className="mb-4"
                />
                <Skeleton
                  variant="rect"
                  animation="wave"
                  width="100%"
                  height={150}
                  className="mb-4"
                />
                <Skeleton
                  variant="rect"
                  animation="wave"
                  width="100%"
                  height={150}
                  className="mb-4"
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Accounts;
