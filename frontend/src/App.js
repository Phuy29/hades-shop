import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Collections from "./pages/Collections/Collections";
import Cart from "./pages/Cart/Cart";
import { CartContext } from "./Context/CartContext";
import SlideCart from "./components/SlideCart";
import Search from "./components/Search";
import Layout from "./layout/layoutContainer";
import Product from "./pages/Products/Products";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import ProductsManagement from "./pages/Admin/ProductsManagement";
import CollectionsManagement from "./pages/Admin/CollectionsManagement";
import UsersManagement from "./pages/Admin/UsersManagement";

function App() {
  const [openSlideCart, setOpenSlideCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <CartContext.Provider
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
            <Route path="/collection/">
              <Route path=":collectionId" element={<Collections />}></Route>
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/admin/products" element={<ProductsManagement />} />
            <Route
              path="/admin/collections"
              element={<CollectionsManagement />}
            />
            <Route path="/admin/users" element={<UsersManagement />} />
          </Routes>
          <SlideCart />
          <Search />
        </Layout>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
