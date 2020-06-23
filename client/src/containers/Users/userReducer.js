const initialState = {
  users: [],
};
function userReducer(store = initialState, action) {
  switch (action.type) {
    case "GET_USERS_FULFILLED":
      return { ...store, users: action.payload };
    default:
      return store;
  }
}

export default userReducer;
