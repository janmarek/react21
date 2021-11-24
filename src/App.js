import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { ROUTE_ADD, ROUTE_HOMEPAGE } from "./routes";
import { ContactListPage } from "./ContactListPage";
import { AddContactPage } from "./AddContactPage";

export function App() {
  return (
    <div className="App">
      <Header>React</Header>
      <Container>
        <Routes>
          <Route path={ROUTE_ADD} element={<AddContactPage />} />
          <Route path={ROUTE_HOMEPAGE} element={<ContactListPage />} />
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
