import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import SearchResults from "./components/pages/SearchPage";
import ProblemPage from "./components/pages/ProblemPage";
import MainLayout from "./components/layouts/mainLayout";

function App() {
  return (
    <Router>
      <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
      </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
