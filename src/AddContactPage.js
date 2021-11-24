import { Formik, ErrorMessage, FieldArray } from "formik";
import React, { useContext } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { saveContact } from "./contactsModel";
import { ROUTE_HOMEPAGE } from "./routes";
import * as yup from "yup";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";

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
      <h1>
        <FormattedMessage id="add-contact-title" />{" "}
        <FormattedDate value={new Date()} />{" "}
        <FormattedNumber value={8707.788} />
      </h1>
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
  usePhone: false,
  otherPhoneNumbers: [],
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

  const emptyPhoneNumber = { phone: "", type: "home" };

  return (
    <Formik
      initialValues={initFormData}
      onSubmit={onSave}
      validationSchema={contactFormValidationSchema}
    >
      {({ values, handleSubmit, isSubmitting, getFieldProps }) => (
        <form onSubmit={handleSubmit}>
          {JSON.stringify(values)}
          <FormControlWrapper title="Name" name="name">
            <Form.Control {...getFieldProps("name")} />
          </FormControlWrapper>
          <FormControlWrapper title="Email" name="email">
            <Form.Control {...getFieldProps("email")} />
          </FormControlWrapper>
          <Form.Group>
            <Form.Check {...getFieldProps("usePhone")} label="I have a phone" />
          </Form.Group>
          {values.usePhone && (
            <FormControlWrapper title="Phone" name="phone">
              <Form.Control {...getFieldProps("phone")} />
            </FormControlWrapper>
          )}
          <FieldArray
            name="otherPhoneNumbers"
            render={(arrayHelpers) => {
              return (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Phone number</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.otherPhoneNumbers.map((value, i) => (
                        <tr key={i}>
                          <td>
                            <Form.Control
                              {...getFieldProps(
                                `otherPhoneNumbers[${i}].phone`
                              )}
                            />
                          </td>
                          <td>
                            <Form.Select
                              {...getFieldProps(`otherPhoneNumbers[${i}].type`)}
                            >
                              <option value="home">home</option>
                              <option value="mobile">mobile</option>
                            </Form.Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p>
                    <Button onClick={() => arrayHelpers.push(emptyPhoneNumber)}>
                      Add
                    </Button>
                  </p>
                </>
              );
            }}
          />
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
