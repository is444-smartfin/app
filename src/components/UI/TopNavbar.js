import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function SignupButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    !isAuthenticated && (
      // eslint-disable-next-line react/button-has-type
      <button className="button is-success" onClick={loginWithRedirect}>
        <strong>Sign up</strong>
      </button>
    )
  );
}

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    !isAuthenticated && (
      // eslint-disable-next-line react/button-has-type
      <button className="button is-light" onClick={loginWithRedirect}>
        Log in
      </button>
    )
  );
}

function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();
  return (
    isAuthenticated && (
      // eslint-disable-next-line react/button-has-type
      <button
        className="button is-light"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log out
      </button>
    )
  );
}

function TopNavbar() {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            dApp
          </Link>
          <Link to="/" className="navbar-burger burger" />
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/stuff" className="navbar-item">
              Stuff
            </Link>
            <Link to="/stocks" className="navbar-item">
              Stocks
            </Link>
            <Link to="/profile" className="navbar-item">
              Profile
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <SignupButton />
                <LoginButton />
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNavbar;
