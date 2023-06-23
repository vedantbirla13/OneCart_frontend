import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsInfo from "../Route/ProductDetailsInfo/ProductDetailsInfo.jsx";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-hot-toast";
import { addToCart } from "../../redux/actions/cart";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const { products } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop._id));
    // dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const addToWishlistHandler = (data) => {
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart sucessfully!!");
      }
    }
  };

  const decrementCount = () => {
    setCount(count === 1 ? 1 : count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };


  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[100%]`}>
          <div className="w-full py-5 ">
            <div className="block w-full 800px:flex  ">
              <div className="w-full 800px:w-[50%] ">
                <img
                  src={`${backend_url}${data.images && data.images[select]}`}
                  alt=""
                  className="w-[90%] mix-blend-multiply mx-4 my-4 auto mb-4"
                />
                <div className="w-full flex shadow-sm justify-evenly">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : null
                        } cursor-pointer`}
                      >
                        <img
                          src={`${backend_url}${i}`}
                          alt=""
                          className="h-[220px] bg-red  "
                          onMouseEnter={() => setSelect(index)}
                        />
                      </div>
                    ))}

                  <div
                    className={`${
                      select === 1 ? "border" : null
                    } cursor-pointer`}
                  ></div>
                </div>
              </div>

              <div className="w-full 800px:w-[50%]  pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
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
                  className={`${styles.header_button} hover:bg-[#201668] transition-all duration-300 mt-6 rounded h-11 items-center`}
                  onClick={() => addToCartHandler(data?._id)}
                >
                  <span className="text-[#fff] flex items-center font-Poppins">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />{" "}
                  </span>
                </div>

                <div className="flex items-center">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({averageRating} / 5) Ratings
                      </h5>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
