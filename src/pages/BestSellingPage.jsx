import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { productData } from "../static/data";
import styles from "../styles/styles";
import { useSelector } from "react-redux";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Loader from "../components/Layout/Loader";

const BestSellingPage = () => {

  const { allProducts, isLoading } = useSelector((state) => state.product)

    const [data, setData] = useState([]);

    useEffect(() => {
            const allProductsData = allProducts ? [...allProducts] : []
            const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out);
            setData(sortedData)
        // window.scrollTp(0,0)
    }, [allProducts])
    

  return (
    <div>
      {
        isLoading ? (
          <Loader />
        ) : (
          <> 
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px]
             xl:grid-cols-5 xl:gap-[30px] mb-12">
                {
                    data && data.map((i,index) => <ProductCard data={i} key={index} />)
                }
               
             </div>
    
          </div>
          </>
        )
      }
    
    </div>
  );
};

export default BestSellingPage;
