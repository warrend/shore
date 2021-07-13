import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useApp } from "./contexts/app";
import { user } from "./data";
import { USER, TOKEN, LESSONS_URL, RESET_URL, TRACKS_URL } from "./constants";
import styles from "./App.module.scss";

const Welcome = lazy(() => import("./screens/Welcome"));
const LessonScreen = lazy(() => import("./screens/LessonScreen"));
const TrackScreen = lazy(() => import("./screens/TrackScreen"));
const NotFound = lazy(() => import("./screens/NotFound"));
const ResetScreen = lazy(() => import("./screens/ResetScreen"));
const Menu = lazy(() => import("./components/Menu"));
const Tracks = lazy(() => import("./screens/Tracks"));

function App() {
  const [loading, setLoading] = useState(false);
  const { services, selectors } = useApp();

  useEffect(() => {
    const appInit = async () => {
      setLoading(true);
      try {
        await services.startApp();
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
      // if (!localStorage.getItem(TOKEN)) {
      //   try {
      //     await services.setData(USER, user);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }

      // if (!localStorage.getItem(USER)) {
      //   services.setUser();
      // }

      // try {
      //   await services.getUser();
      // } catch (error) {
      //   console.error(error);
      // }
    };

    appInit();

    return () => {
      console.log("useEffect cleanup");
    };
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
                  <Redirect to={TRACKS_URL} />
                )}
              </Route>
              <Route exact path={TRACKS_URL} component={Tracks} />

              <Route
                exact
                path={`${TRACKS_URL}/:slug`}
                component={TrackScreen}
              />
              <Route
                path={`${TRACKS_URL}/:slug?/(lessons)?/:lessonId`}
                component={LessonScreen}
              />
              {/* <Route exact path={LESSONS_URL} component={LessonsScreen} /> */}
              <Route exact path={RESET_URL} component={ResetScreen} />

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
