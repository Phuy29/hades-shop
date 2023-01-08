import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotal, removeCartItem } from "../redux/cartSlice";

const SlideCart = () => {
  const { openSlideCart, setOpenSlideCart } = useContext(SidebarContext);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveCartItem = (product) => {
    dispatch(removeCartItem(product));
    dispatch(getTotal());
  };

  const handleCloseSlideCart = () => {
    setOpenSlideCart(false);
  };

  const setComma = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Transition.Root show={openSlideCart} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenSlideCart(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="inset-0 absolute overflow-hidden">
            <div className="fixed inset-y-0 max-w-full pl-10 right-0">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration:700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration:700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className=" w-[480px]">
                  <div className="flex flex-col h-screen bg-white overflow-y-scroll shadow-xl">
                    <div className="flex-1 overflow-y-auto py-[100px] px-16 ">
                      <div className="flex justify-between items-center">
                        <Dialog.Title className="uppercase text-14 text-gray-900">
                          Cart
                        </Dialog.Title>
                        <div className="ml-6 h-7 flex items-center">
                          <button
                            type="button"
                            className="-mx-2 px-2 text-gray-400 hover:text-gray-800"
                            onClick={() => setOpenSlideCart(false)}
                          >
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {cart.cartItems.length === 0 ? (
                        <div className="mt-8">
                          <div className="mt-16 text-14">
                            There are currently no products
                          </div>
                          <div className="w-full border-t-2 border-black mt-4"></div>
                          <div className="flex justify-between mt-6">
                            <div className="uppercase text-14">Total</div>
                            <div>0đ</div>
                          </div>
                          <div className="mt-7">
                            <Link to="/cart">
                              <button
                                className="ct-button"
                                onClick={() => setOpenSlideCart(false)}
                              >
                                View Cart
                              </button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cart.cartItems.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <div className="flex gap-3 my-4">
                                      <Link
                                        to={`/product/${item.slug}`}
                                        onClick={handleCloseSlideCart}
                                      >
                                        <img
                                          src={item.imageUrl}
                                          alt=""
                                          className="h-[118px] w-52 border border-slate-300"
                                        />
                                      </Link>
                                      <div className="w-[300px] ml-3">
                                        <p>{item.name}</p>
                                        <p className="mt-7 mb-3 font-normal text-gray-400">
                                          {item.color} / {item.size}
                                        </p>
                                        <span className="py-1 px-3 text-12 bg-gray-200">
                                          {item.cartQuantity}
                                        </span>
                                        <span className="ml-3 font-normal text-gray-600">
                                          {item.price}.000₫
                                        </span>
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          className="px-2 mt-1 mr-5"
                                          onClick={() =>
                                            handleRemoveCartItem(item)
                                          }
                                        >
                                          <XIcon
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className="w-full border-t-2 border-black mt-10"></div>
                            <div className="flex justify-between mt-6">
                              <div className="uppercase text-14">Total</div>
                              <div>{setComma(cart.totalPrice)}.000₫</div>
                            </div>
                            <Link to="/cart">
                              <div
                                className="mt-7"
                                onClick={() => setOpenSlideCart(false)}
                              >
                                <button className="ct-button">View cart</button>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideCart;
