/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./PkmCompare.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemon } from "../../redux/articles/getPokemon/getPokemonReducer";
import SearchBar from "../../Components/SearchBar/SearchBar";
import StatsCompare from "./StatsCompare/StatsCompare";
import { getSecondPKM } from "../../redux/articles/getPkmToCompareReducer/getPkmToCompareReducer";
import { getFirstPKM } from "../../redux/articles/getPkmToCompareReducer/getPkmToCompareReducer";

export default function PkmCompare() {
  const dispatch = useDispatch();
  //Chargement de tous les nom de pokemon
  useEffect(() => {
    if (pokemon.length === 0) {
      dispatch(getPokemon());
    }
  }, []);
  useEffect(() => {
    if (firstPkmToCompare.length === 0) {
      dispatch(getFirstPKM("mew"));
    }
  }, []);
  useEffect(() => {
    if (secondPkmToCompare.length === 0) {
      dispatch(getSecondPKM("dragonite"));
    }
  }, []);
  const { pokemon } = useSelector((state) => ({
    ...state.getPokemonReducer,
  }));
  const { firstPkmToCompare, secondPkmToCompare } = useSelector((state) => ({
    ...state.getPkmToCompareReducer,
  }));
  console.log(firstPkmToCompare);
  return (
    <div className="container-compare-pkm" style={{ margin: "auto" }}>
      <div className="first-pkm-compare">
        <SearchBar state={{ pkm: "number1" }} />
        {firstPkmToCompare.length !== 0 && <h2>{firstPkmToCompare.name}</h2>}
        {firstPkmToCompare.length !== 0 && (
          <img
            className="img-pkm-compare"
            src={
              firstPkmToCompare.sprites.other["official-artwork"].front_default
            }
            alt="official-artwork"
          />
        )}
      </div>
      <div className="stats-pkm-compare">
        {" "}
        {firstPkmToCompare.length !== 0 && secondPkmToCompare.length !== 0 && (
          <StatsCompare
            state={{
              firstPkm: {
                name: firstPkmToCompare.name,
                hp: firstPkmToCompare.stats[0].base_stat,
                attack: firstPkmToCompare.stats[1].base_stat,
                defense: firstPkmToCompare.stats[2].base_stat,
                specialAttack: firstPkmToCompare.stats[3].base_stat,
                specialDefense: firstPkmToCompare.stats[4].base_stat,
                speed: firstPkmToCompare.stats[5].base_stat,
              },
              secondPkm: {
                name: secondPkmToCompare.name,
                hp: secondPkmToCompare.stats[0].base_stat,
                attack: secondPkmToCompare.stats[1].base_stat,
                defense: secondPkmToCompare.stats[2].base_stat,
                specialAttack: secondPkmToCompare.stats[3].base_stat,
                specialDefense: secondPkmToCompare.stats[4].base_stat,
                speed: secondPkmToCompare.stats[5].base_stat,
              },
            }}
          />
        )}
        {secondPkmToCompare.length === 0 || firstPkmToCompare.length === 0 ? (
          <h2>Add Pokemon to compare</h2>
        ) : null}
      </div>
      <div className="second-pkm-compare">
        <SearchBar state={{ pkm: "number2" }} />
        {secondPkmToCompare.length !== 0 && <h2>{secondPkmToCompare.name}</h2>}
        {secondPkmToCompare.length !== 0 && (
          <img
            className="img-pkm-compare"
            src={
              secondPkmToCompare.sprites.other["official-artwork"].front_default
            }
            alt="official-artwork"
          />
        )}
      </div>
    </div>
  );
}
