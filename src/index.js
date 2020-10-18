import "bulma/css/bulma.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="smu-digibank.us.auth0.com"
      clientId="q7COjT7tlDgn8zKeYveAd2Hrfjo4fBLi"
      redirectUri={window.location.origin}
      audience="https://api.ourfin.tech/"
      scope="read:profile write:profile read:tbank write:tbank"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
