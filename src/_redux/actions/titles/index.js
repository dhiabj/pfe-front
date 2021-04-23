import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getTitles = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/titles`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "TITLES_DATA", payload: response.data });
    //console.log(response.data);
  }
};

export const addTitle = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-title`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "TITLE_ADD_SUCCESS", payload: response.data });
    dispatch(getTitles());
    toast.success("Code titre inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "TITLE_ADD_FAILED", payload: error.response });
    toast.error("Code titre déjà existé");
  }
};

export const editTitle = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-title/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "TITLE_EDIT_SUCCESS", payload: response.data });
    dispatch(getTitles());
  } catch (error) {
    dispatch({ type: "TITLE_EDIT_FAILED", payload: error.response });
    toast.error("Code titre déjà existé");
    console.log(error);
  }
};

export const deleteTitle = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-title/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "TITLE_DELETE_SUCCESS", payload: id });
    toast.success("Code titre supprimé avec succès");
  } catch (error) {
    dispatch({ type: "TITLE_DELETE_FAILED", payload: error.response });
    toast.error("La suppression du code titre a échoué");
  }
};
