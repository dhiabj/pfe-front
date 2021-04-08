import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getAccountCodes = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/interm-accounts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ACCOUNT_CODES", payload: response.data });
    //console.log(response.data);
  }
};

export const addAccountCode = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-interm-account`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "ACCOUNT_CODE_ADD_SUCCESS", payload: response.data });
    dispatch(getAccountCodes());
    toast.success("Code de compte inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "ACCOUNT_CODE_ADD_FAILED", payload: error.response });
    toast.error("Code de compte déjà existé");
  }
};

export const editAccountCode = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-interm-account/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "ACCOUNT_CODE_EDIT_SUCCESS", payload: response.data });
    dispatch(getAccountCodes());
  } catch (error) {
    dispatch({ type: "ACCOUNT_CODE_EDIT_FAILED", payload: error.response });
    toast.error("Code de compte déjà existé");
    console.log(error);
  }
};

export const deleteAccountCode = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-interm-account/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ACCOUNT_CODE_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "ACCOUNT_CODE_DELETE_FAILED", payload: error.response });
  }
};
