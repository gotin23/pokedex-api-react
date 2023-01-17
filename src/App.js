import React from "react";
import "./App.css";
import PokeHome from "./Components/Home/PokeHome";
import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Description from "./Components/Description/Description";
import PkmCompare from "./Pages/PkmCompare/PkmCompare";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Loader />
      <NavBar />
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path="pokedex-api-react" element={<PokeHome />} />
        <Route path="/pkm/:id" element={<Description />} />
        <Route path="/compare" element={<PkmCompare />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
