import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAccountCode } from "../../../_redux/actions/accountCode";

const AddIntermAccount = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addAccountCode(values));
    props.onHide();
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Insérer un code de compte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="accountCodeForm">
                  <Form.Group controlId="AddIntermAccountCode">
                    <Form.Label>Code de Compte</Form.Label>
                    <Form.Control
                      type="text"
                      name="IntermAccountCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{2}/,
                        maxLength: 2,
                      })}
                      className={`form-control ${
                        errors.IntermAccountCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code de Compte"
                    />
                    {errors.IntermAccountCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddIntermAccountLabel">
                    <Form.Label>Libellé de Compte</Form.Label>
                    <Form.Control
                      type="text"
                      name="IntermAccountLabel"
                      ref={register({ required: false })}
                      placeholder="Libellé de Compte"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Fermer
          </Button>
          <Button variant="primary" type="submit" form="accountCodeForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddIntermAccount;
