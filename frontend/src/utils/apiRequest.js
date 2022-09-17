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

export const getOneCollection = async (id, setState) => {
  try {
    const res = await axios.get(`/collection/${id}`);
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

export const getAllUsers = async (accessToken, setState, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    setState(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (accessToken, product, axiosJWT) => {
  try {
    await axiosJWT.post("/product", product, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCollection = async (accessToken, collection, axiosJWT) => {
  try {
    await axiosJWT.post("/collection", collection, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (accessToken, id, axiosJWT) => {
  try {
    await axiosJWT.delete(`/product/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (accessToken, slug, product, axiosJWT) => {
  try {
    await axiosJWT.put(`/product/${slug}`, product, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCollection = async (accessToken, id, axiosJWT) => {
  try {
    await axiosJWT.delete(`/collection/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCollection = async (
  accessToken,
  slug,
  collection,
  axiosJWT
) => {
  try {
    await axiosJWT.put(`/collection/${slug}`, collection, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (accessToken, id, axiosJWT) => {
  try {
    await axiosJWT.delete(`/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneUser = async (accessToken, id, setState, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    setState(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (accessToken, id, user, axiosJWT) => {
  try {
    await axiosJWT.put(`/user/${id}`, user, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsTrash = async (accessToken, setState, axiosJWT) => {
  try {
    const res = await axiosJWT.get("/product/trash", {
      headers: { token: `Bearer ${accessToken}` },
    });
    setState(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const restoreOneProduct = async (accessToken, id, axiosJWT) => {
  try {
    await axiosJWT.patch(
      `/product/restore/${id}`,
      {},
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneProductForce = async (accessToken, id, axiosJWT) => {
  try {
    await axiosJWT.delete(`/product/delete/force/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};
