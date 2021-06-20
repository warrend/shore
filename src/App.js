import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import { useApp } from "./contexts/app";
import { user, lessons } from "./data";
import { USER, LESSONS } from "./constants";

const Main = lazy(() => import("./screens/Main"));
const Welcome = lazy(() => import("./screens/Welcome"));

function App() {
  const { services, selectors } = useApp();
  const history = useHistory();
  console.log("selectors", selectors);

  useEffect(() => {
    const appInit = async () => {
      const res = await services.getData(USER);

      if (res) {
        await services.getUser();
        await services.getLessons();
      } else {
        await services.setData(USER, user);
        await services.setData(LESSONS, lessons);
      }
    };

    appInit();
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/main">
            <div>MAIN</div>
          </Route>
        </Switch>
      </Suspense>
    </Router>
    // </ThemeProvider>
  );
}

export default App;
