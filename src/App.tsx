import React, { lazy, Suspense, useEffect, useState } from 'react';
import cn from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useApp } from './contexts/app';
import styles from './App.module.scss';
import TokenRoutes from './TokenRoutes';

const Welcome = lazy(() => import('./screens/Welcome'));
// const NotFound = lazy(() => import('./screens/NotFound'));

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    services,
    selectors: { menuState },
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

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.wrapper}>
            <Switch>
              {/* <Route exact path="/welcome">
                <Welcome />
              </Route> */}
              <Route exact path="/">
                <Redirect to="/app" />
              </Route>
              <Route path="/app">
                <TokenRoutes />
              </Route>
              <Route path="/welcome" component={Welcome} exact />

              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </Suspense>
        <div className={overlayClass} />
      </Router>
    </>
  );
}

export default App;
