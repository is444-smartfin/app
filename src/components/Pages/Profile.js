import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const API_URL = "https://api.is452.cloud";
// export const API_URL = "http://localhost:5000";

function Profile() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userDetails = `${API_URL}/users`;
        const metadataResponse = await fetch(userDetails, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const metadata = await metadataResponse.json();
        setUserMetadata(metadata);
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
            <h1 className="title">Profile of {userMetadata?.full_name}</h1>
            <h2 className="subtitle">My profile</h2>
          </div>
        </div>
      </section>
      <div className="container">
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
      </div>
    </div>
  );
}

export default Profile;
