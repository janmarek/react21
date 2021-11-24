import axios from "axios";

export function loadContacts() {
  return axios.get("/items");
}

export function saveContact(contact) {
  return axios.post("/items", contact);
}
