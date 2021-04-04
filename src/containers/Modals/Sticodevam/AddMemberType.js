import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMemberType } from "../../../_redux/actions/memberType";

const AddMemberType = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addMemberType(values));
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
            Insérer un type d'adhérent
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="AddMemberTypeCode">
                    <Form.Label>Code Type Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MemberTypeCode"
                      ref={register({
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                      className={`form-control ${
                        errors.MemberTypeCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code Type Adhérent"
                    />
                    {errors.MemberTypeCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddMemberTypeLabel">
                    <Form.Label>Libellé Type Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MemberTypeLabel"
                      ref={register({
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                      className={`form-control ${
                        errors.MemberTypeLabel ? "is-invalid" : ""
                      }`}
                      placeholder="Libellé Type Adhérent"
                    />
                    {errors.MemberTypeLabel && (
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

export default AddMemberType;