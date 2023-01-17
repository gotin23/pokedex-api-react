import React from "react";
import abilityIcon from "./noun-pokemon.svg";
import "./Abilities.css";
import { useSelector, useDispatch } from "react-redux";
import { getAbility } from "../../redux/articles/getAbilityReducer/getAbilityReducer";

export default function Abilities({ state }) {
  const dispatch = useDispatch();
  const { ability } = useSelector((state) => ({
    ...state.getAbilityReducer,
  }));
  const { toggleAbility } = useSelector((state) => ({
    ...state.toggle,
  }));

  const showAbilityDetail = (e) => {
    dispatch({
      type: "TOGGLEABILITY",
      payload: false,
    });

    if (e.target.classList.contains("first-abl")) {
      dispatch(getAbility(state.stats[0].ability.url));
    } else if (e.target.classList.contains("second-abl")) {
      dispatch(getAbility(state.stats[1].ability.url));
    } else if (e.target.classList.contains("third-abl")) {
      dispatch(getAbility(state.stats[2].ability.url));
    }
  };
  // Array filtré de la description en anglais
  const arrayAbilityDescription =
    ability.length !== 0 &&
    ability.flavor_text_entries.filter((obj) => obj.language.name === "en");
  //logique pour l'affichge des talents

  return (
    <>
      <div className="ability-pkm-container  ">
        <div className="ability-title">
          <img src={abilityIcon} alt="ability icon" />
          <h2>Abilities:</h2>
        </div>
        {/* talent numero 1 : */}
        <p onClick={showAbilityDetail} className="ability-pkm first-abl">
          {state.stats.length !== 0 && state.stats[0].ability.name}{" "}
        </p>
        {state.stats.length !== 0 && state.stats[0].is_hidden === true ? (
          <p className="ability-hidden">hidden</p>
        ) : null}
        {/* talent numero 2 */}
        {state.stats.length >= 2 && (
          <p onClick={showAbilityDetail} className="ability-pkm second-abl">
            {state.stats[1].ability.name}
          </p>
        )}
        {state.stats.length >= 2 && state.stats[1].is_hidden === true && (
          <p className="ability-hidden">Hidden</p>
        )}
        {/* talent numero 3 */}
        {state.stats.length === 3 && (
          <p onClick={showAbilityDetail} className="ability-pkm third-abl">
            {state.stats[2].ability.name}
          </p>
        )}
        {state.stats.length === 3 && state.stats[2].is_hidden === true && (
          <p className="ability-hidden">Hidden</p>
        )}
      </div>
      {/* affichage détaillé du talent au click */}
      {!toggleAbility && (
        <div className="overlay fadeIn">
          <div className="modal">
            <div className="modal-content">
              {/* nom du talent */}
              <h2 className="modal-title">{ability.name}</h2>
              {/* description du talent */}
              <p className="modal-description">
                {ability.length !== 0 && arrayAbilityDescription[0].flavor_text}
              </p>
              {/* generation du talent  */}
              <p className="modal-generation">
                {ability.length !== 0 && ability.generation.name}
              </p>
              {/* bouton pour fermé le modal */}
              <button
                onClick={() =>
                  dispatch({
                    type: "TOGGLEABILITY",
                    payload: true,
                  }) +
                  dispatch({
                    type: "RESETABILITY",
                    payload: [],
                  })
                }
                className="close-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
