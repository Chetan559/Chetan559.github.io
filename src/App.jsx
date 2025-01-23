import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/Doctor" element={<Doctors />} />
          <Route path="/Pathology" element={<Pathology />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/analyse" element={<AnalyseForm />} />
          <Route path="/Doctor/patients" element={<Patients />} />
          <Route path="/Pathology/list" element={<MedicineDashboard />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
