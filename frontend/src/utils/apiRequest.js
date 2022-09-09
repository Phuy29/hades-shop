import axios from "axios";
import {
  loginError,
  loginStart,
  loginSuccess,
  logoutError,
  logoutStart,
  logoutSuccess,
  registerError,
  registerStart,
  registerSuccess,
} from "../redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginError());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerError());
  }
};

export const logoutUser = async (accessToken, dispatch) => {
  dispatch(logoutStart());
  try {
    axios.post("/auth/logout", { headers: { token: `Bearer ${accessToken}` } });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError());
  }
};

export const getProductsOfCollection = async (id, setState) => {
  try {
    const res = await axios.get(`/collection/${id}`);
    setState(res.data.products);
  } catch (error) {
    console.log(error);
  }
};

export const getOneProduct = async (id, setState) => {
  try {
    const res = await axios.get(`/product/${id}`);
    setState(res.data);
  } catch (error) {
    console.log(error);
  }
};
