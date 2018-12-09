import React from "react";

import { Navbar } from "./components";
import Routes from "./routes";

const App = () => {
  return (
    <React.Fragment>
      <div className="nav-purple">
        <Navbar classname="home" />
      </div>
      <div className="route-white">
        <Routes />
      </div>
    </React.Fragment>
  );
};

export default App;
