import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editCateogry } from "../../../_redux/actions/categoriesAvoir";

const EditCategory = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editCateogry(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const categoryData = props.categories?.find(
    (category) => category.id === props.id
  );
  //console.log(categoryData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un catégorie d'avoir
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="EditCategoryCode">
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
                      defaultValue={
                        categoryData ? categoryData.CategoryCode : ""
                      }
                    />
                    {errors.CategoryCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditCategoryLabel">
                    <Form.Label>Libellé Catégorie d'avoir</Form.Label>
                    <Form.Control
                      type="text"
                      name="CategoryLabel"
                      ref={register({ required: true })}
                      className={`form-control ${
                        errors.CategoryLabel ? "is-invalid" : ""
                      }`}
                      placeholder="Libellé Catégorie d'avoir"
                      defaultValue={
                        categoryData ? categoryData.CategoryLabel : ""
                      }
                    />
                    {errors.CategoryLabel && (
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

export default EditCategory;
