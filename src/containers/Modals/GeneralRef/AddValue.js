import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addValue } from "../../../_redux/actions/values";

const AddValue = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addValue(values));
    props.onHide();
    console.log(values);
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
            Insérer un code valeur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)} id="valueForm">
              <Form.Group as={Row} controlId="AddValueCode">
                <Form.Label column sm="4">
                  Code Valeur
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="ValueCode"
                    ref={register({ required: true })}
                    className={`form-control ${
                      errors.ValueCode ? "is-invalid" : ""
                    }`}
                  />
                  {errors.ValueCode && (
                    <small className="text-danger">
                      Ce champ est nécessaire
                    </small>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="AddValueLabel">
                <Form.Label column sm="4">
                  Libellé de la valeur
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="ValueLabel"
                    ref={register({ required: false })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="AddMnemonique">
                <Form.Label column sm="4">
                  Mnémonique
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="Mnemonique"
                    ref={register({ required: false })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="AddValueType">
                <Form.Label column sm="4">
                  Libellé de la valeur
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="ValueType"
                    ref={register({ required: false })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="AddNbTitresadmisBourse">
                <Form.Label column sm="4">
                  Nb de titres admis en bourse
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="NbTitresadmisBourse"
                    ref={register({ required: false })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="AddNbCodFlott">
                <Form.Label column sm="4">
                  Nb de titres flottants
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="NbCodFlott"
                    ref={register({ required: false })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="AddGroupCotation">
                <Form.Label column sm="4">
                  Groupe de cotation
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="GroupCotation"
                    ref={register({ required: false })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="AddSuperSecteur">
                <Form.Label column sm="4">
                  Super Secteur
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="SuperSecteur"
                    ref={register({ required: false })}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Fermer
          </Button>
          <Button variant="primary" type="submit" form="valueForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddValue;
