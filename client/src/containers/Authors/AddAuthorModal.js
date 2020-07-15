import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as bookActions from "./bookAction";

const AddBookModal = (props) => {
  const { addBook, getAuthors, authors } = props;
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  const toggle = () => setModal(!modal);

  const onSubmitForm = (formData) => {
    const { author, ...book } = formData;
    addBook(author, book).then(() => toggle());
  };

  return (
    <div>
      <Button color="success" onClick={toggle}>
        Add new Book
      </Button>
      <Modal isOpen={modal}>
        <Formik initialValues={{ author: 1 }} onSubmit={onSubmitForm}>
          {({ isSubmitting, submitForm }) => (
            <React.Fragment>
              <ModalHeader toggle={toggle}>Add new book</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="author">Author</Label>
                    <Field as={Input} type="select" name="author">
                      {authors.map((author) => (
                        <option value={author.id}>{author.name}</option>
                      ))}
                    </Field>
                    <Label for="title">Name</Label>
                    <Field
                      as={Input}
                      type="text"
                      name="title"
                      placeholder="Kirjan nimi"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="publicationYear">PublicationYear</Label>
                    <Field
                      as={Input}
                      type="number"
                      name="publicationYear"
                      placeholder="2020"
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => submitForm()}
                  disabled={isSubmitting}
                >
                  Save
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

AddBookModal.displayName = "AddBookModal";
export default connect(
  (store) => ({ authors: store.bookStore.authors }),
  (dispatch) => bindActionCreators(bookActions, dispatch)
)(AddBookModal);
