import React from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  //console.log(watch("example"));
  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className={errors.username ? "input-group" : "input-group mb-3"}>
        <div className="input-group-append">
          <span className="input-group-text">
            <FontAwesomeIcon icon="user" />
          </span>
        </div>
        <input
          name="username"
          type="text"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          id="userInput"
          placeholder="Votre identifiant"
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-3">
        {errors.username && (
          <small className="text-danger">Tapez votre identifiant</small>
        )}
      </div>

      <div className={errors.password ? "input-group" : "input-group mb-3"}>
        <div className="input-group-append">
          <span className="input-group-text">
            <FontAwesomeIcon icon="key" />
          </span>
        </div>
        <input
          name="password"
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="passwordInput"
          placeholder="Mot de passe"
          ref={register({ required: true })}
        />
      </div>
      <div className="mb-3">
        {errors.password && (
          <small className="text-danger">Tapez votre mot de passe</small>
        )}
      </div>
      <button type="submit" className="btn btn-grad login-btn">
        Connexion
      </button>
    </form>
  );
};

export default LoginForm;
