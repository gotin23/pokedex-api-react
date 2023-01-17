/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./PkmText.css";
import { useSelector, useDispatch } from "react-redux";
import { getDescription } from "../../redux/articles/getDescriptionReducer/getDescriptionReducer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EvolutionChain from "../EvolutionChain/EvolutionChain";

export default function PkmText({ state }) {
  const { description } = useSelector((state) => ({
    ...state.getDescriptionReducer,
  }));

  const location = useLocation();
  const dispatch = useDispatch();

  const name = location.pathname.replace("/pkm/", "");
  name.replace("%", "");

  //Chargement du state lors du premier affichage de la page
  useEffect(() => {
    console.log("ok");
    dispatch(getDescription(name));
  }, [location]);

  //Array filtré des description du pkm uniquement en anglais
  const language =
    description.length !== 0 &&
    description.flavor_text_entries.filter((obj) => obj.language.name === "en");

  return (
    <>
      {/*Affichage de la description du pkm,  */}
      <div className="text-pkm-container fadeIn">
        {description.length !== 0 &&
          language[0].flavor_text.replace("\f", "").replace("é", "E")}
        {/*et logique pour savoir si le pkm est légendaire ou mythique*/}
        {description.is_legendary && (
          <p className="legendary-mythical">Legendary</p>
        )}
        {description.is_mythical && (
          <p className="legendary-mythical">Mythical</p>
        )}
      </div>
      {/*Affichage du composant avec la chaine d"evolution*/}
      {description.length !== 0 && description.evolution_chain !== null && (
        <EvolutionChain state={{ url: description.evolution_chain.url }} />
      )}
    </>
  );
}
