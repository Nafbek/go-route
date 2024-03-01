// import React from "react";
import "./App.css";
import MainDriver from "./Components/MainDriver";
import Package from "./Components/Package";
import Tier from "./Components/Tier";
import Stop from "./Components/Stop";
import Student from "./Components/Student";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <div>Test goRoute!</div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/driver" element={<MainDriver />} />

          {/* <Package />
          <Tier />
          <Stop />
          <Student /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
