import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editAccountType } from "../../../_redux/actions/accountTypes";

const EditAccountType = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editAccountType(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const accountTypeData = props.aTypes?.find(
    (accountType) => accountType.id === props.id
  );
  //console.log(accountTypeData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un nature de compte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="EditAccountTypeCode">
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
                      defaultValue={
                        accountTypeData ? accountTypeData.NatureCode : ""
                      }
                    />
                    {errors.AccountTypeCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditAccountTypeLabel">
                    <Form.Label>Libellé Nature de Compte</Form.Label>
                    <Form.Control
                      type="text"
                      name="AccountTypeLabel"
                      ref={register({ required: true })}
                      className={`form-control ${
                        errors.AccountTypeLabel ? "is-invalid" : ""
                      }`}
                      placeholder="Libellé Nature de Compte"
                      defaultValue={
                        accountTypeData
                          ? accountTypeData.NatureAccountLabel
                          : ""
                      }
                    />
                    {errors.AccountTypeLabel && (
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

export default EditAccountType;
