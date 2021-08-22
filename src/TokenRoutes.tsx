import React, { lazy, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useApp } from './contexts/app';
import { RESET_URL, TOKEN_INACTIVE, TRACKS_URL } from './constants';
import Loader from './components/Loader';

const LessonScreen = lazy(() => import('./screens/LessonScreen'));
const TrackScreen = lazy(() => import('./screens/TrackScreen'));
const ResetScreen = lazy(() => import('./screens/ResetScreen'));
const Tracks = lazy(() => import('./screens/Tracks'));

function TokenRoutes() {
  const history = useHistory();
  const {
    selectors: { token },
  } = useApp();

  useEffect(() => {
    if (token === TOKEN_INACTIVE) {
      return history.push('/welcome');
    }

    return () => {};
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/app" exact>
            <Redirect to="/app/tracks" />
          </Route>
          <Route exact path={TRACKS_URL}>
            <Tracks />
          </Route>
          <Route exact path={`${TRACKS_URL}/:slug`} component={TrackScreen} />
          <Route
            path={`${TRACKS_URL}/:slug?/(lessons)?/:lessonId`}
            component={LessonScreen}
            exact
          />
          <Route exact path={RESET_URL} component={ResetScreen} />
        </Switch>
      </Suspense>
    </>
  );
}

export default TokenRoutes;
