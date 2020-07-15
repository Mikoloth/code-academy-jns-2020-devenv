const initialState = {
  users: [],
};
function userReducer(store = initialState, action) {
  switch (action.type) {
    case "GET_USERS_FULFILLED":
      return { ...store, users: action.payload };
    case "REMOVE_USER_FULFILLED":
      return {
        ...store,
        users: store.users.filter((user) => user._id !== action.payload.userId),
      };
    case "ADD_USER_FULFILLED":
      return { ...store, users: [...store.users, action.payload] };
    default:
      return store;
  }
}

export default userReducer;
