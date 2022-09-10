import { useEffect, useState } from "react";
import { getAllUsers } from "../../../utils/apiRequest";

const UsersManagement = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers(setAllUsers);
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
                <th className="w-1/6 py-4">Username</th>
                <th className="w-1/6">Email</th>
                <th className="w-1/6">Actions</th>
              </tr>
            </thead>

            {/* body */}
            <tbody className="text-center divide-y">
              {allUsers.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product.username}</td>
                    <td>{product.email}</td>
                    <td className="flex justify-center gap-3 my-6">
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

export default UsersManagement;
