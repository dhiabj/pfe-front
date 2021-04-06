import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAccountType } from "../../../_redux/actions/accountTypes";

const AddAccountType = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addAccountType(values));
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
            Insérer un nature de compte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="AddAccountTypeCode">
                    <Form.Label>Code Nature de Compte</Form.Label>
                    <Form.Control
                      type="text"
                      name="AccountTypeCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{2}/,
                        maxLength: 2,
                      })}
                      className={`form-control ${
                        errors.AccountTypeCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code Nature de Compte"
                    />
                    {errors.AccountTypeCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddAccountTypeLabel">
                    <Form.Label>Libellé Nature de Compte</Form.Label>
                    <Form.Control
                      type="text"
                      name="AccountTypeLabel"
                      ref={register({ required: true })}
                      className={`form-control ${
                        errors.AccountTypeLabel ? "is-invalid" : ""
                      }`}
                      placeholder="Libellé Nature de Compte"
                    />
                    {errors.AccountTypeLabel && (
                      <small className="text-danger">Libellé incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddButton">
                    <Button variant="primary" type="submit">
                      Insérer
                    </Button>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddAccountType;
