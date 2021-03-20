import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";
import { startLoading, stopLoading } from "../loading";

export const login = (values) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(
      `${api}/auth/login`,
      { ...values },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    localStorage.setItem("token", response.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message });
    toast.error("Vos informations d'identification sont incorrectes");
  }
  dispatch(stopLoading());
};

export const getUser = () => async (dispatch) => {
  const token = localStorage.token;
  dispatch(startLoading());

  if (token) {
    const response = await axios.get(`${api}/userconnected`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem("id", response.data.id); // id in local storage
    dispatch({ type: "LOGIN_USER", payload: response.data }); // user in redux
    //console.log(response.data);
  } else {
    dispatch({ type: "LOGIN_USER_FAILED" });
  }
  dispatch(stopLoading());
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  dispatch({ type: "LOGOUT_USER" });
};
