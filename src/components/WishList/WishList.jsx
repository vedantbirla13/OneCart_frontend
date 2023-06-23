import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import headphones from "../../assets/headphones_a_1.webp";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-hot-toast";

const WishList = ({ setOpenWishlist }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const newData = { ...data, qty:1 }
    dispatch(addToCart(newData));
    setOpenWishlist(false)
    dispatch(removeFromWishlist(data))
    toast.success("1 item added to cart")
  };

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm  ">
        {!isAuthenticated ? (
          <div className="relative">
            <div className=" w-full h-full flex flex-col items-center  mt-[50%] ">
              <div className="absolute top-3 right-3">
                <RxCross1
                  color="red"
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <h2 className="font-Poppins text-[20px] tracking-wide uppercase pb-2 ">
                Please log in
              </h2>
              <p className="text-gray-500 font-Poppins pb-6">
                Login to view items in your wishlist.{" "}
              </p>
              <Link
                to="/login"
                className="w-[150px] h-[50px] font-Poppins flex justify-center items-center
                  border border-[#362a90fb] text-[#362a90fb] rounded-[3px] 
                  cursor-pointer hover:bg-[#362a90fb] hover:text-white transition-all duration-300"
              >
                <span className="font-Poppins">Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className=" w-full flex justify-between items-center pt-5 pr-5">
                {/* Items length */}
                <div className="flex ml-5 items-center">
                  <AiOutlineHeart size={25} color="red" />
                  <h5 className="pl-2 text-[20px] font-[500]">
                    {wishlist && wishlist.length} items
                  </h5>
                </div>

                {/* Cross */}
                <RxCross1
                  color="red"
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
            </div>

            {/* Cart single items */}
            <br />
            <div className="w-full border-t">
              {isAuthenticated && wishlist && wishlist.length === 0 ? (
                <div className="w-full h-screen flex items-center justify-center">
                  <h5>Wishlist Items is empty!</h5>
                </div>
              ) : (
                <>
                  <div>
                    {/* cart Single Items */}
                    <div className="w-full border-t">
                      {wishlist &&
                        wishlist.map((i, index) => (
                          <CartSingle
                            key={index}
                            data={i}
                            removeFromWishlistHandler={
                              removeFromWishlistHandler
                            }
                            addToCartHandler={addToCartHandler}
                          />
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4 ">
      <div className="w-full flex items-center pt-4">
        <RxCross1 className="cursor-pointer text-[#e44343]" size={20} onClick={() => removeFromWishlistHandler(data)} />
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[80px] h-[80px] ml-2 select-none"
        />

        <div className="pl-[15px]">
          <h1 className="select-none">{data.name.slice(0,50) + "..."}</h1>
          <h4 className="fonr-[600] text-[17px] pt-[3px] text-[#d02222] font-Poppins select-none">
            INR₹ {totalPrice}
          </h4>
        </div>

        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Move to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
