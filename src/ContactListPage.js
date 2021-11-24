import React from "react";
import { Contact } from "./Contact";
import { Link } from "react-router-dom";
import { ROUTE_ADD } from "./routes";

export function ContactListPage({ contacts }) {
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
