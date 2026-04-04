import axios from "axios";

const BaseUrl = "http://127.0.0.1:8000/";
export const login = async (form) => {
  const res = await axios.post(`${BaseUrl}login/`, form);
  return res;
};
export const signup = async (form) => {
  const res = await axios.post(`${BaseUrl}signup/`, form);
  return res.data;
};

export const verifyOtp = async (otp_code) => {
  const res = await axios.post(`${BaseUrl}Verify_otp/`, {
    otp_code,
  });
  return res.data;
};


export const resetPass = async (form) => {
  const res = await axios.post(`${BaseUrl}resetpassword/`, form);
  return res;
};

export const verifyResetPass = async (form) => {
  const res = await axios.post(`${BaseUrl}verifyresetpassword/`, form);
  return res;
};
export const logout = async () => {
const token = localStorage.getItem("authToken");

  const res = await axios.post(
    `${BaseUrl}logout/`,
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

export const deleteAccount = async (form) => {
const token=localStorage.getItem("authToken")
// console.log(token)
  const res = await axios.delete(`${BaseUrl}deleteaccount/`,{
    data:form,
    headers:{
        Authorization: `Token ${token}`
    }
  });

};
