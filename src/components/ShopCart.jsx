import React, { useContext, useEffect } from "react";
import { CloseIcon } from "@/Icons";
import { AppContext } from "@/Context/AppContext";
import ShopCartProduct from "@/components/ProductCartDetail";
import { ReactComponent as EmptyCartSvg } from "@/assets/empty-cart.svg";

import { useNavigate } from "react-router-dom";

const ShopCart = () => {
  const navigate = useNavigate();
  const { cart, countProducts, toggleShopCart, setOrders, setCart } = useContext(AppContext);

  function handleKeypress(ev) {
    if (ev.key !== "Escape") return;
    toggleShopCart();
  }

  useEffect(() => {
    document.addEventListener("keyup", handleKeypress);
    return () => document.removeEventListener("keyup", handleKeypress);
  }, []);

  const checkoutHandleClick = () => {
    const newOrder = {
      id: crypto.randomUUID(),
      products: cart,
      total: cart.reduce((acc, item) => acc + item.price, 0),
      createdAt: Date.now(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    toggleShopCart();
    navigate("my-order");
  };

  const clearCartHandleClick = () => {
    setCart([]);
  };

  return (
    <div
      className="fixed z-20 flex min-w-[100vw] justify-end bg-black/30 top-[129.5px] h-[calc(100vh-129.5px)]
      md:top-[74.25px] md:h-[calc(100vh-74.25px)]"
    >
      <aside className="flex w-full max-w-[26em] flex-col justify-between bg-white px-6 py-3 text-gray-600">
        <div>
          <h3 className="mb-6 text-lg font-bold">
            Shopping Cart
            <button className="float-right" onClick={toggleShopCart}>
              <CloseIcon className="text-gray-500" />
            </button>
          </h3>
          {!!cart.length && (
            <p className="mb-2 flex justify-between text-xs">
              <button
                className="font-bold tracking-wider text-gray-400"
                onClick={clearCartHandleClick}
              >
                CLEAR
              </button>
              <span className="font-bold">( {countProducts} ) PRODUCTS</span>
            </p>
          )}
          <div className="flex max-h-[60vh] flex-col gap-3 overflow-auto px-1 pb-2">
            {!!cart.length ? (
              cart.map((product) => <ShopCartProduct key={product.id} {...product} />)
            ) : (
              <div className="m-auto flex flex-col gap-4 text-center">
                <EmptyCartSvg className="m-auto h-40 w-40" />
                <p className="text-sm font-light text-gray-400">Cart empty</p>
              </div>
            )}
          </div>
        </div>
        <button
          className="flex w-full items-center justify-between rounded border bg-gray-800 p-3 text-xs font-bold uppercase tracking-widest text-white disabled:bg-gray-400"
          onClick={checkoutHandleClick}
          disabled={!cart.length}
        >
          <span>Checkout</span>
          <span className="text-lg">
            $ {Number(cart.reduce((acc, item) => acc + item.price, 0)).toFixed(2)}
          </span>
        </button>
      </aside>
    </div>
  );
};

export default ShopCart;
