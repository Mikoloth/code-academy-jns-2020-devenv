const initialState = {
  books: [],
  authors: [],
};
function bookReducer(store = initialState, action) {
  switch (action.type) {
    case "GET_BOOKS_FULFILLED":
      return { ...store, books: action.payload };
    case "GET_AUTHORS_FULFILLED":
      return { ...store, authors: action.payload };
    case "REMOVE_BOOK_FULFILLED":
      return {
        ...store,
        books: store.books.filter((book) => book.id !== action.payload.bookId),
      };
    case "ADD_BOOK_FULFILLED":
      return { ...store, books: [...store.books, action.payload] };
    default:
      return store;
  }
}

export default bookReducer;
