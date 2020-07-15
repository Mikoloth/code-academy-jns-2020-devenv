import React, { useEffect, useMemo, useCallback } from "react";
import DataTable from "../../components/DataTable";
import { FaTrash } from "react-icons/fa";
import AddUserModal from "./AddUserModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "./userAction";

const Users = (props) => {
  const { getUsers, removeUser, users } = props;

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const onDelete = useCallback((user) => removeUser(user._id), [removeUser]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "_id",
      },
      {
        Header: "Nimi",
        accessor: "name",
      },
      {
        Header: "Sähköposti",
        accessor: "email",
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
      <h3>Users</h3>
      <AddUserModal />
      <DataTable columns={columns} data={users} />
    </div>
  );
};

Users.displayName = "Users";

export default connect(
  (store) => ({
    users: store.userStore.users,
  }),
  (dispatch) => bindActionCreators(userActions, dispatch)
)(Users);
