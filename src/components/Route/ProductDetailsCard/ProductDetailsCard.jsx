import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShopping,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {

  const { cart } = useSelector((state) => state.cart)
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist)

  const dispatch = useDispatch()

  const handleMessageSubmit = () => {};

  useEffect(() => {
      if(wishlist && wishlist.find((i) => i._id === data._id)){
        setClick(true)
      } else {
        setClick(false)
      }

  }, [wishlist])
  

  const addToWishlistHandler = (data) => {
    setClick(!click)
    dispatch(addToWishlist(data))

  }

  const removeFromWishlistHandler = (data) => {
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }

  const addToCartHandler = (id) => {
      const isItemExists = cart && cart.find((i) => i._id === id)
      if(isItemExists){
        toast.error("Item already in cart!!")
      }else {
        if(data.stock < count){
          toast.error("Product stock limited!!")
        } else {
          const cartData = { ...data, qty: count };
          dispatch(addToCart(cartData));
          toast.success("Item added to cart sucessfully!!")
        }
      }
  }


  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center ">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4 ">
            <RxCross1
              size={26}
              className="absolute right-3 top-4 z-50"
              onClick={() => setOpen(false)}
              color="red"
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={`${backend_url}${data.images && data.images[0]}`} alt="" />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`}> 
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>

                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>

                    <h5 className="pb-3 text-[15px] flex items-center">
                      {data.shop.ratings}{" "}
                      <AiFillStar size={18} color="F6BA00" className="mr-1" />{" "}
                      Ratings
                    </h5>
                  </div>
                </div>

                <h5 className="text-[16px] text-[red] mt-5">
                  {data?.sold_out} Sold out
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}₹
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "₹" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 py-2 px-4 hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 tetx-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 py-2 px-4 hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer  transition-all"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer  transition-all"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.hero_button}  mt-8 rounded h-11 flex`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="flex text-[#fff] font-Poppins">
                    Add to cart{" "}
                    <AiOutlineShopping size={18} className="mt-1 ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
