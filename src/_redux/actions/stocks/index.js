import axios from "axios";
import { api } from "../../../api/api";

export const getStocks = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/stocks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "STOCKS_DATA", payload: response.data }); // stocks in redux
    //console.log(response.data);
  }
};
