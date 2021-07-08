import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useApp } from "./contexts/app";
import { user, lessons } from "./data";
import {
  USER,
  LESSONS,
  TOKEN,
  LESSONS_URL,
  RESET_URL,
  SLIDER_MESSAGE_ALL_COMPLETE,
} from "./constants";
import styles from "./App.module.scss";

const Main = lazy(() => import("./screens/Main"));
const Welcome = lazy(() => import("./screens/Welcome"));
const LessonScreen = lazy(() => import("./screens/LessonScreen"));
const NotFound = lazy(() => import("./screens/NotFound"));
const ResetScreen = lazy(() => import("./screens/ResetScreen"));
// const Nav = lazy(() => import("./components/Nav"));
const Menu = lazy(() => import("./components/Menu"));
const Slider = lazy(() => import("./components/Slider"));

function App() {
  const [loading, setLoading] = useState(false);
  const { services } = useApp();

  useEffect(() => {
    const appInit = async () => {
      setLoading(true);
      if (!localStorage.getItem(TOKEN)) {
        try {
          await services.setData(USER, user);
          await services.setData(LESSONS, lessons);
        } catch (error) {
          console.error(error);
        }
      }

      if (!localStorage.getItem(USER)) {
        services.setUser();
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
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.wrapper}>
            <Switch>
              <Route exact path="/">
                {!localStorage.getItem(TOKEN) ? (
                  <Welcome />
                ) : (
                  <Redirect to={LESSONS_URL} />
                )}
              </Route>
              <Route exact path={LESSONS_URL} component={Main} />
              <Route exact path={RESET_URL} component={ResetScreen} />
              <Route
                exact
                path={`${LESSONS_URL}/:id`}
                component={LessonScreen}
              />

              <Route component={NotFound} />
            </Switch>
            <Menu />
          </div>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
