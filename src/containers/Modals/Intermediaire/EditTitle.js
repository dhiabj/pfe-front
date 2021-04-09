import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editTitle } from "../../../_redux/actions/titles";

const EditTitle = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editTitle(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const titleData = props.titles?.find((profit) => profit.id === props.id);
  //console.log(titleData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un code de titre
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="editTitleCodeForm">
                  <Form.Group controlId="EditTitleCode">
                    <Form.Label>Code de titre</Form.Label>
                    <Form.Control
                      type="text"
                      name="TitleCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{2}/,
                        maxLength: 2,
                      })}
                      className={`form-control ${
                        errors.TitleCode ? "is-invalid" : ""
                      }`}
                      defaultValue={titleData ? titleData.TitleCode : ""}
                      placeholder="Code de titre"
                    />
                    {errors.TitleCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditTitleLabel">
                    <Form.Label>Libellé de titre</Form.Label>
                    <Form.Control
                      type="text"
                      name="TitleLabel"
                      ref={register({ required: false })}
                      defaultValue={titleData ? titleData.TitleLabel : ""}
                      placeholder="Libellé de titre"
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
          <Button variant="success" type="submit" form="editTitleCodeForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTitle;
