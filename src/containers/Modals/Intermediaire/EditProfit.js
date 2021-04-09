import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editProfit } from "../../../_redux/actions/profits";

const EditProfit = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editProfit(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const profitData = props.profits?.find((profit) => profit.id === props.id);
  //console.log(profitData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un code de profit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="editProfitCodeForm">
                  <Form.Group controlId="EditProfitCode">
                    <Form.Label>Code de profit</Form.Label>
                    <Form.Control
                      type="text"
                      name="ProfitCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{2}/,
                        maxLength: 2,
                      })}
                      className={`form-control ${
                        errors.ProfitCode ? "is-invalid" : ""
                      }`}
                      defaultValue={profitData ? profitData.ProfitCode : ""}
                      placeholder="Code de profit"
                    />
                    {errors.ProfitCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditProfitLabel">
                    <Form.Label>Libellé de profit</Form.Label>
                    <Form.Control
                      type="text"
                      name="ProfitLabel"
                      ref={register({ required: false })}
                      defaultValue={profitData ? profitData.ProfitLabel : ""}
                      placeholder="Libellé de profit"
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
          <Button variant="success" type="submit" form="editProfitCodeForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProfit;
