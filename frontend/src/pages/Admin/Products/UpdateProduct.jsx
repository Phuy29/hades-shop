import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllCollections, getOneProduct } from "../../../utils/apiRequest";

const UpdateProduct = () => {
  const [allCollections, setAllCollections] = useState([]);
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getAllCollections(setAllCollections);
    getOneProduct(params.productSlug, setProduct);
  }, [params.productSlug]);

  return (
    <div className="mt-32 px-24">
      {/* Button back */}
      <Link to="/admin/products">
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
        Update product
      </div>

      <Formik
        initialValues={{
          name: "",
          price: "",
          colors: "",
          sizes: [],
          imgUrl: "",
          imgUrlHover: "",
          collectionId: "631c32fa60c26a22dc545d14",
        }}
        onSubmit={(values) => {
          console.log(values);
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
            value={product.name}
          />

          <label htmlFor="price" className="block text-gray-700 mt-3">
            Price:
          </label>
          <Field
            type="text"
            name="price"
            className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500"
            value={product.price}
          />

          <div className="block text-gray-700 mt-3">Colors:</div>
          <div className="mt-1 flex gap-4">
            <label>
              <Field type="checkbox" name="colors" value="Đen" /> Đen
            </label>
            <label>
              <Field type="checkbox" name="colors" value="Nâu" /> Nâu
            </label>
            <label>
              <Field type="checkbox" name="colors" value="Xám" /> Xám
            </label>
          </div>

          <div className="block text-gray-700 mt-3">Sizes:</div>
          <div className="mt-1 flex gap-4">
            <label>
              <Field type="checkbox" name="sizes" value="S" /> S
            </label>
            <label>
              <Field type="checkbox" name="sizes" value="M" /> M
            </label>
            <label>
              <Field type="checkbox" name="sizes" value="L" /> L
            </label>
            <label>
              <Field type="checkbox" name="sizes" value="XL" /> XL
            </label>
          </div>

          <label htmlFor="imgUrl" className="block text-gray-700 mt-3">
            Image Url:
          </label>
          <Field
            type="text"
            name="imgUrl"
            className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500"
            value={product.imgUrl}
          />

          <label htmlFor="imgUrlHover" className="block text-gray-700 mt-3">
            Image Url Hover:
          </label>
          <Field
            type="text"
            name="imgUrlHover"
            className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500"
            value={product.imgUrlHover}
          />

          <label htmlFor="collectionId" className="block text-gray-700 mt-3">
            Collection:
          </label>
          <Field
            name="collectionId"
            as="select"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm uppercase"
          >
            {allCollections.map((collection) => {
              return (
                <option key={collection._id} value={collection._id}>
                  {collection.name}
                </option>
              );
            })}
          </Field>
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

export default UpdateProduct;
