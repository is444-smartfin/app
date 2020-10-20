import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/utils";

function Profile() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userDetails = `${API_URL}/users`;
        const metadataResponse = await fetch(userDetails, {
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

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Profile of {userMetadata?.full_name}</h1>
            <h2 className="subtitle">My profile</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column is-3">
            <aside className="menu">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <Link to="/profile" className="is-active">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/profile">Something Here</Link>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column is-6">
            <div>
              <figure className="image is-128x128">
                <img
                  className="is-rounded"
                  src={
                    userMetadata?.picture ??
                    "https://bulma.io/images/placeholders/128x128.png"
                  }
                  alt="Profile"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
