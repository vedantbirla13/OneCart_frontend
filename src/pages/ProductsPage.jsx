import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import hanger from "../assets/hanger.png";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const ProductsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts && allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }

    // window.scrollTp(0,0)
  }, [allProducts]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div
              className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px]
         xl:grid-cols-5 xl:gap-[30px] mb-12"
            >
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>

            {data && data.length === 0 ? (
              <div className="flex flex-col items-center">
                <img src={hanger} alt="" width="500" />
                <h1 className="text-center w-full pb-[10px] text-[30px] font-Poppins font-light tracking-wide">
                  We couldn't find any matches!!
                </h1>
                <p className="text-gray-400 pb-[20px]">
                  Please check the spelling or try searching something else
                </p>
                <p className="text-gray-500">
                  {" "}
                  <span className="text-gray-600  font-Roboto">
                    Popular searches:
                  </span>{" "}
                  Nike Shoes,Woodland Shoes,Adidas Shoes,Titan Watches,Fila
                  Shoes,Puma Shoes,Fastrack Watches{" "}
                </p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
