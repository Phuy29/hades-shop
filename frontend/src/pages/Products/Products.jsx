import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, getTotal } from "../../redux/cartSlice";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { getOneProduct } from "../../utils/apiRequest";

const Product = () => {
  const { setOpenSlideCart } = useContext(CartContext);
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const params = useParams();

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const newItem = {
      id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      color: color,
      size: size,
      imageUrl: product.imgUrl,
    };

    if (color === "") {
      toast.info("Vui lòng chọn màu sắc!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (size === "") {
      toast.info("Vui lòng chọn size!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addToCart(newItem));
      dispatch(getTotal());
      setOpenSlideCart(true);
    }
  };

  const handleGoToCart = (product) => {
    const newItem = {
      id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      color: color,
      size: size,
      imageUrl: product.imgUrl,
    };
    if (color === "") {
      toast.info("Vui lòng chọn màu sắc!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (size === "") {
      toast.info("Vui lòng chọn size!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addToCart(newItem));
      dispatch(getTotal());
    }
  };

  useEffect(() => {
    getOneProduct(params.productId, setProduct);
  }, [params.productId]);

  return (
    <div className="px-14 mt-24">
      <div className="flex justify-center gap-24" key={product.name}>
        <div className="h-[650px] overflow-y-auto">
          <img src={product.imgUrl} alt="" className="w-[600px]" />
        </div>

        <div className="p-5 mt-8">
          {/* {item.newArrival && (
                <img
                  src="https://file.hstatic.net/1000306633/file/new_arrivals_283d7b8f2ab1443490b85f4c7732fcc5.svg"
                  alt=""
                />
              )} */}
          <h3 className="my-5 text-36 font-medium">{product.name}</h3>
          <p className="my-3">{product.price},000₫</p>
          <div className="my-4">
            <p>Màu sắc:</p>
            <div className="inline-flex gap-2 my-2">
              {product.colors?.map((color) => {
                return (
                  <div key={color} className="">
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      id={color}
                      className="sr-only"
                      onChange={(e) => setColor(e.target.value)}
                    />
                    <label htmlFor={color}>{color}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <p>Kích thước:</p>
            <p className="font-thin underline text-12 cursor-pointer">
              Bảng size:
            </p>
          </div>
          <div className="flex flex-wrap my-5">
            {product.sizes?.map((item) => {
              return (
                <div key={item} className="group">
                  <input
                    type="radio"
                    key={item}
                    name="size"
                    id={item}
                    value={item}
                    className="sr-only"
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <label
                    htmlFor={item}
                    className="inline-block py-4 px-10 text-base border border-black shadow-sm cursor-pointer group-checked:bg-black"
                  >
                    <div>{item}</div>
                  </label>
                </div>
              );
            })}
          </div>
          <button
            className="my-4 w-full py-5 border border-black font-medium cursor-pointer"
            onClick={() => handleAddToCart(product)}
          >
            Thêm vào giỏ hàng
          </button>

          <Link to="/cart" onClick={() => handleGoToCart(product)}>
            <button className="w-full py-5 font-medium cursor-pointer bg-black text-white">
              Mua ngay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
