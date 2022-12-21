import React from "react";
import "./AllAttack.css";
import pokemonTypeLogo from "../IconType/IconType";
import { useSelector, useDispatch } from "react-redux";
import iconAttack from "./icon-attack.svg";
import { v4 as uuidv4 } from "uuid";
import ArrowDown from "./arrow-down.png";
import Cross from "./cross.png";
import { getDetailMove } from "../../redux/articles/getDetailsMoves/GetDetailMoveReducer";

export default function AllAttack({ state }) {
  const { moves } = useSelector((state) => ({
    ...state.getDetailMoveReducer,
  }));
  const { toggleMoves } = useSelector((state) => ({
    ...state.toggle,
  }));

  const dispatch = useDispatch();

  //toogle  de accord et chargement du state au clique
  const handleAccord = () => {
    dispatch({
      type: "TOGGLEMOVES",
      payload: !toggleMoves,
    });
    if (moves.length === 0) {
      state.moves.forEach((move) => {
        dispatch(getDetailMove(move.move.name));
      });
    }
  };

  return (
    <div className="all-attack-container">
      {/*logique pour le toogle de accord et changement de l'icone ouvrir/fermer */}
      {toggleMoves ? (
        <img
          onClick={handleAccord}
          src={ArrowDown}
          alt="arrow-down"
          className="icon-modal"
        />
      ) : (
        <img
          onClick={handleAccord}
          src={Cross}
          alt="arrow-down"
          style={{ width: "20px" }}
          className="icon-modal"
        />
      )}
      <div className="container-title">
        <img
          src={iconAttack}
          alt="icon-attack"
          style={{ width: "50px", marginBottom: "8px" }}
        />
        <h2>All moves :</h2>
      </div>
      {/*logique pour affichage de toutes les attaques*/}
      {!toggleMoves && moves.length === state.moves.length && (
        <ul className="list-attack fadeIn">
          {moves.map((move) => {
            return (
              <li key={uuidv4()} className="attack">
                Name: <span className="span-moves">{move.name}</span>
                {move.accuracy !== null && " Accuracy: "}
                {move.accuracy !== null && (
                  <span className="span-moves">{move.accuracy}</span>
                )}
                {"  "}
                PP: <span className="span-moves">{move.pp} </span> Type:{" "}
                <span className="span-moves">{move.damage_class.name}</span>{" "}
                <span className="span-moves">{move.type.name}</span>
                <img
                  src={pokemonTypeLogo[move.type.name]}
                  alt="logo-type"
                  className="img-moves"
                  style={{ width: "20px", marginLeft: "3px" }}
                />
                <br /> Effect:{" "}
                <span className="span-moves">
                  {move.effect_entries.length > 0 &&
                    move.effect_entries[0].short_effect}
                </span>
                <br />
                <span className="generation-moves">
                  {" " + move.generation.name.toUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
