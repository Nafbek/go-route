// import React from "react";
import "./App.css";
// import MainDriver from "./Components/MainDriver";
import Package from "./Components/Package";
import Tier from "./Components/Tier";
import Stop from "./Components/Stop";
import Student from "./Components/Student";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { DispatcherGate } from "./Components/DispatcherGate";
import { Footer } from "./Components/Footer";
import { Dashboard } from "./Components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <div>Test goRoute!</div>
        {/* <MainDriver /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/driver" element={<MainDriver />} /> */}
          <Route path="/package" element={<Package />} />

          {/* <Tier />
          <Stop />
          <Student /> */}
          <Route path="/dispatch" element={<DispatcherGate />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
