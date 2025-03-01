import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Utilities from "./Pages/Utilities/Utilities";

function App() {
  return (
    <div className=" bg-gray-50 dark:bg-gray-800 h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/utilites" element={<Utilities />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
