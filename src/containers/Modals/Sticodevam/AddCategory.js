import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../_redux/actions/categoriesAvoir";

const AddCategory = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(addCategory(values));
    props.onHide();
    //console.log(values);
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
            Insérer un catégorie d'avoir
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="categoryForm">
                  <Form.Group controlId="AddCategoryCode">
                    <Form.Label>Code Catégorie d'avoir</Form.Label>
                    <Form.Control
                      type="text"
                      name="CategoryCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{3}/,
                        maxLength: 3,
                      })}
                      className={`form-control ${
                        errors.CategoryCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code Catégorie d'avoir"
                    />
                    {errors.CategoryCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddCategoryLabel">
                    <Form.Label>Libellé Catégorie d'avoir</Form.Label>
                    <Form.Control
                      type="text"
                      name="CategoryLabel"
                      ref={register({ required: false })}
                      placeholder="Libellé Catégorie d'avoir"
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
          <Button variant="primary" type="submit" form="categoryForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddCategory;
