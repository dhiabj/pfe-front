import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getValues = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/values`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "VALUES_DATA", payload: response.data });
    //console.log(response.data);
  }
};

export const addValue = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-value`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "VALUE_ADD_SUCCESS", payload: response.data });
    dispatch(getValues());
    toast.success("Code valeur inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "VALUE_ADD_FAILED", payload: error.response });
    toast.error("Code valeur d'avoir déjà existé");
  }
};

export const editValue = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-value/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "VALUE_EDIT_SUCCESS", payload: response.data });
    dispatch(getValues());
  } catch (error) {
    dispatch({ type: "VALUE_EDIT_FAILED", payload: error.response });
    toast.error("Code valeur d'avoir déjà existé");
    console.log(error);
  }
};

export const deleteValue = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-value/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "VALUE_DELETE_SUCCESS", payload: id });
    toast.success("Code de valeur supprimé avec succès");
  } catch (error) {
    dispatch({ type: "VALUE_DELETE_FAILED", payload: error.response });
    toast.error("La suppression du code de valeur a échoué");
  }
};
