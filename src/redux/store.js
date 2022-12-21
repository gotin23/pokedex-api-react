import { createStore, applyMiddleware, combineReducers } from "redux";
import getPokemonReducer from "./articles/getPokemon/getPokemonReducer";
import getPkmDetailReducer from "./articles/getPokemon/Pkmdetail/getPkmdetailReducer";
import pkmData from "./articles/getPokemon/pkmData/pkmData";
import getEvolutionChainReducer from "./articles/getEvolutionChain/getEvolutionChainReducer";
import getDetailMoveReducer from "./articles/getDetailsMoves/GetDetailMoveReducer";
import resetReducer from "./articles/resetReducer/resetReducer";
import getDescriptionReducer from "./articles/getDescriptionReducer/getDescriptionReducer";
import getAbilityReducer from "./articles/getAbilityReducer/getAbilityReducer";
import getPkmToCompareReducer from "./articles/getPkmToCompareReducer/getPkmToCompareReducer";
import thunk from "redux-thunk";
import toggle from "./articles/toggle/toggle";

const rootReducer = combineReducers({
  getPokemonReducer,
  getPkmDetailReducer,
  pkmData,
  getEvolutionChainReducer,
  getDetailMoveReducer,
  resetReducer,
  getDescriptionReducer,
  getAbilityReducer,
  getPkmToCompareReducer,
  toggle,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
