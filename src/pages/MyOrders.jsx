import React, { useContext } from "react";
import { AppContext } from "@/Context/AppContext";
import { NavLink } from "react-router-dom";
import { formatDate } from "@/utils/date";
import { ShoppingBagIcon } from "@/Icons";

const MyOrders = () => {
  const { orders } = useContext(AppContext);

  return (
    <main className="p-4 text-gray-700">
      <div className="container max-w-screen-xl m-auto">
        <div className="m-auto w-full max-w-2xl py-6 space-y-3">
          <p className="text-2xl font-bold mb-4">My orders</p>
          {!!orders.length
            ? orders.map((order) => (
                <div
                  className="flex flex-1 translate-x-0 rounded-md border shadow-md transition-transform hover:translate-x-1"
                  key={order.id}
                >
                  <div className="flex flex-1 items-center p-3">
                    <div className="flex-1 text-xs">
                      <div className="flex font-medium">
                        <span className="inline-flex items-center w-max rounded-md bg-green-300 p-2">
                          <ShoppingBagIcon />
                        </span>
                        <p className="ps-2">
                          <span className="mb-1 block">
                            Order:
                            <NavLink
                              to={`/my-order/${order.id}`}
                              className="ps-1 text-xs underline hover:text-blue-500"
                            >
                              {order.id}
                            </NavLink>
                          </span>
                          <span className="font-light text-gray-500">
                            {formatDate(new Date(order.createdAt))}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-end">
                      <span className="text-xs font-medium tracking-wider">
                        {order.products.length} Items
                      </span>
                      <strong>$ {Number(order.total).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </main>
  );
};

export default MyOrders;
