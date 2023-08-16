import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AppContext } from "@/Context/AppContext";
import ShopCartProduct from "@/components/ProductCartDetail";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const MyOrder = () => {
  const { orders } = useContext(AppContext);
  const { orderId } = useParams();

  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    if (orders.length) {
      if (orderId) {
        setCurrentOrder(() => orders.find((c) => c?.id === orderId));
      } else {
        setCurrentOrder(() => orders[0]);
      }
    }
  }, [orderId]);

  if (!Object.keys(currentOrder).length) return;

  return (
    <main className="p-4 text-gray-700">
      <div className="container max-w-screen-xl m-auto">
        <div className="m-auto w-full max-w-2xl py-6">
          <div className="mb-4 flex items-center justify-between gap-3 text-3xl font-bold">
            <p className="flex items-center gap-4 self-stretch text-2xl">Hello, Fredy</p>
            <NavLink
              to="/my-orders"
              className="mb-1 flex max-w-max items-center gap-2 rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-white"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Back
            </NavLink>
          </div>
          <div className="mb-4 space-y-3">
            {!!currentOrder?.products?.length &&
              currentOrder.products.map((product) => (
                <ShopCartProduct key={product.id} {...product} readonly />
              ))}
          </div>
          <div className="mb-5 flex items-center justify-between font-bold">
            <span>Total import</span>
            <p className="text-lg">$ {Number(currentOrder.total).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyOrder;
