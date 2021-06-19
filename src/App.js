import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useApp } from "./contexts/app";
import { user, lessons } from "./data";
import { USER, LESSONS } from "./constants";

const Main = lazy(() => import("./screens/Main"));

function App() {
  const { services, selectors } = useApp();

  console.log("seletors", selectors);

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
            <Main />
          </Route>
        </Switch>
      </Suspense>
    </Router>
    // </ThemeProvider>
  );
}

export default App;
