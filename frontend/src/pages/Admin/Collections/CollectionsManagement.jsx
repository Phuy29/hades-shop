import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCollections } from "../../../utils/apiRequest";

const CollectionsManagement = () => {
  const [allCollections, setAllCollections] = useState([]);

  useEffect(() => {
    getAllCollections(setAllCollections);
  }, []);

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
              {allCollections.map((product) => {
                return (
                  <tr key={product._id}>
                    <td className="uppercase">{product.name}</td>
                    <td className="flex justify-center gap-3 py-3">
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

export default CollectionsManagement;
