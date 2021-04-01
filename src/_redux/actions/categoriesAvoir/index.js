import axios from "axios";
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

export const deleteCategory = (CategoryCode) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios
      .delete(`${api}/delete-category/${CategoryCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        window.location.reload();
      });
    dispatch({ type: "CATEGORY_DELETE_SUCCESS", payload: response });
    //console.log(response.data);
  } catch (error) {
    dispatch({ type: "CATEGORY_DELETE_FAILED", payload: error.response });
  }
};
