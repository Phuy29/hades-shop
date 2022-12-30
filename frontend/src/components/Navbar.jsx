import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../Context/SidebarContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections, logoutUser } from "../utils/apiRequest";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const adminNavigation = [
  { name: "Products", href: "/admin/products" },
  { name: "Collections", href: "/admin/collections" },
  { name: "Users", href: "/admin/users" },
];

const userNavigation = [{ name: "Profile", href: "/" }];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = () => {
  const { setOpenSlideCart, setOpenSearch } = useContext(SidebarContext);
  const cart = useSelector((state) => state.cart);
  const [isBg, setIsBg] = useState(false);
  const [allCollections, setAllCollections] = useState([]);

  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllCollections(setAllCollections);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsBg(true) : setIsBg(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutUser(user?.accessToken, dispatch);
  };

  return (
    <div
      className={`fixed z-10 px-14 top-0 w-full ${
        isBg && "bg-white"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between h-[66px]">
        <div className="flex justify-between items-center gap-4">
          <Link to="/">
            <img
              src="https://theme.hstatic.net/1000306633/1000859591/14/logo.png?v=314"
              alt="logo"
              className="h-7 md:h-[50px] md:pr-8"
            />
          </Link>

          <div className="flex gap-5 w-[400px] justify-between">
            {allCollections.map((item, index) => {
              return (
                <Link to={`/collection/${item.slug}}`} key={index}>
                  <div
                    className={`uppercase font-normal text-13 hover:font-medium `}
                  >
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <nav>
          <div className="menu flex items-center gap-5 text-12 justify-end uppercase">
            {user ? (
              <div>
                <ProfileDropdown
                  username={user.user.username}
                  handleLogout={handleLogout}
                  isAdmin={user.user.isAdmin}
                />
              </div>
            ) : (
              <div>
                <span className="cursor-pointer">
                  <Link to="/login">Login</Link>
                </span>{" "}
                /
                <span className="cursor-pointer">
                  {" "}
                  <Link to="/register">register</Link>
                </span>
              </div>
            )}

            <div className="cursor-pointer" onClick={() => setOpenSearch(true)}>
              Search
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setOpenSlideCart(true)}
            >
              CART ({cart.totalQuantity})
            </div>
            <div className="flex uppercase bg-black p-1 text-white items-center">
              EN
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

const ProfileDropdown = ({ username, handleLogout, isAdmin }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="uppercase">
          <span>Hi, {username}</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {isAdmin
            ? adminNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))
            : userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}

          <Menu.Item>
            {({ active }) => (
              <div
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-3 text-sm text-gray-700 border-t cursor-pointer"
                )}
                onClick={handleLogout}
              >
                Logout
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Navbar;
