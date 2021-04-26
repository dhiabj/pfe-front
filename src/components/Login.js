import React from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../containers/LoginForm";
import "../css/Login.css";
import logo from "../assets/logo.png";
import { login } from "../_redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const onSubmit = (loginValues) => {
    dispatch(login(loginValues));
  };

  return (
    <div className="col-md-12">
      <div className="col-md-6 center-col">
        <div className="card login-card">
          <div className="card-body">
            <img src={logo} alt="cmf-logo" className="img-fluid login-img" />
            <LoginForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
