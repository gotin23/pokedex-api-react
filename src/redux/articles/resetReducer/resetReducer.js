const INITIAL_STATE = {
  reset: true,
};
function resetReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "RESETCOMPONENTS":
      return {
        reset: action.payload,
      };
  }
  return state;
}
export default resetReducer;

export const handleReset = () => (dispatch) => {
  dispatch({
    type: "RESETCOMPONENTS",
    payload: false,
  });
  setTimeout(() => {
    dispatch({
      type: "RESETCOMPONENTS",
      payload: true,
    });
  }, 1);
};
