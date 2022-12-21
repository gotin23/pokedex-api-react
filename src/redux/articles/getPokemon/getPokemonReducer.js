const INITIAL_STATE = {
  pokemon: [],
};
function getPokemonReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOADPOKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
  }
  return state;
}
export default getPokemonReducer;

export const getPokemon = () => (dispatch) => {
  fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=905")
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "LOADPOKEMON",
        payload: data,
      });
    });
};
