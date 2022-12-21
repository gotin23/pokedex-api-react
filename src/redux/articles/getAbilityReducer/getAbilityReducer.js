const INITIAL_STATE = {
  ability: [],
};
function getAbilityReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOADABILITY":
      return {
        ability: action.payload,
      };
  }
  return state;
}
export default getAbilityReducer;

export const getAbility = (url) => (dispatch) => {
  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "LOADABILITY",
        payload: data,
      });
    });
};
