import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
