const INITIAL_STATE = {
  description: [],
};
function getDescriptionReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOADDESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "RESETDESCRIPTION":
      return {
        description: action.payload,
      };
  }
  return state;
}
export default getDescriptionReducer;

export const getDescription = (name) => (dispatch) => {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "LOADDESCRIPTION",
        payload: data,
      });
    });
};
