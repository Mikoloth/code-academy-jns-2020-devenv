export function getBooks() {
  return {
    type: "GET_BOOKS",
    payload: fetch("/api/books").then((response) => response.json()),
  };
}

export function getAuthors() {
  return {
    type: "GET_AUTHORS",
    payload: fetch("/api/authors").then((response) => response.json()),
  };
}

export function removeBook(bookId) {
  return {
    type: "REMOVE_BOOK",
    payload: fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    }).then(() => ({ bookId })),
  };
}

export function addBook(authorId, book) {
  return {
    type: "ADD_BOOK",
    payload: fetch(`/api/authors/${authorId}/books`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(book),
    }).then((response) => response.json()),
  };
}
