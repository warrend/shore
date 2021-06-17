import React, { lazy, Suspense } from "react";

const Main = lazy(() => import("./screens/Main"));

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <Suspense fallback={<div>Loading</div>}>
      <Main />
    </Suspense>
    // </ThemeProvider>
  );
}

export default App;
