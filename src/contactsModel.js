import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export function loadContacts() {
  return axios.get("/items").then((response) => response.data.items);
}

export const useContacts = () => {
  return useQuery("load-contacts", loadContacts);
};

export const useContactsCustom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    loadContacts().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, data };
};

export function saveContact(contact) {
  return axios.post("/items", contact);
}
