import React, { useState } from "react";
import styled from "styled-components";
import { Container, Button } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { ROUTE_ADD, ROUTE_HOMEPAGE } from "./routes";
import { ContactListPage } from "./ContactList/ContactListPage";
import { AddContactPage } from "./AddContact/AddContactPage";
import { IntlProvider } from "react-intl";
import { translations } from "./translations";

export function App() {
  const [language, setLanguage] = useState("cs");

  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <div className="App">
        <Header>
          React
          <Button onClick={() => setLanguage("cs")}>cs</Button>
          <Button onClick={() => setLanguage("en")}>en</Button>
          {language}
        </Header>
        <Container>
          <Routes>
            <Route path={ROUTE_ADD} element={<AddContactPage />} />
            <Route path={ROUTE_HOMEPAGE} element={<ContactListPage />} />
          </Routes>
        </Container>
      </div>
    </IntlProvider>
  );
}

const Header = styled.div`
  background: #ddd;
  color: navy;
  padding: 0.5em 1em;
  margin-bottom: 1em;
`;
