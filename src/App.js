import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useApp } from "./contexts/app";
import { user, lessons } from "./data";
import { USER, LESSONS, LESSONS_URL, TOKEN } from "./constants";

const Main = lazy(() => import("./screens/Main"));
const Welcome = lazy(() => import("./screens/Welcome"));
const Lesson = lazy(() => import("./screens/Lesson"));

function App() {
  const [loading, setLoading] = useState(true);
  const { services } = useApp();

  useEffect(() => {
    const appInit = async () => {
      if (!localStorage.getItem(TOKEN)) {
        await services.setData(USER, user);
        await services.setData(LESSONS, lessons);
      }

      await services.getUser();
      return await services.getLessons();
    };

    appInit();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            {!localStorage.getItem(TOKEN) ? (
              <Welcome />
            ) : (
              <Redirect to={LESSONS_URL} />
            )}
          </Route>
          <Route exact path={LESSONS_URL}>
            <Main />
          </Route>
          <Route exact path={`${LESSONS_URL}/:id`}>
            <Lesson />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
