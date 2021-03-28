import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controller, useForm } from "react-hook-form";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import DatePicker from "../../components/DatePicker";
import "../../css/StockSearchForm.css";
const DaySearchForm = ({ onSubmit }) => {
  const { register, handleSubmit, control } = useForm();
  return (
    <div className="col-sm-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-sm-2">
            <div className="form-group">
              <label>Date comptable</label>
              <Controller
                name="accounting_date"
                defaultValue={null}
                control={control}
                render={({ onChange, value }) => (
                  <DatePicker value={value} onChange={onChange} />
                )}
              />
            </div>
          </div>

          <div className="col-sm-2">
            <div className="form-group">
              <label>Date bourse</label>
              <Controller
                name="stock_exchange_date"
                defaultValue={null}
                control={control}
                render={({ onChange, value }) => (
                  <DatePicker value={value} onChange={onChange} />
                )}
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <label>Code valeur</label>
              <input
                className="form-control"
                name="code_valeur"
                type="text"
                placeholder="Code Valeur"
                ref={register({ required: false })}
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <label>Code adhérent</label>
              <input
                className="form-control"
                name="code_adherent"
                type="text"
                placeholder="Code Adherent"
                ref={register({ required: false })}
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <label>Nature de compte</label>
              <input
                className="form-control"
                name="nature_compte"
                type="text"
                placeholder="Nature Compte"
                ref={register({ required: false })}
              />
            </div>
          </div>
          <div className="col-sm-2 m-auto">
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon="search" className="mr-2" />
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DaySearchForm;
