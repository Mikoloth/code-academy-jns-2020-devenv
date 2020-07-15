import React, { useEffect, useMemo, useCallback } from "react";
import DataTable from "../../components/DataTable";
import { FaTrash } from "react-icons/fa";
import AddBookModal from "./AddBookModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as bookActions from "./bookAction";

const Books = (props) => {
  const { getBooks, removeBook, books } = props;

  useEffect(() => {
    getBooks();
  }, [getBooks]);
  const onDelete = useCallback((book) => removeBook(book.id), [removeBook]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Nimi",
        accessor: "title",
      },
      {
        Header: "Julkaistu",
        accessor: "publicationYear",
      },
      {
        Header: "Toiminnot",
        accessor: (originalRow) => {
          return <FaTrash onClick={() => onDelete(originalRow)} />;
        },
      },
    ],
    [onDelete]
  );

  return (
    <div>
      <h3>Books</h3>
      <AddBookModal />
      <DataTable columns={columns} data={books} />
    </div>
  );
};

Books.displayName = "Books";

export default connect(
  (store) => ({
    books: store.bookStore.books,
  }),
  (dispatch) => bindActionCreators(bookActions, dispatch)
)(Books);
