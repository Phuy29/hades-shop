import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../../redux/authSlice";
import { deleteCollection, getAllCollections } from "../../../utils/apiRequest";
import { createAxios } from "../../../utils/createInterceptor";

const CollectionsManagement = () => {
  const [allCollections, setAllCollections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [collectionId, setCollectionId] = useState("");

  useEffect(() => {
    getAllCollections(setAllCollections);
  }, []);

  const handleDelete = (id) => {
    setIsOpen(true);
    setCollectionId(id);
  };

  return (
    <div className="mt-24 px-14">
      <div className="">
        {/* Heading */}
        <h1 className="text-36 font-medium text-center mb-8">
          Quản lý bộ sưu tập
        </h1>

        {/* Button add collection */}
        <Link to="/admin/collections/add-collection">
          <button className="py-2 px-4 border border-black cursor-pointer hover:bg-black hover:text-white">
            Add collection
          </button>
        </Link>

        {/* Table */}
        <div className="container mx-auto mt-7 pb-20">
          <table className="table-fixed cursor-pointer">
            {/* head */}
            <thead className="bg-gray-200">
              <tr className="text-center text-gray-600">
                <th className="w-1/6 py-4">Name</th>
                <th className="w-1/6">Actions</th>
              </tr>
            </thead>

            {/* body */}
            <tbody className="text-center divide-y">
              {allCollections.map((collection) => {
                return (
                  <tr key={collection._id}>
                    <td className="uppercase">{collection.name}</td>
                    <td className="flex justify-center gap-3 py-3">
                      <Link
                        to={`/admin/collections/update-collection/${collection.slug}`}
                      >
                        <button className="py-2 px-4 bg-black text-white hover:opacity-60">
                          Update
                        </button>
                      </Link>
                      <button
                        className="py-2 px-4 border border-black hover:opacity-60"
                        onClick={() => handleDelete(collection._id)}
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
      <DeleteModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={collectionId}
        setAllCollections={setAllCollections}
      />
    </div>
  );
};

const DeleteModel = ({ isOpen, setIsOpen, id, setAllCollections }) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    await deleteCollection(currentUser?.accessToken, id, axiosJWT);
    getAllCollections(setAllCollections);
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div>
          <div className="fixed inset-0 z-20 bg-black bg-opacity-25"></div>

          <div className="fixed inset-0 z-30 flex justify-center items-center">
            <div className="bg-white rounded-md relative">
              <div className="p-6 text-20 font-normal text-gray-900">
                Bạn có chắc chắn muốn xóa bộ sưu tập này không?
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
                  onClick={handleClose}
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

export default CollectionsManagement;
