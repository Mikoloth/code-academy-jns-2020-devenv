import React, { useEffect, useState, useMemo, useCallback } from "react";
import DataTable from "../../components/DataTable";
import { FaTrash } from "react-icons/fa";
import AddUserModal from "./AddUserModal";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const onDelete = useCallback((userToRemove) => {
    fetch(`http://localhost:3001/users/${userToRemove.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to remove", userToRemove);
        } else {
          setUsers((users) =>
            users.filter((user) => user.id !== userToRemove.id)
          );
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
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
        accessor: (originalRow, rowIndex) => {
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
export default Users;
