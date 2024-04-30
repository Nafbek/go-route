// import React from "react";
import "./App.css";
// import MainDriver from "./Components/MainDriver";
import Package from "./Components/Package/PackageForm";
import Tier from "./Components/Tier/TierForm";
import Stop from "./Components/Stop/StopForm";
import Student from "./Components/Student/StudentForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { DispatcherGate } from "./Pages/DispatcherGate";
import { Footer } from "./Components/Footer";
import { Dashboard } from "./Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import MainDriverFetchData from "./Components/MainDriver/MainDriverDataFetcher";
function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <div>Test goRoute!</div>
        <MainDriverFetchData />

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
