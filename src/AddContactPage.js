import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { saveContact } from "./contactsModel";
import { ROUTE_HOMEPAGE } from "./routes";

export function AddContactPage() {
  const navigate = useNavigate();

  const saveContactMutation = useMutation(saveContact, {
    onSuccess: () => {
      navigate(ROUTE_HOMEPAGE);
    },
    retry: 3,
  });

  return (
    <>
      <h1>Add Contact</h1>
      <p>
        <Link to={ROUTE_HOMEPAGE} className="btn btn-primary">
          Go Back
        </Link>
      </p>
      <AddContactForm
        onAddContact={(contact) => saveContactMutation.mutate(contact)}
      />
    </>
  );
}
function AddContactForm({ onAddContact }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function onSave() {
    const contact = { name, email, phone };
    setName("");
    setEmail("");
    setPhone("");
    onAddContact(contact);
  }

  return (
    <>
      <Form.Group controlId="name">
        <Form.Label>Name {name}</Form.Label>
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Button onClick={onSave}>Add Contact</Button>
      </Form.Group>
    </>
  );
}
