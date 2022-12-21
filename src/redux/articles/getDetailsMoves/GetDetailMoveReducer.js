const INITIAL_STATE = {
  moves: [],
};
function getDetailMoveReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOADMOVESDETAILS":
      const newArr = [...state.moves];
      newArr.unshift(action.payload);
      return {
        moves: newArr,
      };
    case "RESET":
      return {
        moves: action.payload,
      };
  }
  return state;
}
export default getDetailMoveReducer;

export const getDetailMove = (move) => (dispatch) => {
  fetch(`https://pokeapi.co/api/v2/move/${move}/`)
    .then((response) => response.json())
    .then((data) => {
      return dispatch({
        type: "LOADMOVESDETAILS",
        payload: data,
      });
    });
};
