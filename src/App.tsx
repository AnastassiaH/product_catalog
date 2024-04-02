import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { AccessoriesPage } from "./pages/AccessoriesPage/AccessoriesPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
