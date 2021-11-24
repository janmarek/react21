import React from "react";
import { Card } from "react-bootstrap";

export function Contact({ contact }) {
  const { name, email, phone } = contact;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          email: {email}, phone: {phone}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
