import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editAccountCode } from "../../../_redux/actions/accountCode";

const EditIntermAccount = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editAccountCode(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const accountCodeData = props.accodes?.find(
    (accountType) => accountType.id === props.id
  );
  //console.log(accountCodeData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un code de compte
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  id="editAccountCodeForm">
                  <Form.Group controlId="EditIntermAccountCode">
                    <Form.Label>Code de Compte</Form.Label>
                    <Form.Control
                      type="text"
                      name="IntermAccountCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{2}/,
                        maxLength: 2,
                      })}
                      className={`form-control ${
                        errors.IntermAccountCode ? "is-invalid" : ""
                      }`}
                      defaultValue={
                        accountCodeData ? accountCodeData.AccountCode : ""
                      }
                      placeholder="Code de Compte"
                    />
                    {errors.IntermAccountCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditIntermAccountLabel">
                    <Form.Label>Libell?? de Compte</Form.Label>
                    <Form.Control
                      type="text"
                      name="IntermAccountLabel"
                      ref={register({ required: false })}
                      defaultValue={
                        accountCodeData ? accountCodeData.AccountLabel : ""
                      }
                      placeholder="Libell?? de Compte"
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
          <Button variant="success" type="submit" form="editAccountCodeForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditIntermAccount;
