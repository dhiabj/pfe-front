import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export const getMarkets = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/markets`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MARKET_DATA", payload: response.data });
    //console.log(response.data);
  }
};

export const addMarket = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-market`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "MARKET_ADD_SUCCESS", payload: response.data });
    dispatch(getMarkets());
    toast.success("Code marché inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "MARKET_ADD_FAILED", payload: error.response });
    toast.error("Code marché déjà existé");
  }
};

export const editMarket = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-market/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "MARKET_EDIT_SUCCESS", payload: response.data });
    dispatch(getMarkets());
  } catch (error) {
    dispatch({ type: "MARKET_EDIT_FAILED", payload: error.response });
    toast.error("Code marché déjà existé");
    console.log(error);
  }
};

export const deleteMarket = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-market/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MARKET_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "MARKET_DELETE_FAILED", payload: error.response });
  }
};
