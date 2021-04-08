import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addOperation } from "../../../_redux/actions/operationCode";

const AddOperation = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addOperation(values));
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
            Insérer un code d'opération
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="operationForm">
                  <Form.Group controlId="AddOperationCode">
                    <Form.Label>Code Opération</Form.Label>
                    <Form.Control
                      type="text"
                      name="OperationCode"
                      ref={register({
                        required: true,
                        pattern: /[A-Z]{2}/,
                        maxLength: 2,
                      })}
                      className={`form-control ${
                        errors.OperationCode ? "is-invalid" : ""
                      }`}
                    />
                    {errors.OperationCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddOperationLabel">
                    <Form.Label>Libellé Opération</Form.Label>
                    <Form.Control
                      type="text"
                      name="OperationLabel"
                      ref={register({ required: false })}
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
          <Button variant="primary" type="submit" form="operationForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddOperation;
