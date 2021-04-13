import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getOperations } from "../../_redux/actions/operationCode";
import { getValues } from "../../_redux/actions/values";
import { Controller, useForm } from "react-hook-form";
import DayDatePicker from "../../components/DatePicker/DayDatePicker";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import moment from "moment";
import {
  getMouvementSum,
  getMouvements,
  MouvementTable,
} from "../../_redux/actions/mouvements";

const PeriodSearchForm = () => {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
    dispatch(getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const operations = useSelector((state) => state.operationCode.data);
  const values = useSelector((state) => state.values.data);
  const [selectedOptionValue, setSelectedOptionValue] = useState();
  const [selectedOptionOperation, setSelectedOptionOperation] = useState();
  const OperationSelectOptions = operations?.map((operation) => ({
    value: operation.OperationCode,
    label: operation.OperationCode,
  }));
  const ValueSelectOptions = values?.map((value) => ({
    value: value.Isin,
    label: value.Isin,
  }));
  const onChangeSelectValue = (selectedOptionValue) => {
    setSelectedOptionValue(selectedOptionValue);
  };
  const onChangeSelectOperation = (selectedOptionOperation) => {
    setSelectedOptionOperation(selectedOptionOperation);
  };
  const onSubmit = (values) => {
    const search = {
      ...values,
      StockExchangeDate: values.StockExchangeDate
        ? moment(values.StockExchangeDate).format("YYYY-MM-DD")
        : "",
      AccountingDate: values.AccountingDate
        ? moment(values.AccountingDate).format("YYYY-MM-DD")
        : "",
      ValueCode: selectedOptionValue ? selectedOptionValue.value : "",
      OperationCode: selectedOptionOperation
        ? selectedOptionOperation.value
        : "",
    };
    console.log(search);
    dispatch(getMouvements(search));
    dispatch(getMouvementSum(search));
    dispatch(MouvementTable());
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="AccountingDate" as={Row}>
          <Form.Label column sm="3">
            Période (Date Comptable)
          </Form.Label>
          <Col sm="4">
            <Controller
              name="StockExchangeDate"
              defaultValue={null}
              control={control}
              render={({ onChange, value }) => (
                <DayDatePicker value={value} onChange={onChange} />
              )}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="StockExchangeDate" as={Row}>
          <Form.Label column sm="3">
            Période (Date Bourse)
          </Form.Label>
          <Col sm="4">
            <Controller
              name="AccountingDate"
              defaultValue={null}
              control={control}
              render={({ onChange, value }) => (
                <DayDatePicker value={value} onChange={onChange} />
              )}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="ValueSelect" as={Row}>
          <Form.Label column sm="2">
            Code Valeur
          </Form.Label>
          <Col sm="4">
            <Select
              options={ValueSelectOptions}
              value={selectedOptionValue}
              onChange={onChangeSelectValue}
              placeholder="Choisissez un code de valeur"
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="OperationSelect" as={Row}>
          <Form.Label column sm="2">
            Code Opération
          </Form.Label>
          <Col sm="4">
            <Select
              options={OperationSelectOptions}
              value={selectedOptionOperation}
              onChange={onChangeSelectOperation}
              placeholder="Choisissez un code d'opération"
            />
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
