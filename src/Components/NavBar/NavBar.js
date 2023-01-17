import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();

  //Function qui reset le state et toggle quand on retourne sur  l'accueil ou ailleur

  const navigateHome = () => {
    /* dispatch({
      type: "RESET",
      payload: [],
    });

    dispatch({
      type: "RESETDESCRIPTION",
      payload: [],
    });

    dispatch({
      type: "RESETCHAINPKM",
      payload: [],
    });*/

    dispatch({
      type: "TOGGLEMOVES",
      payload: true,
    });
  };

  return (
    <div className="nav-pkm">
      <nav>
        <ul>
          <NavLink
            onClick={navigateHome}
            to="/pokedex-api-react"
            className="link-nav"
            style={{ cursor: "pointer" }}
          >
            Home
          </NavLink>
          <NavLink
            onClick={navigateHome}
            to="/compare"
            className="link-nav"
            style={{ cursor: "pointer" }}
          >
            Stats comparator
          </NavLink>
        </ul>
        <h1>Pokedex</h1>
      </nav>
    </div>
  );
}
