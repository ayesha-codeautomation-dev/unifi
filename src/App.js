import React from "react";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import SitesDropdown from "./components/SitesDropdown";

function App() {
  const session = useSelector((state) => state.unifi.session); // Check if session is correctly accessed

  return (
    <div className="App">
      {!session ? <LoginPage /> : <SitesDropdown />}
    </div>
  );
}

export default App;
