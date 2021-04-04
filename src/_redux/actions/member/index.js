import axios from "axios";
import { api } from "../../../api/api";

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

export const deleteMember = (id) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-member/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MEMBER_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "MEMBER_DELETE_FAILED", payload: error.response });
  }
};
