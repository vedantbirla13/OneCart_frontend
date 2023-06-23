import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import Ratings from "../ProductCard/Ratings"
import { useDispatch } from "react-redux";
import { getAllProductsShop } from "../../../redux/actions/product";

const ProductDetailsInfo = ({ data, products, totalReviewsLength, averageRating }) => {
  const [active, setActive] = useState(1);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop._id));
    // dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);
  

  return (
    <>
      <div className="bg-[#ecedf1] px-3 800px:px-10 py-2 rounded  mt-5">
        <div className="w-full flex justify-between border-b pt-10 pb-2">
          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(1)}
            >
              Product Details
            </h5>
            {active === 1 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>

          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(2)}
            >
              Product Reviews
            </h5>
            {active === 2 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>

          <div className="relative">
            <h5
              className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
              onClick={() => setActive(3)}
            >
              Seller Information
            </h5>
            {active === 3 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </div>
        </div>

        {active === 1 ? (
          <>
            <p className="py-2 text-[16px] font-Poppins leading-8 pb-10 pt-5 whitespace-pre-line">
              Product details are a crucial part of any eCommerce website or
              online marketplace. These details help the potential customers to
              make an informed decision about the product they are interested in
              buying. A well-written product description can also be a powerful
              marketing tool that can help to increase sales.Product details
              typically include information about the product's features,
              specifications, dimensions, weight, materials, and other relevant
              information that can help customers to understand the product
              better. The product details section should also include
              high-quality images and videos of the product, as well as customer
              reviews and ratings.
            </p>
          </>
        ) : null}

        {active === 2 ? (
          <div className="flex py-3 overflow-y-scroll min-h-[40vh]">
            {data &&
              data.reviews.map((item, index) => (
                <div className="w-full flex my-2">
                  <img
                    src={`${backend_url}/${item.user.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="pl-2">
                    <div className="w-full flex">
                    <h1 className="pl-2 font-[500] font-Poppins mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}

            {data && data.reviews.length === 0 && (
              <div className="flex justify-center items-center w-full">
                <p className="text-[18px] font-Poppins">No reviews yet!!</p>
              </div>
            )}
          </div>
        ) : null}

        {active === 3 ? (
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%]">
              <div className="flex items-center ">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>

                  <h5 className="pb-2 text-[15px] flex items-center">
                    {averageRating / 5}{" "}
                    <AiFillStar size={18} color="F6BA00" className="mr-1" />{" "}
                    Ratings
                  </h5>
                </div>
              </div>
              <p className="pt-2 font-Poppins text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reiciendis obcaecati placeat aut et in ab hic ipsa molestiae
                quidem itaque porro voluptatem dicta ad, incidunt iusto alias
                laudantium eum. Cum, cumque in. Illo voluptatum minus
                repudiandae enim deleniti, impedit facilis! Nihil magnam amet
                sit reiciendis quas libero facere eveniet molestiae qui?
                Obcaecati perferendis.
              </p>
            </div>

            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px: flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-[600]">
                  Joined on: <span className="font-[400]">14, March 2022</span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total products:{" "}
                  <span className="font-[400]">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-[600] pt-3">
                  Total reviews: <span className="font-[400]">{totalReviewsLength}</span>
                </h5>
                <Link to="/">
                  <div
                    className={`${styles.hero_button} hover:bg-[#201668] transition-all duration-300 h-[39.5px] mt-5 tracking-wide`}
                  >
                    <h4 className="text-white font-Poppins">Visit shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetailsInfo;
