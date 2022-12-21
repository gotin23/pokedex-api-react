import React from "react";
import "./Cards.css";
import pokeball from "./pokeball.png";

export default function Cards({ state }) {
  const newText = state.name.charAt(0).toUpperCase() + state.name.substr(1);

  return (
    <div className="pkm-card fadeIn">
      <h2>{newText}</h2>
      <p className="pokedex-number">Pokedex n° {state.pokedex}</p>
      <div className="sprite-container">
        <img src={state.image} alt="sprite-basic" className="sprite-basic" />
      </div>

      <img src={pokeball} alt="png-pokeball" className="png-pokeball" />
    </div>
  );
}
