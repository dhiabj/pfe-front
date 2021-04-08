import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editValue } from "../../../_redux/actions/values";

const EditValue = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editValue(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const valueData = props.values?.find((value) => value.id === props.id);
  //console.log(valueData);
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un code valeur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)} id="editValueForm">
              <Form.Group as={Row} controlId="EditValueCode">
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
                    defaultValue={valueData ? valueData.Isin : ""}
                  />
                  {errors.ValueCode && (
                    <small className="text-danger">
                      Ce champ est nécessaire
                    </small>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="EditValueLabel">
                <Form.Label column sm="4">
                  Libellé de la valeur
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="ValueLabel"
                    ref={register({ required: false })}
                    defaultValue={valueData ? valueData.ValueLabel : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="EditMnemonique">
                <Form.Label column sm="4">
                  Mnémonique
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="Mnemonique"
                    ref={register({ required: false })}
                    defaultValue={valueData ? valueData.Mnemonique : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="EditValueType">
                <Form.Label column sm="4">
                  Libellé de la valeur
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="ValueType"
                    ref={register({ required: false })}
                    defaultValue={valueData ? valueData.ValueType : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="EditNbTitresadmisBourse">
                <Form.Label column sm="4">
                  Nb de titres admis en bourse
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="NbTitresadmisBourse"
                    ref={register({ required: false })}
                    defaultValue={
                      valueData ? valueData.NbTitresadmisBourse : ""
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="EditNbCodFlott">
                <Form.Label column sm="4">
                  Nb de titres flottants
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="NbCodFlott"
                    ref={register({ required: false })}
                    defaultValue={valueData ? valueData.NbCodFlott : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="EditGroupCotation">
                <Form.Label column sm="4">
                  Groupe de cotation
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="GroupCotation"
                    ref={register({ required: false })}
                    defaultValue={valueData ? valueData.GroupCotation : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="EditSuperSecteur">
                <Form.Label column sm="4">
                  Super Secteur
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    name="SuperSecteur"
                    ref={register({ required: false })}
                    defaultValue={valueData ? valueData.SuperSecteur : ""}
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
          <Button variant="success" type="submit" form="editValueForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditValue;
