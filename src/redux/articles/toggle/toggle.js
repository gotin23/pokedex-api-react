const INITIAL_STATE = {
  toggleMoves: true,
  toggleAbility: true,
  toggleLoader: false,
};
function toggle(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "TOGGLEMOVES":
      return {
        ...state,
        toggleMoves: action.payload,
      };
    case "TOGGLELOADER":
      return {
        ...state,
        toggleLoader: action.payload,
      };
    case "TOGGLEABILITY":
      return {
        ...state,
        toggleAbility: action.payload,
      };
  }
  return state;
}
export default toggle;
