const INITIAL_STATE = {
  allPkm: [],
};
function getPkmDetailReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ADDONPOKEDEX": {
      const newArr = [...state.allPkm];
      newArr.push(action.payload);

      return {
        ...state,
        allPkm: newArr,
      };
    }
  }
  return state;
}
export default getPkmDetailReducer;
