import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cards from "../Cards/Cards";
import { v4 as uuidv4 } from "uuid";
import "./SearchBar.css";
import { getFirstPKM } from "../../redux/articles/getPkmToCompareReducer/getPkmToCompareReducer";
import { getSecondPKM } from "../../redux/articles/getPkmToCompareReducer/getPkmToCompareReducer";
import { useDispatch } from "react-redux";

export default function SearchBar({ state }) {
  const dispatch = useDispatch();
  const { pokemon } = useSelector((state) => ({
    ...state.getPokemonReducer,
  }));
  const { firstPkmToCompare, secondPkmToCompare } = useSelector((state) => ({
    ...state.getPkmToCompareReducer,
  }));
  // Gestion de l'input de la searchBar
  const [searchPkm, setSearchPkm] = useState({ search: "" });
  const handleSearch = (e) => {
    setSearchPkm({
      ...searchPkm,
      search: e.target.value,
    });
    if (state.pkm === "number1") {
      dispatch({ type: "LOADFIRSTPKM", payload: [] });
    }
    if (state.pkm === "number2") {
      dispatch({ type: "LOADSECONDPKM", payload: [] });
    }
  };
  //Array filtré de la recherche
  const searchResult =
    pokemon.length !== 0 &&
    pokemon.results.filter((pkm) =>
      pkm.name.includes(searchPkm.search.toLowerCase())
    );

  return (
    <div>
      {
        <input
          className="search-input fadeIn"
          type="text"
          id="search"
          placeholder="Search Pokemon"
          onChange={handleSearch}
          value={searchPkm.search}
        />
      }
      {<label htmlFor="search"></label>}
      <div className="pkm-search-container">
        {pokemon.length !== 0 &&
          searchPkm.search.length !== 0 &&
          state.pkm === "number1" &&
          searchResult.map((pkm) => {
            return (
              <div className="container-search-img">
                <img
                  key={uuidv4()}
                  alt="pokemon-to-compare"
                  className="img-searchBar"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkm.url
                    .replace("https://pokeapi.co/api/v2/pokemon/", "")
                    .replace("/", "")}.png`}
                  onClick={() =>
                    dispatch(getFirstPKM(pkm.name)) +
                    setSearchPkm({ search: "" })
                  }
                />
                <p className="name-pkm-search">{pkm.name}</p>
              </div>
            );
          })}
      </div>
      <div className="pkm-search-container">
        {pokemon.length !== 0 &&
          searchPkm.search.length !== 0 &&
          state.pkm === "number2" &&
          searchResult.map((pkm) => {
            return (
              <div className="container-search-img">
                <img
                  key={uuidv4()}
                  alt="pokemon-to-compare"
                  className="img-searchBar"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkm.url
                    .replace("https://pokeapi.co/api/v2/pokemon/", "")
                    .replace("/", "")}.png`}
                  onClick={() =>
                    dispatch(getSecondPKM(pkm.name)) +
                    setSearchPkm({ search: "" })
                  }
                />
                <p className="name-pkm-search">{pkm.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
