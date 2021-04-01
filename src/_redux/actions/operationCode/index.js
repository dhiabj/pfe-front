import axios from "axios";
import { api } from "../../../api/api";

export const getOperationCodes = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/operations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "OPERATION_CODES", payload: response.data });
    //console.log(response.data);
  }
};

export const deleteOperation = (OperationCode) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios
      .delete(`${api}/delete-operation/${OperationCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        window.location.reload();
      });
    dispatch({ type: "OPERATION_DELETE_SUCCESS", payload: response });
    //console.log(response.data);
  } catch (error) {
    dispatch({ type: "OPERATION_DELETE_FAILED", payload: error.response });
  }
};
