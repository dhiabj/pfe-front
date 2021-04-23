import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getAccountTypes = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/account-types`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ACCOUNT_TYPES", payload: response.data });
    //console.log(response.data);
  }
};

export const addAccountType = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-account-type`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "ACCOUNT_TYPE_ADD_SUCCESS", payload: response.data });
    dispatch(getAccountTypes());
    toast.success("Nature de compte inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "ACCOUNT_TYPE_ADD_FAILED", payload: error.response });
    toast.error("Code nature de compte déjà existé");
  }
};

export const editAccountType = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-account-type/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "ACCOUNT_TYPE_EDIT_SUCCESS", payload: response.data });
    dispatch(getAccountTypes());
  } catch (error) {
    dispatch({ type: "ACCOUNT_TYPE_EDIT_FAILED", payload: error.response });
    toast.error("Code nature de compte déjà existé");
    console.log(error);
  }
};

export const deleteAccountType = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-account-type/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ACCOUNT_TYPE_DELETE_SUCCESS", payload: id });
    toast.success("Code nature supprimé avec succès");
  } catch (error) {
    dispatch({ type: "ACCOUNT_TYPE_DELETE_FAILED", payload: error.response });
    toast.error("La suppression du code nature a échoué");
  }
};
