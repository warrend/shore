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
  LESSONS_URL,
  TOKEN,
  RESET_URL,
  SLIDER_MESSAGE_ALL_COMPLETE,
} from "./constants";
import ResetScreen from "./screens/ResetScreen";
import styles from "./App.module.scss";

const Main = lazy(() => import("./screens/Main"));
const Welcome = lazy(() => import("./screens/Welcome"));
const LessonScreen = lazy(() => import("./screens/LessonScreen"));
const Nav = lazy(() => import("./components/Nav"));
const Menu = lazy(() => import("./components/Menu"));
const Slider = lazy(() => import("./components/Slider"));

function App() {
  const [loading, setLoading] = useState(false);
  const { services } = useApp();

  useEffect(() => {
    const appInit = async () => {
      setLoading(true);
      if (!localStorage.getItem(TOKEN)) {
        await services.setData(USER, user);
        await services.setData(LESSONS, lessons);
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
          <Nav />
          <div className={styles.wrapper}>
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
              <Route exact path={RESET_URL}>
                <ResetScreen />
              </Route>
              <Route exact path={`${LESSONS_URL}/:id`}>
                <LessonScreen />
              </Route>
              <Route>
                <div>404</div>
              </Route>
            </Switch>
          </div>
          <Menu />
          <Slider>
            <div>{SLIDER_MESSAGE_ALL_COMPLETE}</div>
          </Slider>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
