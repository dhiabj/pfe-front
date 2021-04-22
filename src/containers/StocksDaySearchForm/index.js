import React, { useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getValues } from "../../_redux/actions/values";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { getMembers } from "../../_redux/actions/member";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "../../components/Select";
import DayDatePicker from "../../components/DatePicker/DayDatePicker";
import { getStocks, StockTable } from "../../_redux/actions/stocks";
import { getAccountTypes } from "../../_redux/actions/accountTypes";

const StocksDaySearchForm = () => {
  const { handleSubmit, register, control, watch } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountTypes());
    dispatch(getValues());
    dispatch(getMembers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const natureCodes = useSelector((state) => state.accountTypes.data);
  const values = useSelector((state) => state.values.data);
  const members = useSelector((state) => state.member.data);
  const NatureSelectOptions = natureCodes?.map((nature) => ({
    value: nature.NatureCode,
    label: nature.NatureAccountLabel + " - " + nature.NatureCode,
  }));
  const ValueSelectOptions = values?.map((value) => ({
    value: value.Isin,
    label: value.ValueLabel + " - " + value.Isin,
  }));
  const MemberSelectOptions = members?.map((member) => ({
    value: member.MembershipCode,
    label: member.MemberName + " - " + member.MembershipCode,
  }));
  const onSubmit = (values) => {
    const search = {
      ...values,
      AccountingDate: values.AccountingDate
        ? moment(values.AccountingDate).format("YYYY-MM-DD")
        : "",
      StockExchangeDate: values.StockExchangeDate
        ? moment(values.StockExchangeDate).format("YYYY-MM-DD")
        : "",
      ValueCode: values.ValueCode ? values.ValueCode.value : "",
      MembershipCode: values.MembershipCode ? values.MembershipCode.value : "",
      NatureCode: values.NatureCode ? values.NatureCode.value : "",
    };
    console.log(search);
    dispatch(getStocks(search));
    dispatch(StockTable());
    //dispatch(MouvementTable());
  };
  const validate = () => {
    const AccountingDate = watch("AccountingDate");
    const StockExchangeDate = watch("StockExchangeDate");
    const ValueCode = watch("ValueCode");
    const MembershipCode = watch("MembershipCode");
    const NatureCode = watch("NatureCode");
    return !!(
      AccountingDate ||
      StockExchangeDate ||
      ValueCode ||
      MembershipCode ||
      NatureCode
    );
  };
  const valuePlaceHolder = "Choisissez un code de valeur";
  const memberPlaceHolder = "Choisissez un code d'adhérent";
  const accountTypePlaceHolder = "Choisissez un nature de compte";
  return (
    <Col sm={12}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={4}>
            <Form.Group controlId="AccountingDate">
              <Form.Label>Date comptable</Form.Label>
              <Controller
                name="AccountingDate"
                defaultValue={null}
                control={control}
                ref={register("AccountingDate", { validate })}
                render={({ onChange, value }) => (
                  <DayDatePicker value={value} onChange={onChange} />
                )}
              />
            </Form.Group>
            <Form.Group controlId="StockExchangeDate">
              <Form.Label>Date bourse</Form.Label>
              <Controller
                name="StockExchangeDate"
                defaultValue={null}
                control={control}
                ref={register("StockExchangeDate", { validate })}
                render={({ onChange, value }) => (
                  <DayDatePicker value={value} onChange={onChange} />
                )}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="ValueSelect">
              <Form.Label>Code valeur</Form.Label>
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
            <Form.Group controlId="MemberSelect">
              <Form.Label>Code adhérent</Form.Label>
              <Controller
                name="MembershipCode"
                defaultValue={null}
                control={control}
                ref={register("MembershipCode", { validate })}
                render={({ onChange, value }) => (
                  <CustomSelect
                    options={MemberSelectOptions}
                    value={value}
                    onChange={onChange}
                    placeholder={memberPlaceHolder}
                  />
                )}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group controlId="AccountTypeSelect">
              <Form.Label>Nature de compte</Form.Label>
              <Controller
                name="NatureCode"
                defaultValue={null}
                control={control}
                ref={register("NatureCode", { validate })}
                render={({ onChange, value }) => (
                  <CustomSelect
                    options={NatureSelectOptions}
                    value={value}
                    onChange={onChange}
                    placeholder={accountTypePlaceHolder}
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

export default StocksDaySearchForm;
