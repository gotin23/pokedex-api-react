const INITIAL_STATE = {
  pkm: [],
};
function pkmData(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOADPKMDATA":
      return {
        ...state,
        pkm: action.payload,
      };
  }
  return state;
}
export default pkmData;

export const getPkmData = (name) => (dispatch) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "LOADPKMDATA",
        payload: data,
      });
    });
};
