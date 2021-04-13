import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getOperations } from "../../_redux/actions/operationCode";
import { getValues } from "../../_redux/actions/values";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import {
  getMouvementSum,
  getMouvements,
  MouvementTable,
} from "../../_redux/actions/mouvements";
import PeriodDatepicker from "../../components/DatePicker/PeriodDatePicker";
import { getMembers } from "../../_redux/actions/member";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PeriodSearchForm = () => {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
    dispatch(getValues());
    dispatch(getMembers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const operations = useSelector((state) => state.operationCode.data);
  const values = useSelector((state) => state.values.data);
  const members = useSelector((state) => state.member.data);
  const [selectedOptionValue, setSelectedOptionValue] = useState();
  const [selectedOptionOperation, setSelectedOptionOperation] = useState();
  const [
    selectedOptionDeliveryMember,
    setSelectedOptionDeliveryMember,
  ] = useState();
  const [
    selectedOptionDeliveredMember,
    setSelectedOptionDeliveredMember,
  ] = useState();
  const OperationSelectOptions = operations?.map((operation) => ({
    value: operation.OperationCode,
    label: operation.OperationCode,
  }));
  const ValueSelectOptions = values?.map((value) => ({
    value: value.Isin,
    label: value.Isin,
  }));
  const DeliveryMemberSelectOptions = members?.map((member) => ({
    value: member.MembershipCode,
    label: member.MemberName,
  }));
  const DeliveredMemberSelectOptions = members?.map((member) => ({
    value: member.MembershipCode,
    label: member.MemberName,
  }));
  const onChangeSelectValue = (selectedOptionValue) => {
    setSelectedOptionValue(selectedOptionValue);
  };
  const onChangeSelectOperation = (selectedOptionOperation) => {
    setSelectedOptionOperation(selectedOptionOperation);
  };
  const onChangeSelectDeliveryMember = (selectedOptionDeliveryMember) => {
    setSelectedOptionDeliveryMember(selectedOptionDeliveryMember);
  };
  const onChangeSelectDeliveredMember = (selectedOptionDeliveredMember) => {
    setSelectedOptionDeliveredMember(selectedOptionDeliveredMember);
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
      DeliveryMemberCode: selectedOptionDeliveryMember
        ? selectedOptionDeliveryMember.value
        : "",
      DeliveredMemberCode: selectedOptionDeliveredMember
        ? selectedOptionDeliveredMember.value
        : "",
    };
    console.log(search);
    dispatch(getMouvements(search));
    dispatch(getMouvementSum(search));
    dispatch(MouvementTable());
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={4}>
            <Form.Group controlId="AccountingDate">
              <Form.Label>Période (Date Comptable)</Form.Label>
              <Controller
                name="AccountingDate"
                defaultValue={null}
                control={control}
                render={({ onChange, value }) => (
                  <PeriodDatepicker value={value} onChange={onChange} />
                )}
              />
            </Form.Group>
            <Form.Group controlId="StockExchangeDate">
              <Form.Label>Période (Date Bourse)</Form.Label>
              <Controller
                name="StockExchangeDate"
                defaultValue={null}
                control={control}
                render={({ onChange, value }) => (
                  <PeriodDatepicker value={value} onChange={onChange} />
                )}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="ValueSelect">
              <Form.Label>Code Valeur</Form.Label>
              <Select
                options={ValueSelectOptions}
                value={selectedOptionValue}
                onChange={onChangeSelectValue}
                isClearable={true}
                placeholder="Choisissez un code de valeur"
              />
            </Form.Group>
            <Form.Group controlId="OperationSelect">
              <Form.Label>Code Opération</Form.Label>
              <Select
                options={OperationSelectOptions}
                value={selectedOptionOperation}
                onChange={onChangeSelectOperation}
                isClearable={true}
                placeholder="Choisissez un code d'opération"
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="DeliveryMemberSelect">
              <Form.Label>Adhérents Livreurs</Form.Label>
              <Select
                options={DeliveryMemberSelectOptions}
                value={selectedOptionDeliveryMember}
                onChange={onChangeSelectDeliveryMember}
                isClearable={true}
                placeholder="Choisissez un adhérent livreur"
              />
            </Form.Group>
            <Form.Group controlId="DeliveredMemberSelect">
              <Form.Label>Adhérents Livrés</Form.Label>
              <Select
                options={DeliveredMemberSelectOptions}
                value={selectedOptionDeliveredMember}
                onChange={onChangeSelectDeliveredMember}
                isClearable={true}
                placeholder="Choisissez un adhérent livré"
              />
            </Form.Group>
          </Col>
          <Button type="submit" className="btn btn-primary btn-block mt-4">
            <FontAwesomeIcon icon="search" className="mr-2" />
            Soumettre
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default PeriodSearchForm;
