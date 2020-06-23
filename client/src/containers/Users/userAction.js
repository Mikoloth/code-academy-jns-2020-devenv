export function getUsers() {
  return {
    type: "GET_USERS",
    payload: fetch("/api/users").then((response) => response.json()),
  };
}
