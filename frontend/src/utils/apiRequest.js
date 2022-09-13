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

export const getAllProducts = async (setState) => {
  try {
    const res = await axios.get("/product");
    setState(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCollections = async (setState) => {
  try {
    const res = await axios.get("/collection");
    setState(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (setState) => {
  try {
    const res = await axios.get("/user");
    setState(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product) => {
  try {
    await axios.post("/product", product);
  } catch (error) {
    console.log(error);
  }
};

export const addCollection = async (collection) => {
  try {
    await axios.post("/collection", collection);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`/product/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (slug, product) => {
  try {
    await axios.put(`/product/${slug}`, product);
  } catch (error) {
    console.log(error);
  }
};
