import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import ProductDetail from "@components/ProductDetail";
import ShopCart from "@components/ShopCart";
import { AppContext } from "@/Context/AppContext";

const LayoutApp = () => {
  const { openProductDetail, openShopCart } = useContext(AppContext);
  return (
    <>
      <Navbar />
      {openShopCart && <ShopCart />}
      {openProductDetail && <ProductDetail />}
      <Outlet />
    </>
  );
};

export default LayoutApp;
