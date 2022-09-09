import { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/apiRequest";

const ProductManagement = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts(setAllProducts);
  }, []);

  return (
    <div className="mt-24 px-14">
      <div className="">
        {/* Heading */}
        <h1 className="text-36 font-medium text-center mb-8">
          Quản lý sản phẩm
        </h1>

        {/* Button add product */}
        <button className="py-2 px-4 border border-black cursor-pointer hover:bg-black hover:text-white">
          Add product
        </button>

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
                <th className="w-1/6"></th>
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
                        return <span key={color.name}>{color.name} </span>;
                      })}
                    </td>
                    <td>
                      {product.size.map((size) => {
                        return <span key={size}>{size} </span>;
                      })}
                    </td>
                    <td>
                      <img src={product.imgUrl} alt="" />
                    </td>
                    <td className="uppercase">
                      {product.collectionId.map((item) => (
                        <>{item.name}</>
                      ))}
                    </td>
                    <td className="flex justify-center gap-3 mt-28">
                      <button className="py-2 px-4 bg-black text-white hover:opacity-60">
                        Update
                      </button>
                      <button className="py-2 px-4 border border-black hover:opacity-60">
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
    </div>
  );
};

export default ProductManagement;
