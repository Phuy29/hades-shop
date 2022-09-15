import axios from "axios";
import jwtDecode from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post("/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const myInterceptor = axios.create();
  myInterceptor.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodeUser = jwtDecode(user?.accessToken);
      if (decodeUser.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data?.newAccessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data?.newAccessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return myInterceptor;
};
