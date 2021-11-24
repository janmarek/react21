import { Formik, ErrorMessage } from "formik";
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

const initFormData = {
  name: "",
  email: "@",
  phone: "",
};

function validateContactForm(values) {
  const errors = {};

  if (values.name === "") {
    errors.name = "Name should be filled";
  }

  if (values.email.indexOf("@") === -1) {
    errors.email = "Email is not valid";
  }
  if (!values.phone.match(/^[0-9]+$/)) {
    errors.phone = "Phone number is not valid";
  }

  return errors;
}

function AddContactForm({ onAddContact }) {
  function onSave(values) {
    onAddContact(values);
  }

  // const props = {
  //   value: "Honza",
  //   name: "name",
  //   onBlur: () => {},
  //   onChange: () => {},
  // };

  // return <input value={props.value} onBlur={props.onBlur} />;
  // return <input {...props} />;

  // const otherProps = { ...props, value: "", id: 123 };

  // const arr1 = [1, 2, 3];
  // const arr2 = [4, ...arr1];

  return (
    <Formik
      initialValues={initFormData}
      onSubmit={onSave}
      validate={validateContactForm}
    >
      {({ values, handleSubmit, isSubmitting, getFieldProps }) => (
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control {...getFieldProps("name")} />
            <ErrorMessage name="name" component={Error} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control {...getFieldProps("email")} />
            <ErrorMessage name="email" component={Error} />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control {...getFieldProps("phone")} />
            <ErrorMessage name="phone" component={Error} />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Add Contact</Button>
          </Form.Group>
        </form>
      )}
    </Formik>
  );
}

function Error({ children }) {
  return <Form.Text className="text-danger">{children}</Form.Text>;
}
