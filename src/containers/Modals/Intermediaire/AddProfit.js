import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProfit } from "../../../_redux/actions/profits";

const AddProfit = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addProfit(values));
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
            Insérer un code de profit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="profitCodeForm">
                  <Form.Group controlId="AddProfitCode">
                    <Form.Label>Code de profit</Form.Label>
                    <Form.Control
                      type="text"
                      name="ProfitCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{2}/,
                        maxLength: 2,
                      })}
                      className={`form-control ${
                        errors.ProfitCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code de profit"
                    />
                    {errors.ProfitCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddProfitLabel">
                    <Form.Label>Libellé de profit</Form.Label>
                    <Form.Control
                      type="text"
                      name="ProfitLabel"
                      ref={register({ required: false })}
                      placeholder="Libellé de profit"
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
          <Button variant="primary" type="submit" form="profitCodeForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProfit;
