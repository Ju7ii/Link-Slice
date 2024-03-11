import React from "react";
import ShortUrlGenerator from "./components/UrlGenerator/ShortUrlGenerator";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <>
      <Navigation></Navigation>

      <div /* Placeholder */ className="fs-1 text-white">.</div>

      <ShortUrlGenerator />
    </>
  );
}

export default App;
