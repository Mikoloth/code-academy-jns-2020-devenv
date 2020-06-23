import React, { useState } from "react";
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

const AddUserModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>
        Add new User
      </Button>
      <Modal isOpen={modal}>
        <Formik initialValues={{}}>
          {({ isSubmitting }) => (
            <React.Fragment>
              <ModalHeader toggle={toggle}>Add new user</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Field
                      as={Input}
                      type="text"
                      name="name"
                      placeholder="Maisa"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      placeholder="maisa@example.com"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Field as={Input} type="password" name="password" />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={toggle}
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

AddUserModal.displayName = "AddUserModal";
export default AddUserModal;
