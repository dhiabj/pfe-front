import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getReglements = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/reglements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "REGLEMENTS_DATA", payload: response.data });
    //console.log(response.data);
  }
};

export const addReglement = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-reglement`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "REGLEMENT_ADD_SUCCESS", payload: response.data });
    dispatch(getReglements());
    toast.success("Code règlement inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "REGLEMENT_ADD_FAILED", payload: error.response });
    toast.error("Code règlement déjà existé");
  }
};

export const editReglement = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-reglement/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "REGLEMENT_EDIT_SUCCESS", payload: response.data });
    dispatch(getReglements());
  } catch (error) {
    dispatch({ type: "REGLEMENT_EDIT_FAILED", payload: error.response });
    toast.error("Code règlement déjà existé");
    console.log(error);
  }
};

export const deleteReglement = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-reglement/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "REGLEMENT_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "REGLEMENT_DELETE_FAILED", payload: error.response });
  }
};
