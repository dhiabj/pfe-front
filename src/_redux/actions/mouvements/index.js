import axios from "axios";
import { api } from "../../../api/api";

export const getMouvements = (search) => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/mouvements`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        search: search,
      },
    });
    dispatch({ type: "MOUVEMENTS_DATA", payload: response.data }); // mouvements in redux
    //console.log(response.data);
  }
};

export const getMvtUploads = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/mouvement-upload-table`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MOUVEMENT_UPLOADS", payload: response.data });
    //console.log(response.data);
  }
};

export const deleteMvtUploads = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-mouvement/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MOUVEMENT_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "MOUVEMENT_DELETE_FAILED", payload: error.response });
  }
};
