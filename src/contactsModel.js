import axios from "axios";

export function loadContacts() {
  return axios.get("/items").then((response) => response.data.items);
}

export function saveContact(contact) {
  return axios.post("/items", contact);
}
