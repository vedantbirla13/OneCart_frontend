import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/products/ProductDetails.jsx";
import SuggestedProducts from "../components/SuggestedProducts/SuggestedProducts.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.events);

  const { id } = useParams();
  const [data, setData] = useState();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allProducts, allEvents]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && (
        <>
         { data && <SuggestedProducts data={data} />}
        </>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
