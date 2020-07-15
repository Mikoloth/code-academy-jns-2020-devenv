export function getUsers() {
  return {
    type: "GET_USERS",
    payload: fetch("/api/users").then((response) => response.json()),
  };
}

export function removeUser(userId) {
  return {
    type: "REMOVE_USER",
    payload: fetch(`/api/users/${userId}`, {
      method: "DELETE",
    }).then(() => ({ userId })),
  };
}

export function addUser(user) {
  return {
    type: "ADD_USER",
    payload: fetch(`/api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => response.json()),
  };
}
