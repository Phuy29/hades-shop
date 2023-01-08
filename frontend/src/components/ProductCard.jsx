import { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { useDispatch } from "react-redux";
import { addToCart, getTotal } from "../redux/cartSlice";

const ProductCard = ({
  id,
  name,
  slug,
  price,
  colors,
  size,
  imageUrl,
  imageHoverUrl,
}) => {
  const { setOpenSlideCart } = useContext(SidebarContext);

  const dispatch = useDispatch();

  const newItem = {
    id: id,
    name: name,
    slug: slug,
    price: Number(price.slice(0, 3)),
    color: colors[0],
    size: size[0],
    imageUrl: imageUrl,
  };

  const handleClick = () => {
    dispatch(addToCart(newItem));
    dispatch(getTotal());

    setOpenSlideCart(true);
  };

  const handleGoToCart = () => {
    dispatch(addToCart(newItem));
    dispatch(getTotal());
  };

  return (
    <div className="text-center cursor-pointer">
      <div className="relative group h-full">
        <Link to={`/product/${slug}`}>
          <div className="group-hover:hidden">
            <img
              src={imageUrl}
              alt=""
              className="h-[400px] w-full object-cover"
            />
          </div>
          <div className="hidden group-hover:block">
            <img
              src={imageHoverUrl}
              alt=""
              className="h-[400px] w-full object-cover"
            />
          </div>
        </Link>
        <div className="gap-3 absolute bottom-2 w-full flex opacity-0 group-hover:opacity-100 transition-all ease-in duration-500 group-hover:animate-slideDown">
          <Link to="/cart" className="ct-button" onClick={handleGoToCart}>
            Buy now
          </Link>
          <div className="ct-button" onClick={handleClick}>
            Add to card
          </div>
        </div>
      </div>
      <div className="mt-[15px]">
        {/* <div className="inline-flex gap-2 mb-3">
          {colors.map((color) => {
            return (
              <p key={color} className={`inline-block mx-auto`}>
                {color}
              </p>
            );
          })}
        </div> */}
        <p className="text-14 font-semibold">{name}</p>
        {price ? (
          <p className="text-14 mt-2">{price},000₫</p>
        ) : (
          <p className="mt-2 py-2 px-1 bg-gray-300 text-white font-semibold inline-block text-12">
            Hết hàng
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
