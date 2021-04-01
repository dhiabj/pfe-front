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

export const deleteMember = (MembershipCode) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios
      .delete(`${api}/delete-member/${MembershipCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        window.location.reload();
      });
    dispatch({ type: "MEMBER_DELETE_SUCCESS", payload: response });
    //console.log(response.data);
  } catch (error) {
    dispatch({ type: "MEMBER_DELETE_FAILED", payload: error.response });
  }
};
