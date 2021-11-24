import { Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { saveContact } from "./contactsModel";
import { ROUTE_HOMEPAGE } from "./routes";
import * as yup from "yup";

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

  const contactFormValidationSchema = yup.object().shape({
    name: yup.string("name_is_not_ok").required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
  });

  return (
    <Formik
      initialValues={initFormData}
      onSubmit={onSave}
      validationSchema={contactFormValidationSchema}
    >
      {({ values, handleSubmit, isSubmitting, getFieldProps }) => (
        <form onSubmit={handleSubmit}>
          <FormControlWrapper title="Name" name="name">
            <Form.Control {...getFieldProps("name")} />
          </FormControlWrapper>
          <FormControlWrapper title="Email" name="email">
            <Form.Control {...getFieldProps("email")} />
          </FormControlWrapper>
          <FormControlWrapper title="Phone" name="phone">
            <Form.Control {...getFieldProps("phone")} />
          </FormControlWrapper>
          <Form.Group>
            <Button type="submit">Add Contact</Button>
          </Form.Group>
        </form>
      )}
    </Formik>
  );
}

function FormControlWrapper({ name, title, children }) {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{title}</Form.Label>
      {children}
      <ErrorMessage name={name} component={Error} />
    </Form.Group>
  );
}

function Error({ children }) {
  return <Form.Text className="text-danger">{children}</Form.Text>;
}
