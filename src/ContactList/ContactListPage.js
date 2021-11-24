import React from "react";
import { Contact } from "./Contact";
import { Link } from "react-router-dom";
import { ROUTE_ADD } from "../routes";
import { useContacts } from "../contactsModel";
import { Alert } from "react-bootstrap";
import styled from "styled-components";

// smart component
export function ContactListPage() {
  const { isError, isLoading, data: contacts } = useContacts();

  return <ContactListPageView {...{ isError, isLoading, contacts }} />;
}

// dumb component
export function ContactListPageView({ isError, isLoading, contacts }) {
  return (
    <ContactListPageStyle>
      <h1>Contact List</h1>
      {isError && <Alert variant="danger">Error</Alert>}
      <p>
        <Link to={ROUTE_ADD}>Add Form</Link>
      </p>
      {isLoading && <p>Loading...</p>}
      {contacts && <ContactList contacts={contacts} />}
    </ContactListPageStyle>
  );
}

// styled component
const ContactListPageStyle = styled.div`
  h1 {
    color: red;
  }
`;

function ContactList({ contacts }) {
  return (
    <div>
      {contacts.map((c) => (
        <Contact key={c.id} contact={c} />
      ))}
    </div>
  );
}
