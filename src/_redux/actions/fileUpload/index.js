import axios from "axios";
import { api } from "../../../api/api";
import { toast } from "react-toastify";

export const mouvementUpload = (formData) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = parseInt(Math.round((loaded * 100) / total));
        console.log(percent);
        dispatch({ type: "LOADING_PRGOGRESS", payload: percent });
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${api}/mouvements-fill`,
      formData,
      config
    );
    dispatch({ type: "MOUVEMENT_UPLOAD_SUCCESS", payload: response.data });
    toast.success("Le chargement a réussi");
    console.log(response);
  } catch (error) {
    dispatch({
      type: "MOUVEMENT_UPLOAD_FAILED",
      payload: error.response.data,
    });
    toast.error("Le chargement a échoué");
    console.log(error);
  }
};

export const stockUpload = (formData) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = parseInt(Math.round((loaded * 100) / total));
        console.log(percent);
        dispatch({ type: "LOADING_PRGOGRESS", payload: percent });
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${api}/stocks-fill`, formData, config);
    dispatch({ type: "STOCK_UPLOAD_SUCCESS", payload: response.data });
    toast.success("Le chargement a réussi");
    console.log(response);
  } catch (error) {
    dispatch({
      type: "STOCK_UPLOAD_FAILED",
      payload: error.response.data,
    });
    toast.error("Le chargement a échoué");
    console.log(error);
  }
};

export const intermUpload = (formData) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = parseInt(Math.round((loaded * 100) / total));
        console.log(percent);
        dispatch({ type: "LOADING_PRGOGRESS", payload: percent });
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${api}/intermediaires-fill`,
      formData,
      config
    );
    dispatch({ type: "INTERM_UPLOAD_SUCCESS", payload: response.data });
    toast.success("Le chargement a réussi");
    console.log(response);
  } catch (error) {
    dispatch({
      type: "INTERM_UPLOAD_FAILED",
      payload: error.response.data,
    });
    toast.error("Le chargement a échoué");
    console.log(error);
  }
};

export const resetProgress = () => (dispatch) => {
  dispatch({ type: "PROGRESS_RESET" });
};
