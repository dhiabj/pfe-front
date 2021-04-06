import axios from "axios";
import { api } from "../../../api/api";
import { toast } from "react-toastify";

export const getMemberTypes = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/member-types`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MEMBER_TYPES", payload: response.data });
    //console.log(response.data);
  }
};

export const deleteMemberType = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-member-type/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MEMBER_TYPE_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "MEMBER_TYPE_DELETE_FAILED", payload: error.response });
  }
};

export const addMemberType = (values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.post(
      `${api}/add-member-type`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "MEMBER_TYPE_ADD_SUCCESS", payload: response.data });
    dispatch(getMemberTypes());
    toast.success("Type adhérent inséré avec succès");
  } catch (error) {
    //console.log({ error });
    dispatch({ type: "MEMBER_TYPE_ADD_FAILED", payload: error.response });
    toast.error("Code type adhérent déjà existé");
  }
};

export const editMemberType = (id, values) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios.put(
      `${api}/edit-member-type/${id}`,
      { ...values },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "MEMBER_TYPE_EDIT_SUCCESS", payload: response.data });
    dispatch(getMemberTypes());
  } catch (error) {
    dispatch({ type: "MEMBER_TYPE_EDIT_FAILED", payload: error.response });
    toast.error("Code type adhérent déjà existé");
    console.log(error);
  }
};
