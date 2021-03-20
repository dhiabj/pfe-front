import axios from "axios";
import { api } from "../../../api/api";

export const getMouvements = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/mouvements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MOUVEMENTS_DATA", payload: response.data }); // mouvements in redux
    //console.log(response.data);
  }
};
