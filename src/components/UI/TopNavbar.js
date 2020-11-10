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
  const [mobileNavbarIsActive, setMobileNavbarIsActive] = React.useState(false);
  function toggleBurgerMenu() {
    setMobileNavbarIsActive(!mobileNavbarIsActive); // toggle
    document.querySelector(".navbar-menu").classList.toggle("is-active");
  }
  function offBurgerMenu() {
    setMobileNavbarIsActive(false);
    document.querySelector(".navbar-menu").classList.remove("is-active");
  }
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            SmartFIN
          </Link>
          <button
            type="button"
            aria-label="menu"
            aria-expanded="false"
            className={`button is-text navbar-burger burger ${
              mobileNavbarIsActive ? "is-active" : ""
            }`}
            data-target="navbarBasicExample"
            onClick={toggleBurgerMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item" onClick={offBurgerMenu}>
              Home
            </Link>
            <Link
              to="/accounts"
              className="navbar-item"
              onClick={offBurgerMenu}
            >
              Accounts
            </Link>
            <Link to="/recipes" className="navbar-item" onClick={offBurgerMenu}>
              Recipes
            </Link>
            <Link to="/profile" className="navbar-item" onClick={offBurgerMenu}>
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
