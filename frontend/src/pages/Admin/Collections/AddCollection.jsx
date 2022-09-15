import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { addCollection } from "../../../utils/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../utils/createInterceptor";
import { loginSuccess } from "../../../redux/authSlice";

const AddCollection = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  return (
    <div className="mt-32 px-24 mx-auto">
      <Link to="/admin/collections">
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
      <div className="text-center text-36 font-semibold uppercase">
        Add collection
      </div>

      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={async (values) => {
          await addCollection(currentUser?.accessToken, values, axiosJWT);
          navigate("/admin/collections");
        }}
      >
        <Form className="mt-12 max-w-lg mx-auto">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <Field
            type="text"
            name="name"
            className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500"
          />

          <button
            type="submit"
            className="mt-4 py-3 px-3 cursor-pointer border border-black hover:bg-black hover:text-white"
          >
            Add product
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddCollection;
