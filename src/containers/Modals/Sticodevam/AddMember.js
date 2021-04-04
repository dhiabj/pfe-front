import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getMemberTypes } from "../../../_redux/actions/memberType";
import Select from "react-select";
const AddMember = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemberTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit, errors } = useForm();
  const [selectedOption, setSelectedOption] = useState();
  const memberTypes = useSelector((state) => state.memberType.data);

  const newLabelValuesFromMemberTypesArray = memberTypes.map((memberType) => ({
    value: memberType.id,
    label: memberType.MemberTypeCode,
  }));

  //console.log(newLabelValuesFromMemberTypesArray);

  const onChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const onSubmit = (values) => {
    console.log({ ...values, MemberTypeId: selectedOption.value });
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
            Insérer un Adhérent
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="AddMembershipCode">
                    <Form.Label>Code Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MembershipCode"
                      ref={register({ required: true })}
                      className={`form-control ${
                        errors.MembershipCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code Adhérent"
                    />
                    {errors.MembershipCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddMemberName">
                    <Form.Label>Nom Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MemberName"
                      ref={register({ required: true })}
                      className={`form-control ${
                        errors.MemberName ? "is-invalid" : ""
                      }`}
                      placeholder="Nom Adhérent"
                    />
                    {errors.MemberName && (
                      <small className="text-danger">Nom incorrect</small>
                    )}
                  </Form.Group>
                  <div className="mb-3">
                    <label>Type Adhérent</label>
                    <Select
                      value={selectedOption}
                      onChange={onChangeSelect}
                      options={newLabelValuesFromMemberTypesArray}
                    />
                  </div>
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

export default AddMember;
