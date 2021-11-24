import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ROUTE_ADD, ROUTE_HOMEPAGE } from "./routes";
import { ContactListPage } from "./ContactListPage";
import { AddContactPage } from "./AddContactPage";

const data = [
  { id: 1, name: "Alice", email: "alice@gmail.com", phone: "12344454654" },
  { id: 2, name: "Bob", email: "bob@gmail.com", phone: "7687" },
  { id: 3, name: "Cecil", email: "cecil@gmail.com", phone: "54767" },
  { id: 4, name: "Dana", email: "dana@gmail.com", phone: "0908890" },
];

let maxId = 70;

export function App() {
  const [contacts, setContacts] = useState(data);
  const navigate = useNavigate();

  function onAddContact(contact) {
    setContacts([{ id: maxId++, ...contact }, ...contacts]);
    navigate("/");
  }

  return (
    <div className="App">
      <Header>React</Header>
      <Container>
        <Routes>
          <Route
            path={ROUTE_ADD}
            element={<AddContactPage onAddContact={onAddContact} />}
          />
          <Route
            path={ROUTE_HOMEPAGE}
            element={<ContactListPage contacts={contacts} />}
          />
        </Routes>
      </Container>
    </div>
  );
}

const Header = styled.div`
  background: #ddd;
  color: navy;
  padding: 0.5em 1em;
  margin-bottom: 1em;
`;
