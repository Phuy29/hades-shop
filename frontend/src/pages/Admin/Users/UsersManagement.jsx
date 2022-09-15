import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../../utils/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../utils/createInterceptor";
import { loginSuccess } from "../../../redux/authSlice";
import { Link } from "react-router-dom";

const UsersManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  useEffect(() => {
    getAllUsers(currentUser?.accessToken, setAllUsers, axiosJWT);
  }, []);

  const handleClick = (id) => {
    setUserId(id);
    setIsOpen(true);
  };

  return (
    <div className="mt-24 px-14">
      <div className="">
        {/* Heading */}
        <h1 className="text-36 font-medium text-center mb-8">
          Quản lý người dùng
        </h1>

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
              {allUsers.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="flex justify-center gap-3 my-6">
                      <Link to={`/admin/users/update-user/${user._id}`}>
                        <button className="py-2 px-4 bg-black text-white hover:opacity-60">
                          Update
                        </button>
                      </Link>
                      <button
                        className="py-2 px-4 border border-black hover:opacity-60"
                        onClick={() => handleClick(user._id)}
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
        id={userId}
        currentUser={currentUser}
        axiosJWT={axiosJWT}
        setAllUsers={setAllUsers}
      />
    </div>
  );
};

const ModelDelete = ({
  isOpen,
  setIsOpen,
  id,
  currentUser,
  axiosJWT,
  setAllUsers,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    await deleteUser(currentUser?.accessToken, id, axiosJWT);
    getAllUsers(currentUser?.accessToken, setAllUsers, axiosJWT);
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
                Bạn có chắc chắn muốn xóa người dùng này không?
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

export default UsersManagement;
