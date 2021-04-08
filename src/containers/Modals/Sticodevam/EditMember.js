import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { editMember } from "../../../_redux/actions/member";
const EditMember = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [selectedOption, setSelectedOption] = useState();
  //console.log(props.id);

  const newLabelValuesFromMemberTypesArray = props.membertypes?.map(
    (memberType) => ({
      value: memberType.id,
      label: memberType.MemberTypeCode,
    })
  );
  //console.log(newLabelValuesFromMemberTypesArray);

  const memberData = props.members?.find((member) => member.id === props.id);
  //console.log(memberData);

  const defaultSelect = {
    value: memberData?.MemberType.id,
    label: memberData?.MemberType.memberTypeCode,
  };
  //console.log(defaultSelect);

  const onChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const onSubmit = (values) => {
    if (selectedOption) {
      const addValues = { ...values, MemberTypeId: selectedOption.value };
      dispatch(editMember(props.id, addValues));
      props.onHide();
    }
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
            Modifier un adhérent
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="editMemberForm">
                  <Form.Group controlId="AddMembershipCode">
                    <Form.Label>Code Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MembershipCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{3}/,
                        maxLength: 3,
                      })}
                      className={`form-control ${
                        errors.MembershipCode ? "is-invalid" : ""
                      }`}
                      defaultValue={memberData ? memberData.MembershipCode : ""}
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
                      ref={register({ required: false })}
                      defaultValue={memberData ? memberData.MemberName : ""}
                    />
                  </Form.Group>
                  <div className="mb-3">
                    <label>Type Adhérent</label>
                    <Select
                      value={selectedOption}
                      onChange={onChangeSelect}
                      options={newLabelValuesFromMemberTypesArray}
                      placeholder="Choisissez un type d'adhérent"
                      defaultValue={defaultSelect}
                    />
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Fermer
          </Button>
          <Button variant="success" type="submit" form="editMemberForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditMember;
