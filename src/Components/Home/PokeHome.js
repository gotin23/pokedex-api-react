import React from "react";
import "./PokeHome.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemon } from "../../redux/articles/getPokemon/getPokemonReducer";
import { v4 as uuidv4 } from "uuid";
import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";
import DownArrow from "./down-arrow.svg";

import { handleReset } from "../../redux/articles/resetReducer/resetReducer";

export default function Home() {
  const { pokemon } = useSelector((state) => ({
    ...state.getPokemonReducer,
  }));

  const [togglePkm, setTogglePkm] = useState(false);

  const dispatch = useDispatch();
  //Chargement de tous les nom de pokemon
  useEffect(() => {
    if (pokemon.length === 0) {
      dispatch(getPokemon());
    }
  }, []);
  // Gestion de l'input de la searchBar
  const [searchPkm, setSearchPkm] = useState({ search: "" });
  const handleSearch = (e) => {
    setSearchPkm({
      ...searchPkm,
      search: e.target.value,
    });
  };
  //Array filtré de la recherche
  const searchResult =
    pokemon.length !== 0 &&
    pokemon.results.filter((pkm) =>
      pkm.name.includes(searchPkm.search.toLowerCase())
    );
  const handleLinkCard = () => {
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
      1200
    );
    dispatch(handleReset());
  };

  return (
    <div className="home fadeIn" style={{ margin: "auto" }}>
      {!togglePkm && (
        <h1 style={{ marginBottom: "50px", fontFamily: "arial" }}>
          Gotta Catch'Em All
        </h1>
      )}
      {/*Affichage de la searchBar */}
      {togglePkm && (
        <input
          className="search-input fadeIn"
          type="text"
          id="search"
          placeholder="Search Pokemon"
          onChange={handleSearch}
          value={searchPkm.search}
        />
      )}
      {<label htmlFor="search"></label>}
      {/*Affichage de la fléche */}
      {!togglePkm && (
        <img
          src={DownArrow}
          alt="down-arrow"
          className="bounce"
          style={{ width: "60px" }}
        />
      )}
      {/*Logique pour affichage de la recherche avec l'array filtré */}
      <div className="cards-container">
        {searchPkm.search.length > 0 &&
          searchResult.map((pkm) => {
            return (
              <Link
                to={{ pathname: `/pkm/${pkm.name}` }}
                key={uuidv4()}
                onClick={handleLinkCard}
              >
                <Cards
                  key={uuidv4()}
                  state={{
                    name: pkm.name,
                    pokedex: pkm.url
                      .replace("https://pokeapi.co/api/v2/pokemon/", "")
                      .replace("/", ""),
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkm.url
                      .replace("https://pokeapi.co/api/v2/pokemon/", "")
                      .replace("/", "")}.png`,
                  }}
                />
              </Link>
            );
          })}
        {/*Affichage du bouton en form de pokeball */}
        {!togglePkm && (
          <button
            onClick={() => setTogglePkm(true)}
            className="btn-pokedex"
          ></button>
        )}
        {/*Logique pour affichage des  cards de tous les pkm */}
        {togglePkm &&
          searchPkm.search.length === 0 &&
          pokemon.results.map((pkm, index) => {
            return (
              <Link
                to={{ pathname: `/pkm/${pkm.name}` }}
                key={uuidv4()}
                onClick={handleLinkCard}
              >
                <Cards
                  key={uuidv4()}
                  state={{
                    name: pkm.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      index + 1
                    }.png`,
                    pokedex: index + 1,
                  }}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
