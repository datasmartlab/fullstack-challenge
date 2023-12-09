import React, { useEffect, useState } from "react";

import ProductsList from "./ProductsList";
import { useDispatch } from "react-redux";
import { addProductToList } from "../../redux/product/actions";

function Product() {
  const dispatch = useDispatch();
  const [Getdata, setGetData] = useState([]);

  useEffect(
    () => async () => {
      try {
        const path = "http://localhost:3001";
        const _route = "/products";

        const data = await fetch(path + _route);
        const resData = await data.json();
        setGetData(resData);
        dispatch(addProductToList(resData));
        return resData;
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  return (
    <>
      <ProductsList />
    </>
  );
}

export default Product;
