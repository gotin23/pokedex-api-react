const INITIAL_STATE = {
  firstPkmToCompare: [],
  secondPkmToCompare: [],
};
function getPkmToCompareReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOADFIRSTPKM":
      return {
        ...state,
        firstPkmToCompare: action.payload,
      };
    case "LOADSECONDPKM":
      return {
        ...state,
        secondPkmToCompare: action.payload,
      };
  }
  return state;
}
export default getPkmToCompareReducer;

export const getFirstPKM = (name) => (dispatch) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "LOADFIRSTPKM",
        payload: data,
      });
    });
};
export const getSecondPKM = (name) => (dispatch) => {
  console.log(name);
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "LOADSECONDPKM",
        payload: data,
      });
    });
};
