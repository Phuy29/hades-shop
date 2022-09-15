import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loginSuccess } from "../../../redux/authSlice";
import { getOneUser, updateUser } from "../../../utils/apiRequest";

import { createAxios } from "../../../utils/createInterceptor";

const UpdateUser = () => {
  const [user, setUser] = useState();

  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getOneUser(currentUser?.accessToken, params.userId, setUser, axiosJWT);
  }, []);

  return (
    <div className="mt-32 px-24">
      {/* Button back */}
      <Link to="/admin/users">
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <div className="cursor-pointer">Back</div>
        </div>
      </Link>

      {/* Heading */}
      <div className="text-center text-36 font-semibold uppercase">
        Update user
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          username: user?.username,
          email: user?.email,
          password: "",
          isAdmin: user?.isAdmin.toString(),
        }}
        onSubmit={async (values) => {
          await updateUser(
            currentUser?.accessToken,
            user._id,
            values,
            axiosJWT
          );
          navigate("/admin/users");
        }}
      >
        <Form className="mt-12 max-w-lg mx-auto">
          <label htmlFor="username" className="block text-gray-700">
            User Name:
          </label>
          <Field
            type="text"
            name="username"
            className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500"
          />

          <label htmlFor="email" className="block text-gray-700 mt-3">
            Email:
          </label>
          <Field
            type="text"
            name="email"
            className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500"
          />

          <label htmlFor="password" className="block text-gray-700 mt-3">
            Password:
          </label>
          <Field
            type="password"
            name="password"
            className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500"
          />

          <div className="block text-gray-700 mt-3">Admin:</div>
          <div className="mt-1 flex gap-4">
            <label>
              <Field type="radio" name="isAdmin" value="true" /> Yes
            </label>
            <label>
              <Field type="radio" name="isAdmin" value="false" /> No
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 py-3 px-3 cursor-pointer border border-black hover:bg-black hover:text-white"
          >
            Update user
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateUser;
