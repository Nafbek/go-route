// import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainDriver from "./Components/MainDriver";
import Package from "./Components/Package";
import Tier from "./Components/Tier";
import Stop from "./Components/Stop";
import Student from "./Components/Student";

function App() {
  return (
    <div className="App">
      <div>We are React funs!</div>
      <MainDriver />
      <Package />
      <Tier />
      <Stop />
      <Student />
    </div>
  );
}

export default App;
