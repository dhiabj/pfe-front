import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editMarket } from "../../../_redux/actions/market";

const EditMarket = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    //console.log(values);
    dispatch(editMarket(props.id, values));
    props.onHide();
  };
  //console.log(props.id);

  const marketData = props.markets?.find((market) => market.id === props.id);
  //console.log(marketData);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier un code de marché
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="editMarketForm">
                  <Form.Group controlId="EditMarketCode">
                    <Form.Label>Code de marché</Form.Label>
                    <Form.Control
                      type="text"
                      name="MarketCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{3}/,
                        maxLength: 3,
                      })}
                      className={`form-control ${
                        errors.MarketCode ? "is-invalid" : ""
                      }`}
                      defaultValue={marketData ? marketData.MarketCode : ""}
                    />
                    {errors.MarketCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="EditMarketLabel">
                    <Form.Label>Libellé de marché</Form.Label>
                    <Form.Control
                      type="text"
                      name="MarketLabel"
                      ref={register({ required: false })}
                      defaultValue={marketData ? marketData.MarketLabel : ""}
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
          <Button variant="success" type="submit" form="editMarketForm">
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditMarket;
