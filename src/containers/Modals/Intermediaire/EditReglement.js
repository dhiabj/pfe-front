import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editReglement } from "../../../_redux/actions/reglement";

const EditReglement = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editReglement(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const reglementData = props.reglements?.find(
    (reglement) => reglement.id === props.id
  );
  //console.log(reglementData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un code de règlement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  id="editReglementCodeForm">
                  <Form.Group controlId="EditReglementCode">
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
                      defaultValue={
                        reglementData ? reglementData.ReglementCode : ""
                      }
                    />
                    {errors.ReglementCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditReglementLabel">
                    <Form.Label>Libellé de règlement</Form.Label>
                    <Form.Control
                      type="text"
                      name="ReglementLabel"
                      ref={register({ required: false })}
                      defaultValue={
                        reglementData ? reglementData.ReglementLabel : ""
                      }
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
          <Button variant="success" type="submit" form="editReglementCodeForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditReglement;
