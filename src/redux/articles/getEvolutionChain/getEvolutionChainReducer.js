const INITIAL_STATE = {
  chain: [],
};
function getEvolutionChainReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOADCHAINPKM":
      return {
        ...state,
        chain: action.payload,
      };
    case "RESETCHAINPKM":
      return {
        chain: action.payload,
      };
  }
  return state;
}
export default getEvolutionChainReducer;

export const getEvolutionChain = (url) => (dispatch) => {
  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "LOADCHAINPKM",
        payload: data,
      });
    });
};
