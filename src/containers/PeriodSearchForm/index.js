import React, { useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getOperations } from "../../_redux/actions/operationCode";
import { getValues } from "../../_redux/actions/values";

const PeriodSearchForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOperations());
    dispatch(getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const operations = useSelector((state) => state.operationCode.data);
  const values = useSelector((state) => state.values.data);
  const OperationSelectOptions = operations?.map((operation) => ({
    value: operation.id,
    label: operation.OperationCode,
  }));
  const ValueSelectOptions = values?.map((value) => ({
    value: value.id,
    label: value.Isin,
  }));
  return (
    <div>
      <Form>
        <Form.Group controlId="AccountingData" as={Row}>
          <Form.Label column sm="3">
            Période (Date Comptable)
          </Form.Label>
          <Col sm="4">
            <Form.Control type="text" placeholder="Date comptable" />
          </Col>
        </Form.Group>
        <Form.Group controlId="StockExchangeData" as={Row}>
          <Form.Label column sm="3">
            Période (Date Bourse)
          </Form.Label>
          <Col sm="4">
            <Form.Control type="text" placeholder="Date comptable" />
          </Col>
        </Form.Group>
        <Form.Group controlId="ValueSelect" as={Row}>
          <Form.Label column sm="2">
            Code Valeur
          </Form.Label>
          <Col sm="4">
            <Select options={ValueSelectOptions} />
          </Col>
          <Col sm="2">
            <Form.Control type="text" placeholder="Code Valeur" />
          </Col>
          <Col sm="2">
            <FontAwesomeIcon icon="search" />
          </Col>
        </Form.Group>
        <Form.Group controlId="OperationSelect" as={Row}>
          <Form.Label column sm="2">
            Code Opération
          </Form.Label>
          <Col sm="4">
            <Select options={OperationSelectOptions} />
          </Col>
          <Col sm="2">
            <Form.Control type="text" placeholder="Code Opération" />
          </Col>
          <Col sm="2">
            <FontAwesomeIcon icon="search" />
          </Col>
        </Form.Group>
        <Button type="submit" className="btn btn-primary btn-block mt-4">
          Soumettre
        </Button>
      </Form>
    </div>
  );
};

export default PeriodSearchForm;
