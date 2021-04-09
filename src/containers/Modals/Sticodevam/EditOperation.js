import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editOperation } from "../../../_redux/actions/operationCode";

const EditOperation = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editOperation(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const operationData = props.operations?.find(
    (operation) => operation.id === props.id
  );
  //console.log(operationData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un code d'opération
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="editOperationForm">
                  <Form.Group controlId="EditOperationCode">
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
                      defaultValue={
                        operationData ? operationData.OperationCode : ""
                      }
                      placeholder="Code Opération"
                    />
                    {errors.OperationCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditOperationLabel">
                    <Form.Label>Libellé Opération</Form.Label>
                    <Form.Control
                      type="text"
                      name="OperationLabel"
                      ref={register({ required: false })}
                      defaultValue={
                        operationData ? operationData.OperationLabel : ""
                      }
                      placeholder="Libellé Opération"
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
          <Button variant="success" type="submit" form="editOperationForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditOperation;
