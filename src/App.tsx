import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useApp } from './contexts/app';
import { RESET_URL, TRACKS_URL, ROOT_URL } from './constants';
import styles from './App.module.scss';

const Welcome = lazy(() => import('./screens/Welcome'));
const LessonScreen = lazy(() => import('./screens/LessonScreen'));
const TrackScreen = lazy(() => import('./screens/TrackScreen'));
const NotFound = lazy(() => import('./screens/NotFound'));
const ResetScreen = lazy(() => import('./screens/ResetScreen'));
const Menu = lazy(() => import('./components/Menu'));
const Tracks = lazy(() => import('./screens/Tracks'));

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    services,
    selectors: { showWelcome },
  } = useApp();

  useEffect(() => {
    console.log('startApp');
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

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.wrapper}>
            <Switch>
              <Route exact path="/">
                {showWelcome && showWelcome ? (
                  <Redirect to="/welcome" />
                ) : (
                  <Redirect to={TRACKS_URL} />
                )}
              </Route>
              <Route exact path="/welcome">
                <Welcome />
              </Route>
              <Route exact path={TRACKS_URL}>
                {showWelcome && showWelcome ? (
                  <Redirect to={ROOT_URL} />
                ) : (
                  <Tracks />
                )}
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
            <Menu />
          </div>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
