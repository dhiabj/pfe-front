import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addReglement } from "../../../_redux/actions/reglement";

const AddReglement = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addReglement(values));
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
            Insérer un code de réglement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="reglementCodeForm">
                  <Form.Group controlId="AddReglementCode">
                    <Form.Label>Code de règlement</Form.Label>
                    <Form.Control
                      type="text"
                      name="ReglementCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]/,
                        maxLength: 1,
                      })}
                      className={`form-control ${
                        errors.ReglementCode ? "is-invalid" : ""
                      }`}
                    />
                    {errors.ReglementCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddReglementLabel">
                    <Form.Label>Libellé de règlement</Form.Label>
                    <Form.Control
                      type="text"
                      name="ReglementLabel"
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
          <Button variant="primary" type="submit" form="reglementCodeForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddReglement;
