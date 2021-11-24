import React, { useEffect, useState } from "react";
import { Contact } from "./Contact";
import { Link } from "react-router-dom";
import { ROUTE_ADD } from "./routes";
import { loadContacts } from "./contactsModel";
import { Alert } from "react-bootstrap";
import { useQuery } from "react-query";

export function ContactListPage() {
  const {
    isError,
    isLoading,
    data: contacts,
  } = useQuery("load-contacts", loadContacts);

  return (
    <>
      <h1>Contact List</h1>
      {isError && <Alert variant="danger">Error</Alert>}
      <p>
        <Link to={ROUTE_ADD}>Add Form</Link>
      </p>
      {isLoading && <p>Loading...</p>}
      {contacts && <ContactList contacts={contacts} />}
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
