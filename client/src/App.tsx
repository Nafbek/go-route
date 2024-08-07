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
// import { DispatcherGate } from "./Pages/DispatcherGate";
import { Footer } from "./Components/Footer";
// import { Dashboard } from "./Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import MainDriverFetchData from "./Components/MainDriver/MainDriverDataFetcher";
import MainDriverForm from "./Components/MainDriver/MainDriverForm";
import PackageDataFetcher from "./Components/Package/PackageDataFetcher";

import TierDataFetcher from "./Components/Tier/TIerDataFetcher";
import { StopDataFetcher } from "./Components/Stop/StopDataFetcher";
import StudentDataFetcher from "./Components/Student/StudentDataFetcher";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <div>Test goRoute!</div>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/driver" element={<MainDriver />} /> */}
          <Route path="/package" element={<Package />} />
          <Route path="/package/results" element={<PackageDataFetcher />} />
          <Route path="/tier" element={<Tier />} />
          <Route path="/stop" element={<Stop />} />
          <Route path="/student" element={<Student />} />

          <Route path="/driver/details" element={<MainDriverFetchData />} />
          <Route path="/driver" element={<MainDriverForm />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/tier/results" element={<TierDataFetcher />} />
          <Route path="/stop/results" element={<StopDataFetcher />} />
          <Route path="/student/results" element={<StudentDataFetcher />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
