import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getOperations = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/operations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "OPERATION_CODES", payload: response.data });
    //console.log(response.data);
  }
};

export const deleteOperation = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-operation/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "OPERATION_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "OPERATION_DELETE_FAILED", payload: error.response });
  }
};

export const addOperation = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-operation`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "OPERATION_ADD_SUCCESS", payload: response.data });
    dispatch(getOperations());
    toast.success("Code opération inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "OPERATION_ADD_FAILED", payload: error.response });
    toast.error("Code opération déjà existé");
  }
};

export const editOperation = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-operation/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "OPERATION_EDIT_SUCCESS", payload: response.data });
    dispatch(getOperations());
  } catch (error) {
    dispatch({ type: "OPERATION_EDIT_FAILED", payload: error.response });
    toast.error("Code opération déjà existé");
    console.log(error);
  }
};
