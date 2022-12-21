import React from "react";
import "./Specificity.css";
import PokemonTypesLogo from "../IconType/IconType";
import heightPkm from "./height-pkm.svg";
import weightPkm from "./weight-pkm.svg";
import pokedex from "./pokedex.svg";
import pokeball from "./pokeball-svg.svg";
import pokemonTypeLogo from "../IconType/IconType";

export default function Specificity({ state }) {
  const pkmWeight = state.weight / 10;

  const newText = state.name.charAt(0).toUpperCase() + state.name.substr(1);

  return (
    <div className="container-pkm-specificity-types">
      <div className="pkm-specificity fadeIn">
        <img src={state.officialSprite} alt="pokemon sprite" />
        <div className="logo-and-specificity">
          <img src={pokeball} style={{ width: "60px" }} alt="pokeball-logo" />:{" "}
          {newText}
        </div>
        <div className="logo-and-specificity">
          {" "}
          <img
            src={heightPkm}
            style={{ width: "40px" }}
            alt="icon-height"
          />: {state.height / 10 + " m"}
        </div>
        <div className="logo-and-specificity">
          <img src={weightPkm} style={{ width: "40px" }} alt="icon-weight" /> :{" "}
          {pkmWeight} kg
        </div>
        <div className="logo-and-specificity">
          <img src={pokedex} style={{ width: "50px" }} alt="icon_pokedex" /> :{" "}
          {"n°" + state.pokedex}
        </div>
      </div>
      <div className="pkm-type">
        {state.types.length === 2 ? (
          <p>
            Types: {state.types[0].type.name} / {state.types[1].type.name}
          </p>
        ) : (
          <p>
            Type:
            {" " + state.types[0].type.name}
          </p>
        )}

        <img src={pokemonTypeLogo[state.types[0].type.name]} alt="logo-type" />
        {/* Logique pour l'image du  type 2*/}
        {state.types.length === 2 && (
          <img
            src={PokemonTypesLogo[state.types[1].type.name]}
            alt="logo type"
          />
        )}
      </div>
    </div>
  );
}
