import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMarket } from "../../../_redux/actions/market";

const AddMarket = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addMarket(values));
    props.onHide();
    //console.log(values);
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
            Insérer un code de marché
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="marketForm">
                  <Form.Group controlId="AddMarketCode">
                    <Form.Label>Code de marché</Form.Label>
                    <Form.Control
                      type="text"
                      name="MarketCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{3}/,
                        maxLength: 3,
                      })}
                      className={`form-control ${
                        errors.MarketCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code de marché"
                    />
                    {errors.MarketCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddMarketLabel">
                    <Form.Label>Libellé de marché</Form.Label>
                    <Form.Control
                      type="text"
                      name="MarketLabel"
                      ref={register({ required: false })}
                      placeholder="Libellé de marché"
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
          <Button variant="primary" type="submit" form="marketForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMarket;
