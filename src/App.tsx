import React, { lazy, Suspense, useEffect, useState } from 'react';
import cn from 'classnames';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  HashRouter,
} from 'react-router-dom';
import { useApp } from './contexts/app';
import styles from './App.module.scss';
import TokenRoutes from './TokenRoutes';
import Loader from './components/Loader';

const Welcome = lazy(() => import('./screens/Welcome'));
// const NotFound = lazy(() => import('./screens/NotFound'));

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    services,
    selectors: { menuState, sliderState },
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
    return <Loader />;
  }

  const overlayClass = cn({
    [styles.overlay]: menuState || sliderState,
  });

  return (
    <>
      <HashRouter>
        <Suspense fallback={<Loader />}>
          <div className={styles.wrapper}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/app" />
              </Route>
              <Route path="/app">
                <TokenRoutes />
              </Route>
              <Route path="/welcome" component={Welcome} exact />
            </Switch>
          </div>
        </Suspense>
        <div className={overlayClass} />
        <Loader />
      </HashRouter>
    </>
  );
}

export default App;
