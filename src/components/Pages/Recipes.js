import { useAuth0 } from "@auth0/auth0-react";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format, formatDistance, isAfter, parseISO } from "date-fns";
import { API_URL } from "../../utils/utils";

const cardFooter = {
  marginTop: "auto",
};

function Recipes() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [formStatusType, setFormStatusType] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [userRecipes, setUserRecipes] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const getAllRecipes = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const apiUrl = `${API_URL}/recipes/list`;
        const metadataResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal,
        });
        const data = await metadataResponse.json();
        setUserRecipes(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    getAllRecipes();

    // Need to unsubscribe to API calls if the user moves away from the page before fetch() is done
    return function cleanup() {
      abortController.abort();
    };
  }, [getAccessTokenSilently, user]);

  async function handleManualTrigger(taskName) {
    try {
      const accessToken = await getAccessTokenSilently();
      let apiUrl = "";

      if (taskName === "tbank.salary.transfer") {
        apiUrl = `${API_URL}/integrations/tbank/recipe_salary_transfer/trigger`;
      }
      if (taskName === "smartfin.aggregated_email") {
        apiUrl = `${API_URL}/integrations/smartfin/aggregated_email/trigger`;
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json?.message === "OK") {
        setFormStatus(
          `You've successfully triggered the task ${taskName}. Please check the status in Run History.`
        );
      } else {
        setFormStatus(json?.message);
      }

      if (json?.status === 200) {
        setFormStatusType("is-success is-light");
      } else {
        setFormStatusType("is-danger is-light");
      }
    } catch (e) {
      console.error(e.message);
      setFormStatus(e.message);
      setFormStatusType("is-danger is-light");
    }
  }

  function RecipesList({ recipes }) {
    if (Object.keys(recipes).length > 0) {
      return (
        <>
          {Object.keys(recipes).map((i) => {
            console.log(recipes[i]);
            const creationTime = parseISO(recipes[i].creation_time);
            const creationTimeFormatted = format(creationTime, "PPp");
            const creationTimeAgo = formatDistance(creationTime, new Date(), {
              addSuffix: true,
            });
            const expirationTime = parseISO(recipes[i].expiration_time);
            const expirationTimeFormatted = format(expirationTime, "PPp");
            console.log(
              isAfter(expirationTime, new Date()),
              recipes[i].task_name
            );
            const expirationTimeAgo = formatDistance(
              expirationTime,
              new Date(),
              { addSuffix: true }
            );
            if (recipes[i].task_name === "tbank.salary.transfer") {
              return (
                <div className="card mb-4" key={recipes[i].task_name}>
                  <div className="card-content">
                    <div className="content">
                      <h2>💰 Save some of my salary to another account</h2>
                      <div>
                        Task Name: <code>{recipes[i].task_name}</code>
                      </div>
                      <div>
                        Creation time: {creationTimeFormatted}{" "}
                        <span className="tag is-light">{creationTimeAgo}</span>
                      </div>
                      <div>
                        Next run time: {expirationTimeFormatted}{" "}
                        <span className="tag is-light">
                          {expirationTimeAgo}
                        </span>
                      </div>
                      <div>
                        From account: <code>{recipes[i].data.from}</code>
                      </div>
                      <div>
                        To account: <code>{recipes[i].data.to}</code>
                      </div>
                      <div>
                        Keyword: <code>salary</code>
                      </div>
                      <div>
                        % of salary to transfer:{" "}
                        <code>{recipes[i].data.amount}</code>
                      </div>
                      <div>
                        Schedule: <code>{recipes[i].data.schedule}</code>
                      </div>
                    </div>
                  </div>
                  <footer className="card-footer" style={cardFooter}>
                    <div className="card-footer-item">
                      <a
                        onClick={async () =>
                          handleManualTrigger(recipes[i].task_name)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        Trigger Now
                      </a>
                    </div>
                    <div className="card-footer-item">Delete</div>
                  </footer>
                </div>
              );
            }
            if (recipes[i].task_name === "smartfin.aggregated_email") {
              return (
                <div className="card mb-4" key={recipes[i].task_name}>
                  <div className="card-content">
                    <div className="content">
                      <h2>
                        📧 Send me a weekly aggregated transactions digest
                      </h2>
                      <div>
                        Task Name: <code>{recipes[i].task_name}</code>
                      </div>
                      <div>
                        Creation time: {creationTimeFormatted}{" "}
                        <span className="tag is-light">{creationTimeAgo}</span>
                      </div>
                      <div>
                        Next run time: {expirationTimeFormatted}{" "}
                        <span className="tag is-light">
                          {expirationTimeAgo}
                        </span>
                      </div>
                      <div>
                        {" "}
                        Schedule: <code>{recipes[i].data.schedule}</code>
                      </div>
                    </div>
                  </div>
                  <footer className="card-footer" style={cardFooter}>
                    <div className="card-footer-item">
                      <a
                        onClick={async () =>
                          handleManualTrigger(recipes[i].task_name)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        Trigger Now
                      </a>
                    </div>
                    <div className="card-footer-item">Delete</div>
                  </footer>
                </div>
              );
            }
          })}
        </>
      );
    }

    return (
      <>
        <div className="card mb-4">
          <div className="card-content">
            <div className="content">
              <h2>Oh no!</h2>
              You do not have any recipes.
            </div>
          </div>
          <footer className="card-footer" style={cardFooter}>
            <Link to="/recipes/explore" className="card-footer-item">
              Why not take a look at what recipes you create?
            </Link>
          </footer>
        </div>
      </>
    );
  }
  const notificationIsHidden = formStatusType !== "" ? "" : "is-hidden";
  const notificationClass = `notification ${formStatusType} ${notificationIsHidden}`;

  return (
    <div>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">My recipes</h1>
            <h2 className="subtitle">
              Here you can see all the recipes you&rsquo;ve created.
            </h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column is-2">
            <aside className="menu">
              <p className="menu-label">Recipes</p>
              <ul className="menu-list">
                <li>
                  <Link to="/recipes" className="is-active">
                    My Recipes
                  </Link>
                  <Link to="/recipes/explore">Explore Recipes</Link>
                  <Link to="/recipes/run_history">Run History</Link>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column">
            <div className={notificationClass}>{formStatus}</div>
            {userRecipes ? (
              <RecipesList recipes={userRecipes?.data} />
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

export default Recipes;
