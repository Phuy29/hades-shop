import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../../redux/authSlice";
import { deleteProduct, getAllProducts } from "../../../utils/apiRequest";
import { createAxios } from "../../../utils/createInterceptor";

const ProductManagement = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  const handleDelete = (id) => {
    setIsOpen(true);
    setProductId(id);
  };

  return (
    <div className="mt-24 px-14">
      <div className="">
        {/* Heading */}
        <h1 className="text-36 font-medium text-center mb-8">
          Quản lý sản phẩm
        </h1>

        {/* Button add product */}
        <Link to="/admin/products/add-product">
          <button className="py-2 px-4 border border-black cursor-pointer hover:bg-black hover:text-white">
            Add product
          </button>
        </Link>

        {/* Table */}
        <div className="container mx-auto mt-7 pb-20">
          <table className="table-fixed cursor-pointer">
            {/* head */}
            <thead className="bg-gray-200">
              <tr className="text-center text-gray-600">
                <th className="w-1/6 py-4">Name</th>
                <th className="w-1/6">Price</th>
                <th className="w-1/6">Color</th>
                <th className="w-1/6">Size</th>
                <th className="w-1/6">Image</th>
                <th className="w-1/6">Collection</th>
                <th className="w-1/6">Actions</th>
              </tr>
            </thead>

            {/* body */}
            <tbody className="text-center divide-y">
              {allProducts.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price},000₫</td>
                    <td>
                      {product.colors.map((color) => {
                        return <div key={color}>{color} </div>;
                      })}
                    </td>
                    <td>
                      {product.sizes.map((size) => {
                        return <div key={size}>{size} </div>;
                      })}
                    </td>
                    <td>
                      <img src={product.imgUrl} alt="" />
                    </td>
                    <td className="uppercase">{product.collectionId.name}</td>
                    <td className="flex justify-center gap-3 mt-28">
                      <Link
                        to={`/admin/products/update-product/${product.slug}`}
                      >
                        <button className="py-2 px-4 bg-black text-white hover:opacity-60">
                          Update
                        </button>
                      </Link>
                      <button
                        className="py-2 px-4 border border-black hover:opacity-60"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ModelDelete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={productId}
        setAllProducts={setAllProducts}
      />
    </div>
  );
};

const ModelDelete = ({ isOpen, setIsOpen, id, setAllProducts }) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    await deleteProduct(currentUser?.accessToken, id, axiosJWT);
    getAllProducts(setAllProducts);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="relative">
          <div className="fixed inset-0 z-20 bg-black bg-opacity-25" />

          <div className="fixed z-30 inset-0 overflow-y-auto flex justify-center items-center flex-col">
            <div className="bg-white rounded-md relative">
              <div className="p-6 text-20 font-normal text-gray-900">
                Bạn có chắc chắn muốn xóa sản phẩm này không?
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-md sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductManagement;
