import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Collections from "./pages/Collections/Collections";
import Cart from "./pages/Cart/Cart";
import { SidebarContext } from "./context/SidebarContext";
import SlideCart from "./components/SlideCart";
import Search from "./components/Search";
import Layout from "./layout/LayoutDefault";
import Product from "./pages/Products/Products";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import ProductsManagement from "./pages/Admin/Products/ProductsManagement";
import CollectionsManagement from "./pages/Admin/Collections/CollectionsManagement";
import UsersManagement from "./pages/Admin/Users/UsersManagement";
import AddProduct from "./pages/Admin/Products/AddProduct";
import AddCollection from "./pages/Admin/Collections/AddCollection";
import UpdateProduct from "./pages/Admin/Products/UpdateProduct";
import Custom404 from "./pages/404";
import UpdateCollection from "./pages/Admin/Collections/UpdateCollection";
import UpdateUser from "./pages/Admin/Users/UpdateUser";
import ProductsTrash from "./pages/Admin/Products/ProductsTrash";

function App() {
  const [openSlideCart, setOpenSlideCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        openSlideCart,
        setOpenSlideCart,
        openSearch,
        setOpenSearch,
      }}
    >
      <Router>
        <Layout>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/collection/:collectionId" element={<Collections />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/admin/products" element={<ProductsManagement />} />
            <Route
              path="/admin/collections"
              element={<CollectionsManagement />}
            />
            <Route path="/admin/users" element={<UsersManagement />} />
            <Route
              path="/admin/products/add-product"
              element={<AddProduct />}
            />
            <Route
              path="/admin/collections/add-collection"
              element={<AddCollection />}
            />
            <Route
              path="/admin/products/update-product/:productSlug"
              element={<UpdateProduct />}
            />
            <Route
              path="/admin/collections/update-collection/:collectionSlug"
              element={<UpdateCollection />}
            />
            <Route
              path="/admin/users/update-user/:userId"
              element={<UpdateUser />}
            />
            <Route path="/admin/products/trash" element={<ProductsTrash />} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
          <SlideCart />
          <Search />
        </Layout>
      </Router>
    </SidebarContext.Provider>
  );
}

export default App;
