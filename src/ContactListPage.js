import React, { useEffect, useState } from "react";
import { Contact } from "./Contact";
import { Link } from "react-router-dom";
import { ROUTE_ADD } from "./routes";
import { loadContacts } from "./contactsModel";

export function ContactListPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts().then((response) => setContacts(response.data.items));
  }, []);

  return (
    <>
      <h1>Contact List</h1>
      <p>
        <Link to={ROUTE_ADD}>Add Form</Link>
      </p>
      <ContactList contacts={contacts} />
    </>
  );
}

function ContactList({ contacts }) {
  return (
    <div>
      {contacts.map((c) => (
        <Contact key={c.id} contact={c} />
      ))}
    </div>
  );
}
