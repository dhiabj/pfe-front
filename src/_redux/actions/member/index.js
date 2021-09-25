import axios from "axios";
import { api } from "../../../api/api";
import { toast } from "react-toastify";

export const getMembers = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MEMBERS_DATA", payload: response.data });
    //console.log(response.data);
  }
};

export const addMember = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-member`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "MEMBER_ADD_SUCCESS", payload: response.data });
    dispatch(getMembers());
    toast.success("Adhérent ajouté avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "MEMBER_ADD_FAILED", payload: error.response });
    toast.error("Code adhérent déjà existé");
  }
};

export const editMember = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-member/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "MEMBER_EDIT_SUCCESS", payload: response });
    dispatch(getMembers());
  } catch (error) {
    dispatch({ type: "MEMBER_EDIT_FAILED", payload: error.response });
    toast.error("Code adhérent déjà existé");
    console.log(error);
  }
};

export const deleteMember = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-member/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MEMBER_DELETE_SUCCESS", payload: id });
    toast.success("Code adhérent supprimé avec succès");
  } catch (error) {
    dispatch({ type: "MEMBER_DELETE_FAILED", payload: error.response });
    toast.error("La suppression du code adhérent a échoué");
  }
};
