import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import TopNavbar from "./components/UI/TopNavbar";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./components/Pages/Profile";
import Onboarding from "./components/Pages/Onboarding";
import AccountsLink from "./components/Pages/AccountsLink";
import AccountsLinkOCBC from "./components/Pages/AccountsLinkOCBC";
import AccountsLinktBank from "./components/Pages/AccountsLinktBank";
import Accounts from "./components/Pages/Accounts";
import Recipes from "./components/Pages/Recipes";
import RecipesExplore from "./components/Pages/Recipes/RecipesExplore";
import RecipesAdd from "./components/Pages/Recipes/RecipesAdd";
import RecipesAddSalary from "./components/Pages/Recipes/RecipesAddSalary";

export default function Router() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/accounts/link"
            component={AccountsLink}
          />
          <ProtectedRoute
            exact
            path="/accounts/link/tbank"
            component={AccountsLinktBank}
          />
          <ProtectedRoute
            exact
            path="/accounts/link/ocbc"
            component={AccountsLinkOCBC}
          />
          <ProtectedRoute exact path="/accounts" component={Accounts} />

          <ProtectedRoute exact path="/recipes" component={Recipes} />
          <ProtectedRoute
            exact
            path="/recipes/explore"
            component={RecipesExplore}
          />
          <ProtectedRoute exact path="/recipes/add" component={RecipesAdd} />
          <ProtectedRoute
            exact
            path="/recipes/add/salary"
            component={RecipesAddSalary}
          />

          <Route path="/onboarding" component={Onboarding} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
