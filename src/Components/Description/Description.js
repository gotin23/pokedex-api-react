/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./Description.css";
import Stats from "../Stats/Stats";
import Specificity from "../Specificity/Specificity";
import AllAttack from "../AllAttack/AllAttack";
import Abilities from "../Abilities/Abilities";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPkmData } from "../../redux/articles/getPokemon/pkmData/pkmData";
import { getPokemon } from "../../redux/articles/getPokemon/getPokemonReducer";

import Cards from "../Cards/Cards";
import doubleArrow from "./double-arrow.svg";

import PkmText from "../PkmText/PkmText";
import Stats2 from "../Stats2/Stats2";

export default function Description() {
  const { pokemon } = useSelector((state) => ({
    ...state.getPokemonReducer,
  }));

  const { pkm } = useSelector((state) => ({
    ...state.pkmData,
  }));
  const location = useLocation();
  const dispatch = useDispatch();
  //chargement de tous les pkm si l'Array est vide
  useEffect(() => {
    if (pokemon.length === 0) {
      dispatch(getPokemon());
    }
  }, []);

  const name = location.pathname.replace("/pkm/", "");
  name.replace("%", "");
  //chargement du state de base du pkm
  useEffect(() => {
    dispatch(getPkmData(name));
  }, [location]);

  //toggle pour rendre visible le shiny
  const [toggleShiny, setToggleShiny] = useState(true);
  //toggle pour change l'affichage des stats
  const [toggleStats, setToggleStats] = useState(true);
  const handleToggleShiny = () => {
    setToggleShiny(!toggleShiny);
  };

  //function pour changer le state de la page suivante
  const handleNextPage = () => {
    dispatch({
      type: "TOGGLELOADER",
      payload: true,
    });
    /*  dispatch({
      type: "RESET",
      payload: [],
    });
    dispatch({
      type: "RESETABILITY",
      payload: [],
    });*/

    dispatch({
      type: "TOGGLEMOVES",
      payload: true,
    });

    setTimeout(
      () =>
        dispatch({
          type: "TOGGLELOADER",
          payload: false,
        }),
      1000
    );
    dispatch({
      type: "TOGGLEABILITY",
      payload: true,
    });
  };
  //function pour changer le state de la page prècédente
  const handlePreviousPage = () => {
    dispatch({
      type: "TOGGLEABILITY",
      payload: true,
    });
    /*    dispatch({
      type: "RESET",
      payload: [],
    });
    dispatch({
      type: "RESETABILITY",
      payload: [],
    });*/

    dispatch({
      type: "TOGGLEMOVES",
      payload: true,
    });
    dispatch({
      type: "TOGGLELOADER",
      payload: true,
    });
    setTimeout(
      () =>
        dispatch({
          type: "TOGGLELOADER",
          payload: false,
        }),
      1000
    );
  };

  return (
    <div
      style={{ margin: "auto", marginTop: "50px" }}
      className="container-all-description"
    >
      <div className="previous-next-pkm fadeIn">
        {/*lien vers le pkm précèdent*/}
        {pkm.length !== 0 && pkm.id !== 1 && (
          <Link
            className="btn-next-previous"
            onClick={handlePreviousPage}
            to={{
              pathname: `/pkm/${pokemon.results[pkm.id - 2].name}`,
            }}
            state={{
              name: pokemon.results[pkm.id - 2].name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pkm.id - 1
              }.png`,
              pokedex: pkm.id - 1,
            }}
          >
            <Cards
              state={{
                name: pokemon.results[pkm.id - 2].name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pkm.id - 1
                }.png`,
                pokedex: pkm.id - 1,
              }}
            />
          </Link>
        )}
        {/*Affichage de la double fléche*/}
        {pkm.id !== 1 && pkm.id !== 151 && (
          <div className="container-double-arrow">
            {" "}
            <img
              src={doubleArrow}
              style={{ width: "50px", margin: "20px" }}
              alt="double-arrow-icon"
              className="double-arrow"
            />
          </div>
        )}
        {/*lien vers le pkm suivant*/}
        {pkm.length !== 0 && pkm.id !== 151 && (
          <Link
            className="btn-next-previous"
            onClick={handleNextPage}
            to={{
              pathname: `/pkm/${pokemon.results[pkm.id].name}`,
            }}
            state={{
              name: pokemon.results[pkm.id].name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pkm.id + 1
              }.png`,
              pokedex: pkm.id - 1,
            }}
          >
            <Cards
              state={{
                name: pokemon.results[pkm.id].name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pkm.id + 1
                }.png`,
                pokedex: pkm.id + 1,
              }}
            />
          </Link>
        )}
      </div>
      {/*container stats et ability*/}
      <div className="pkm-description-container">
        <div className="pkm-stats-container fadeIn">
          {/*bouton pour toggle l'affichage des stats*/}
          <button
            className="toggle-stats"
            onClick={() => setToggleStats(!toggleStats)}
          >
            Switch
          </button>
          {/* Les stats format araigné */}
          {pkm.length !== 0 && !toggleStats && (
            <Stats
              state={{
                hp: pkm.stats[0].base_stat,
                attack: pkm.stats[1].base_stat,
                defense: pkm.stats[2].base_stat,
                specialAttack: pkm.stats[3].base_stat,
                specialDefense: pkm.stats[4].base_stat,
                speed: pkm.stats[5].base_stat,
              }}
            />
          )}
          {/* Les stats format bar */}
          {pkm.length !== 0 && toggleStats && (
            <Stats2
              state={{
                hp: pkm.stats[0].base_stat,
                attack: pkm.stats[1].base_stat,
                defense: pkm.stats[2].base_stat,
                specialAttack: pkm.stats[3].base_stat,
                specialDefense: pkm.stats[4].base_stat,
                speed: pkm.stats[5].base_stat,
              }}
            />
          )}
          {/*Affichage du Composant abilitées*/}
          {pkm.length !== 0 && <Abilities state={{ stats: pkm.abilities }} />}
        </div>

        {/*container avec le sprite pkm home et le sprite pkm home shiny*/}
        {/*Sprite normal*/}
        <div className="pkm-description-sprite">
          {toggleShiny && pkm.length !== 0 && (
            <img
              src={pkm.sprites.other.home.front_default}
              alt="pokemon-normal"
              className={`pkm-sprite-img rubberBand`}
            />
          )}
          {/*Sprite shiny*/}
          {!toggleShiny && pkm.length !== 0 && (
            <img
              src={pkm.sprites.other.home.front_shiny}
              alt="pokemon-shiny"
              className={"pkm-sprite-img rubberBand"}
            />
          )}
          {/* bouton en forme de pokeball pour toggle le shiny*/}
          {toggleShiny && <button onClick={handleToggleShiny}>Shiny</button>}
          {!toggleShiny && <button onClick={handleToggleShiny}>Normal</button>}
          {/* Affichage du composant avec la description du pkm et la chaine d'evolution*/}
          {pkm.length !== 0 && <PkmText state={{ name: name }} />}
        </div>
        {/*affichage du composant specificity */}
        {pkm.length !== 0 && (
          <Specificity
            state={{
              officialSprite:
                pkm.sprites.other["official-artwork"].front_default,
              name: pkm.name,
              height: pkm.height,
              weight: pkm.weight,
              pokedex: pkm.id,
              types: pkm.types,
            }}
          />
        )}
      </div>
      {/*Affichage du composant de toutes les moves*/}
      {pkm.length !== 0 && <AllAttack state={{ moves: pkm.moves }} />}
    </div>
  );
}
