import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-hot-toast";

const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 overflow-y-scroll ">
      <div
        className="fixed top-0 right-0 min-h-full w-[80%] 800px:w-[25%] bg-white flex flex-col 
      justify-between shadow-sm overscroll-y-scroll"
      >
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3 ">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div className=" overflow-y-scroll">
              <div>
                <div className=" w-full flex justify-between items-center pt-5 pr-5">
                  {/* Items length */}
                  <div className="flex items-center ml-5">
                    <IoBagHandleOutline size={25} color="red" />
                    <h5 className="pl-2 text-[20px] font-[500]">
                      {cart.length} Items
                    </h5>
                  </div>

                  {/* Cross */}
                  <RxCross1
                    color="red"
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpenCart(false)}
                  />
                </div>
              </div>

              {/* Cart single items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      data={i}
                      key={index}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            {/* Checkout button */}
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] ">
                  <h1 className="text-[#fff] font-Poppins text-[18px]">
                    Checkout Now (INR₹ {totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error("Product stock limited");
    } else {
      setValue(value + 1);
      const updatedCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updatedCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4 ">
      <div className="w-full flex items-center ">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="white" />
          </div>
          <span className="pl-[10px] select-none">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={18} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[80px] h-[80px] ml-2 select-none"
        />
        <div className="pl-[15px]">
          <h1 className="select-none">{data.name.slice(0,50) + "..."}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ₹{data.price} * {value}
          </h4>
          <h4 className="fonr-[600] text-[17px] pt-[3px] text-[#d02222] font-Poppins select-none">
            INR₹ {totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer text-[#e44343]"
          size={20}
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
