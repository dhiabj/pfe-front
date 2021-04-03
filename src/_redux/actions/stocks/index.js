import axios from "axios";
import { api } from "../../../api/api";

export const getStocks = (search) => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/stocks`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        search: search,
      },
    });
    dispatch({ type: "STOCKS_DATA", payload: response.data }); // stocks in redux
    //console.log(response.data);
  }
};

export const getStockUploads = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/stock-upload-table`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "STOCK_UPLOADS", payload: response.data });
    //console.log(response.data);
  }
};

export const deleteStockUploads = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-stock/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "STOCK_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "STOCK_DELETE_FAILED", payload: error.response });
  }
};
