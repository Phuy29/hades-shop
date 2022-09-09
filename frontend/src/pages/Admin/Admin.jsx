const Admin = () => {
  return (
    <div className="mt-24 px-24">
      <div className="flex">
        <div className="w-[200px] h-screen border-r border-gray-300">
          <div className="my-3 cursor-pointer hover:underline">
            - Quản lý sản phẩm
          </div>
          <div className="my-3 cursor-pointer hover:underline">
            - Quản lý danh mục
          </div>
          <div className="my-3 cursor-pointer hover:underline">
            - Quản lý user
          </div>
        </div>
        <div className="flex-1">Main</div>
      </div>
    </div>
  );
};

export default Admin;
