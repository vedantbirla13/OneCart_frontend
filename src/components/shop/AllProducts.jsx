import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import  Loader  from "../../components/Layout/Loader"
import { Link } from "react-router-dom";
import Table from "../Table/Table";

  
 
const AllProducts = () => {

  const { isLoading, products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
    window.location.reload(true)
  }

  const columns = [
    { field: "id", headerName: "Product Id"},
    {
      field: "name",
      headerName: "Name",

    },
    {
      field: "price",
      headerName: "Price",

    },
    {
      field: "Stock",
      headerName: "Stock",

    },

    {
      field: "sold",
      headerName: "Sold out",

    },
    {
      field: "Preview",
      headerName: "",
      renderCell: (params) => {
        // const d = params.data.name;
        // const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      headerName: "",
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20}  />
            </Button>
          </>
        );
      },
    },
  ];

  const data = [];

  products && products.forEach((item) => {
    data.push({
        id: item._id,
        name: item.name.slice(0,50) + "...",
        price: "INR₹ " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
    });
  });

  return (
    <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <Table 
                        data={data}
                        columns={columns}
                    />

               
                </div>
            )            
        }
    </>
  );
};

export default AllProducts;
