import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getCategories = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "CATEGORIES_AVOIR", payload: response.data });
    //console.log(response.data);
  }
};

export const addCategory = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-category`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "CATEGORY_ADD_SUCCESS", payload: response.data });
    dispatch(getCategories());
    toast.success("Catégorie d'avoir inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "CATEGORY_ADD_FAILED", payload: error.response });
    toast.error("Code catégorie d'avoir déjà existé");
  }
};

export const editCateogry = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-category/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "CATEGORY_EDIT_SUCCESS", payload: response.data });
    dispatch(getCategories());
  } catch (error) {
    dispatch({ type: "CATEGORY_EDIT_FAILED", payload: error.response });
    toast.error("Code catégorie d'avoir déjà existé");
    console.log(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "CATEGORY_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "CATEGORY_DELETE_FAILED", payload: error.response });
  }
};
