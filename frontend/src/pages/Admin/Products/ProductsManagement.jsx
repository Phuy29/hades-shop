import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../../redux/authSlice";
import {
  deleteProduct,
  getAllProducts,
  getAllProductsTrash,
} from "../../../utils/apiRequest";
import { createAxios } from "../../../utils/createInterceptor";
import { BsTrash } from "react-icons/bs";

const ProductManagement = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [countDeletedProducts, setCountDeletedProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItemList, setCheckedItemList] = useState([]);
  const [isDeleteBtn, setIsDeleteBtn] = useState(false);

  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  useEffect(() => {
    getAllProductsTrash(
      currentUser?.accessToken,
      setCountDeletedProducts,
      axiosJWT
    );
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllProducts();
      setAllProducts(res.data);
      setCheckedItemList(new Array(res.data.length).fill(false));
    };
    fetchApi();
  }, []);

  const handleDelete = (id) => {
    setIsOpen(true);
    setProductId(id);
  };

  const handleChange = () => {
    setCheckedAll(!checkedAll);
    setCheckedItemList(new Array(allProducts.length).fill(!checkedAll));
    if (!checkedAll) {
      setIsDeleteBtn(true);
    } else {
      setIsDeleteBtn(false);
    }
  };

  const handleChangeCheckboxItem = (position) => {
    const updateCheckedItemList = checkedItemList.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedItemList(updateCheckedItemList);

    const totalCheckedCheckbox = updateCheckedItemList.reduce((total, item) => {
      if (item === true) {
        return (total += 1);
      }
      return total;
    }, 0);

    if (updateCheckedItemList.includes(true)) {
      setIsDeleteBtn(true);
    } else {
      setIsDeleteBtn(false);
    }

    const isCheckedAll = allProducts.length === totalCheckedCheckbox;
    setCheckedAll(isCheckedAll);
  };

  return (
    <div className="mt-24 px-14">
      <div className="">
        {/* Heading */}
        <h1 className="text-36 font-medium text-center mb-8">
          Quản lý sản phẩm
        </h1>

        {/* Button add product */}
        <div className="flex justify-between items-center">
          <Link to="/admin/products/trash">
            <button className="text-xl text-blue-600 hover:underline">
              Thùng rác ({countDeletedProducts.length})
            </button>
          </Link>
          <Link to="/admin/products/add-product">
            <button className="py-2 px-4 border border-black cursor-pointer hover:bg-black hover:text-white">
              Add product
            </button>
          </Link>
        </div>

        <div className="mt-3 h-[34px] flex items-center gap-3">
          <div>
            <input
              type="checkbox"
              id="checkboxAll"
              onChange={handleChange}
              checked={checkedAll}
            />
            <label htmlFor="checkboxAll" className="ml-1 cursor-pointer">
              Select all
            </label>
          </div>
          {isDeleteBtn && (
            <button className="py-1 px-2 flex gap-1 items-center border border-black cursor-pointer rounded-md hover:bg-black hover:text-white">
              <BsTrash />
              <span>Delete</span>
            </button>
          )}
        </div>

        {/* Table */}
        <div className="container mx-auto mt-5 pb-20">
          <table className="table-fixed cursor-pointer">
            {/* head */}
            <thead className="bg-gray-200">
              <tr className="text-center text-gray-600">
                <th className="py-4"></th>
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
              {allProducts.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <div className="mt-5 text-20">
                      There are currently no products.
                    </div>
                    <Link to="/admin/products/add-product">
                      <div className="mt-2 text-blue-700 hover:underline">
                        Add product
                      </div>
                    </Link>
                  </td>
                </tr>
              ) : (
                <>
                  {allProducts.map((product, index) => {
                    return (
                      <tr key={product._id}>
                        <td>
                          <input
                            className="px-6"
                            type="checkbox"
                            name={product.slug}
                            value={product.slug}
                            checked={checkedItemList[index]}
                            onChange={() => handleChangeCheckboxItem(index)}
                          />
                        </td>
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
                        <td className="uppercase">
                          {product.collectionId.name}
                        </td>
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
                            onClick={() => handleDelete(product.slug)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModelDelete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={productId}
        setAllProducts={setAllProducts}
        setCountDeletedProducts={setCountDeletedProducts}
      />
    </div>
  );
};

const ModelDelete = ({
  isOpen,
  setIsOpen,
  id,
  setAllProducts,
  setCountDeletedProducts,
}) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    await deleteProduct(currentUser?.accessToken, id, axiosJWT);
    await getAllProductsTrash(
      currentUser?.accessToken,
      setCountDeletedProducts,
      axiosJWT
    );
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
