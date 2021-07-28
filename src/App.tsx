import React, { lazy, Suspense, useEffect, useState } from 'react';
import cn from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';
import { useApp } from './contexts/app';
import { RESET_URL, TRACKS_URL } from './constants';
import styles from './App.module.scss';

const Welcome = lazy(() => import('./screens/Welcome'));
const LessonScreen = lazy(() => import('./screens/LessonScreen'));
const TrackScreen = lazy(() => import('./screens/TrackScreen'));
const NotFound = lazy(() => import('./screens/NotFound'));
const ResetScreen = lazy(() => import('./screens/ResetScreen'));
const Tracks = lazy(() => import('./screens/Tracks'));

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    services,
    selectors: { token, menuState },
  } = useApp();

  useEffect(() => {
    const appInit = async () => {
      setLoading(true);
      try {
        await services.startApp();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    appInit();
  }, []);

  if (loading) {
    <div>Loading...</div>;
  }

  const overlayClass = cn({
    [styles.overlay]: menuState,
  });

  console.log('TOKEN', token);
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.wrapper}>
            <Switch>
              <Route exact path="/">
                {/* {token === 'app-token' ? (
                  <Redirect to={TRACKS_URL} />
                ) : (
                  <Redirect to="/welcome" />
                )} */}
                <Tracks />
              </Route>
              <Route exact path="/welcome">
                <Welcome />
                {/* {token === 'show-welcome' ? (
                  <Welcome />
                ) : (
                  <Redirect to="/tracks" />
                )} */}
              </Route>
              <Route exact path={TRACKS_URL}>
                <Tracks />
                {/* {token === 'app-token' ? (
                  <Tracks />
                ) : (
                  <Redirect to="/welcome" />
                )} */}
              </Route>

              <Route
                exact
                path={`${TRACKS_URL}/:slug`}
                component={TrackScreen}
              />
              <Route
                path={`${TRACKS_URL}/:slug?/(lessons)?/:lessonId`}
                component={LessonScreen}
              />
              <Route exact path={RESET_URL} component={ResetScreen} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Suspense>
        <div className={overlayClass} />
      </Router>
    </>
  );
}

export default App;
