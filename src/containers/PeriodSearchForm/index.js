import React, { useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
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
import CustomSelect from "../../components/Select";

const PeriodSearchForm = () => {
  const { handleSubmit, register, control, watch } = useForm();
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
  const onSubmit = (values) => {
    const search = {
      ...values,
      startAccountingDate: values.AccountingDate?.startDate
        ? moment(values.AccountingDate.startDate).format("YYYY-MM-DD")
        : "",
      endAccountingDate: values.AccountingDate?.endDate
        ? moment(values.AccountingDate.endDate).format("YYYY-MM-DD")
        : "",
      startStockExchangeDate: values.StockExchangeDate?.startDate
        ? moment(values.StockExchangeDate.startDate).format("YYYY-MM-DD")
        : "",
      endStockExchangeDate: values.StockExchangeDate?.endDate
        ? moment(values.StockExchangeDate.endDate).format("YYYY-MM-DD")
        : "",
      ValueCode: values.ValueCode ? values.ValueCode.value : "",
      OperationCode: values.OperationCode ? values.OperationCode.value : "",
      DeliveryMemberCode: values.DeliveryMemberCode
        ? values.DeliveryMemberCode.value
        : "",
      DeliveredMemberCode: values.DeliveredMemberCode
        ? values.DeliveredMemberCode.value
        : "",
    };
    delete search.AccountingDate;
    delete search.StockExchangeDate;
    console.log(search);
    dispatch(getMouvements(search));
    dispatch(getMouvementSum(search));
    dispatch(MouvementTable());
  };
  const validate = () => {
    const AccountingDate = watch("AccountingDate");
    const StockExchangeDate = watch("StockExchangeDate");
    const ValueCode = watch("ValueCode");
    const OperationCode = watch("OperationCode");
    const DeliveryMemberCode = watch("DeliveryMemberCode");
    const DeliveredMemberCode = watch("DeliveredMemberCode");
    return !!(
      (AccountingDate?.startDate && !!AccountingDate?.endDate) ||
      (StockExchangeDate?.startDate && !!StockExchangeDate?.endDate) ||
      ValueCode ||
      OperationCode ||
      DeliveryMemberCode ||
      DeliveredMemberCode
    );
  };
  const valuePlaceHolder = "Choisissez un code de valeur";
  const operationPlaceHolder = "Choisissez un code d'opération";
  const deliveryMemberPlaceHolder = "Choisissez un adhérent livreur";
  const deliveredMemberPlaceHolder = "Choisissez un adhérent livré";
  return (
    <Col sm={12}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={4}>
            <Form.Group controlId="AccountingDate">
              <Form.Label>Période (Date Comptable)</Form.Label>
              <Controller
                name="AccountingDate"
                defaultValue={null}
                control={control}
                ref={register("AccountingDate", { validate })}
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
                ref={register("StockExchangeDate", { validate })}
                render={({ onChange, value }) => (
                  <PeriodDatepicker value={value} onChange={onChange} />
                )}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="ValueSelect">
              <Form.Label>Code Valeur</Form.Label>
              <Controller
                name="ValueCode"
                defaultValue={null}
                control={control}
                ref={register("ValueCode", { validate })}
                render={({ onChange, value }) => (
                  <CustomSelect
                    options={ValueSelectOptions}
                    value={value}
                    onChange={onChange}
                    placeholder={valuePlaceHolder}
                  />
                )}
              />
            </Form.Group>
            <Form.Group controlId="OperationSelect">
              <Form.Label>Code Opération</Form.Label>
              <Controller
                name="OperationCode"
                defaultValue={null}
                control={control}
                ref={register("OperationCode", { validate })}
                render={({ onChange, value }) => (
                  <CustomSelect
                    options={OperationSelectOptions}
                    value={value}
                    onChange={onChange}
                    placeholder={operationPlaceHolder}
                  />
                )}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="DeliveryMemberSelect">
              <Form.Label>Adhérents Livreurs</Form.Label>
              <Controller
                name="DeliveryMemberCode"
                defaultValue={null}
                control={control}
                ref={register("DeliveryMemberCode", { validate })}
                render={({ onChange, value }) => (
                  <CustomSelect
                    options={DeliveryMemberSelectOptions}
                    value={value}
                    onChange={onChange}
                    placeholder={deliveryMemberPlaceHolder}
                  />
                )}
              />
            </Form.Group>
            <Form.Group controlId="DeliveredMemberSelect">
              <Form.Label>Adhérents Livrés</Form.Label>
              <Controller
                name="DeliveredMemberCode"
                defaultValue={null}
                control={control}
                ref={register("DeliveredMemberCode", { validate })}
                render={({ onChange, value }) => (
                  <CustomSelect
                    options={DeliveredMemberSelectOptions}
                    value={value}
                    onChange={onChange}
                    placeholder={deliveredMemberPlaceHolder}
                  />
                )}
              />
            </Form.Group>
          </Col>
          <Button
            type="submit"
            disabled={validate() ? false : true}
            className={
              validate()
                ? "btn btn-primary btn-block mt-4"
                : "btn btn-primary btn-block mt-4 disabled"
            }>
            <FontAwesomeIcon icon="search" className="mr-2" />
            Soumettre
          </Button>
        </Row>
      </Form>
    </Col>
  );
};

export default PeriodSearchForm;
