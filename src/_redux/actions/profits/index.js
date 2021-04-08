import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getProfits = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/profits`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "PROFITS_DATA", payload: response.data });
    //console.log(response.data);
  }
};

export const addProfit = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-profit`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "PROFIT_ADD_SUCCESS", payload: response.data });
    dispatch(getProfits());
    toast.success("Code profit inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "MARKET_ADD_FAILED", payload: error.response });
    toast.error("Code profit déjà existé");
  }
};

export const editProfit = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-profit/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "PROFIT_EDIT_SUCCESS", payload: response.data });
    dispatch(getProfits());
  } catch (error) {
    dispatch({ type: "PROFIT_EDIT_FAILED", payload: error.response });
    toast.error("Code profit déjà existé");
    console.log(error);
  }
};

export const deleteProfit = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-profit/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "PROFIT_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "PROFIT_DELETE_FAILED", payload: error.response });
  }
};
