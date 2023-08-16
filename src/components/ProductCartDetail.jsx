import React, { useContext } from "react";
import { AppContext } from "@/Context/AppContext";
import { TrashIcon } from "@/Icons";

const ShopCartProduct = ({ id, title, price, images = [], category, readonly = false }) => {
  const [image] = images;

  const { setCart } = useContext(AppContext);

  const handleDestroyProductToCart = () => {
    setCart((prev) => {
      return prev.filter((c) => c.id !== id);
    });
  };

  return (
    <div className="flex flex-1 translate-x-0 items-center rounded-lg p-1 shadow-md transition-transform hover:translate-x-1">
      <figure className="h-[70px] w-[70px]">
        <img
          className="h-full w-full rounded object-cover"
          src={image}
          alt={title}
          onError={(ev) => (ev.target.src = "/images/product-default.png")}
        />
      </figure>
      <div className="flex flex-1 items-center p-1 px-3">
        <div className="flex-1 self-stretch text-sm">
          <p className="text-xs font-bold capitalize">{category.name}</p>
          <p className="mb-1 font-light">{title}</p>
        </div>
        <div className="flex flex-col text-end">
          {!readonly && (
            <button
              className="ms-auto text-gray-400 hover:text-red-400"
              onClick={handleDestroyProductToCart}
            >
              <TrashIcon />
            </button>
          )}
          <strong className="text-gray-700">$ {Number(price).toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default ShopCartProduct;
