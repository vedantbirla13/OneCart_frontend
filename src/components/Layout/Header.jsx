import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart/Cart.jsx";
import WishList from "../WishList/WishList.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isLoading, isSellerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );
  const { allProducts } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };


  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <h1 className="text-3xl font-FjallaOne tracking-wider text-[#362a90fb] ">
                OneCart
              </h1>
            </Link>
          </div>

          {/* search box */}
          <div className="w-[60%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#817f7f] border-[2px] rounded-md placeholder:font-Poppins"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;

                    // const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div
                          id={index}
                          className="w-full flex items-start-py-3"
                        >
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px] "
                          />
                          <h1 className="font-Poppins">{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div
            className={`${styles.header_button} hover:bg-[#201668] transition-all duration-300`}
          >
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
                {"Become Seller"}{" "}
                <IoIosArrowForward size={18} className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#362a90fb] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-Poppins text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* Nav items */}
          <div className={`${styles.noramlFlex} relative`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span
                  className="absolute right-[-4px] top-[-4px] rounded-full bg-[#3bc117] w-4 h-4 top right p-0 m-0 
                text-white font-Roboto text-[12px] leading-tight text-center"
                >
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span
                  className="absolute right-[-4px] top-[-4px] rounded-full bg-[#3bc117] w-4 h-4 top right p-0 m-0 
                text-white font-Roboto text-[12px] leading-tight text-center"
                >
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user?.avatar}`}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* Cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* Wishlist popup */}
            {openWishlist ? (
              <WishList setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="w-full h-[50px] fixed flex bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden">
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <h1 className="text-3xl font-FjallaOne tracking-wider text-[#362a90fb] ">
                OneCart
              </h1>
            </Link>
          </div>

          <div>
            <div className="relative mr-4">
              <AiOutlineShoppingCart
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenCart(true)}
              />
              <span
                className="absolute right-[-4px] top-[-4px] rounded-full bg-[#3bc117] w-4 h-4 top right p-0 m-0 
                text-white font-Roboto text-[12px] leading-tight text-center"
              >
                {cart && cart.length}
              </span>
            </div>
          </div>

          {/* Cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <WishList setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* Header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div className="flex">
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart
                      size={30}
                      className="mt-5 ml-3 cursor-pointer"
                      onClick={() => setOpenWishlist(true) || setOpen(false)}
                    />
                    <span
                      className="absolute right-[-4px] top-[20px] rounded-full bg-[#3bc117] w-4 h-4 top right p-0 m-0 
                    text-white font-Roboto text-[12px] leading-tight text-center "
                    >
                      0
                    </span>
                  </div>
                  {isAuthenticated ? (
                    <Link to="/profile" className="flex items-center">
                      <img
                        src={`${backend_url}${user.avatar}`}
                        alt=""
                        className="w-[35px] h-[35px] rounded-full mt-5"
                      />
                    </Link>
                  ) : null}
                </div>

                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer"
                  color="red"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#817f7f] border-[2px] rounded-md placeholder:font-Poppins"
                />

                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;

                        // const Product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${i._id}`}>
                            <div
                              id={index}
                              className="w-full flex items-start-py-3"
                            >
                              <img
                                src={`${backend_url}${i.images[0]}`}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1 className="font-Poppins">{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <div
                className={`${styles.hero_button} hover:bg-[#201668] transition-all duration-300 ml-5`}
              >
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller{" "}
                    <IoIosArrowForward size={18} className="ml-1" />
                  </h1>
                </Link>
              </div>

              <br />
              <br />
              <br />
              {!isAuthenticated && (
                <div className="flex w-full justify-center font-Poppins">
                  <Link to="/login"> Login / </Link>
                  <Link to="/sign-up" className="ml-1">
                    {" "}
                    Sign up{" "}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

//#43587d
