import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvolutionChain } from "../../redux/articles/getEvolutionChain/getEvolutionChainReducer";
import { getDescription } from "../../redux/articles/getDescriptionReducer/getDescriptionReducer";
import { getPkmData } from "../../redux/articles/getPokemon/pkmData/pkmData";
import "./EvolutionChain.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function EvolutionChain({ state }) {
  const dispatch = useDispatch();

  const { chain } = useSelector((state) => ({
    ...state.getEvolutionChainReducer,
  }));

  // Lien vers le pokemon , Reset et envois dy state
  const nextPkmEvoChain = (name) => {
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
    dispatch({
      type: "TOGGLEABILITY",
      payload: true,
    });
    dispatch({
      type: "RESET",
      payload: [],
    });

    dispatch(getDescription(name));
    dispatch({
      type: "RESETCHAINPKM",
      payload: [],
    });
    dispatch({
      type: "TOGGLEMOVES",
      payload: true,
    });
    dispatch(getPkmData(name));
  };

  //Chargement du state a l'affichage de la page
  useEffect(() => {
    dispatch(getEvolutionChain(state.url));
  }, []);

  //function pour changer le state si on change de page
  setTimeout(() => {
    if (chain.length === 0) {
      dispatch(getEvolutionChain(state.url));
    }
  }, 600);

  const arrName =
    chain.length !== 0 &&
    chain.chain.evolves_to.filter((obj) => obj.species.name);
  const arrId = chain.length !== 0 && arrName.map((obj) => obj.species);

  // affichage de la chaine d'evolution :
  return (
    <>
      <div className="container-evolution-chain">
        {/* premier pkm de la chaine */}
        {chain.length !== 0 && chain.chain.evolves_to.length !== 0 && (
          <div className="container-evo-chain-img">
            {" "}
            <Link
              to={{
                pathname: `/pkm/${chain.chain.species.name}`,
              }}
              onClick={() => nextPkmEvoChain(chain.chain.species.name)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.chain.species.url
                  .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                  .replace("/", "")}.png`}
                alt="evolution-chain"
                className="chain-evo-img"
              />
              <p className="chain-evo-name">{chain.chain.species.name}</p>
            </Link>
          </div>
        )}
        {/* second pkm de la chaine et pkm similaires (evolie...) */}
        {chain.length !== 0 &&
          arrId.length !== 0 &&
          arrId.map((obj) => {
            return (
              <div key={uuidv4()} className="container-evo-chain-img">
                <Link
                  to={{
                    pathname: `/pkm/${obj.name}`,
                  }}
                  onClick={() => nextPkmEvoChain(obj.name)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${obj.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .replace("/", "")}.png`}
                    alt="evolution-chain"
                    className="chain-evo-img"
                  />
                  <p className="chain-evo-name">{obj.name}</p>
                </Link>
              </div>
            );
          })}
        {/* 3eme pkm de la chaine */}
        {chain.length !== 0 &&
          chain.chain.evolves_to.length !== 0 &&
          chain.chain.evolves_to[0].evolves_to.length !== 0 && (
            <div className="container-evo-chain-img">
              <Link
                to={{
                  pathname: `/pkm/${chain.chain.evolves_to[0].evolves_to[0].species.name}`,
                }}
                onClick={() =>
                  nextPkmEvoChain(
                    chain.chain.evolves_to[0].evolves_to[0].species.name
                  )
                }
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.chain.evolves_to[0].evolves_to[0].species.url
                    .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                    .replace("/", "")}.png`}
                  alt="evolution-chain"
                  className="chain-evo-img"
                />
                <p className="chain-evo-name">
                  {chain.chain.evolves_to[0].evolves_to[0].species.name}
                </p>
              </Link>
            </div>
          )}
        {/* 4eme pkm de la chaine (troisiéme evolution alternative) */}
        {chain.length !== 0 &&
          chain.chain.evolves_to.length !== 0 &&
          chain.chain.evolves_to[0].evolves_to.length >= 2 && (
            <div className="container-evo-chain-img">
              <Link
                to={{
                  pathname: `/pkm/${chain.chain.evolves_to[0].evolves_to[1].species.name}`,
                }}
                onClick={() =>
                  nextPkmEvoChain(
                    chain.chain.evolves_to[0].evolves_to[1].species.name
                  )
                }
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.chain.evolves_to[0].evolves_to[1].species.url
                    .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                    .replace("/", "")}.png`}
                  alt="evolution-chain"
                  className="chain-evo-img"
                />
                <p className="chain-evo-name">
                  {chain.chain.evolves_to[0].evolves_to[1].species.name}
                </p>
              </Link>
            </div>
          )}
      </div>
      {/* titre */}
      {chain.length !== 0 && chain.chain.evolves_to.length !== 0 && (
        <h2>Evolution chain</h2>
      )}
    </>
  );
}
