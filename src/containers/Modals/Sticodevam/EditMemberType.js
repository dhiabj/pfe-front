import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editMemberType } from "../../../_redux/actions/memberType";

const EditMemberType = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editMemberType(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const memberTypeData = props.mTypes?.find(
    (memberType) => memberType.id === props.id
  );
  //console.log(memberTypeData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un type d'adhérent
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="EditMemberTypeCode">
                    <Form.Label>Code Type Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MemberTypeCode"
                      ref={register({ required: true })}
                      className={`form-control ${
                        errors.MemberTypeCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code Type Adhérent"
                      defaultValue={
                        memberTypeData ? memberTypeData.MemberTypeCode : ""
                      }
                    />
                    {errors.MemberTypeCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditMemberTypeLabel">
                    <Form.Label>Libellé Type Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MemberTypeLabel"
                      ref={register({ required: true })}
                      className={`form-control ${
                        errors.MemberTypeLabel ? "is-invalid" : ""
                      }`}
                      placeholder="Libellé Type Adhérent"
                      defaultValue={
                        memberTypeData ? memberTypeData.MemberTypeLabel : ""
                      }
                    />
                    {errors.MemberTypeLabel && (
                      <small className="text-danger">Libellé incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditButton">
                    <Button variant="primary" type="submit">
                      Modifier
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

export default EditMemberType;
