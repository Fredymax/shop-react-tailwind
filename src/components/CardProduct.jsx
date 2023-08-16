import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "@/Context/AppContext";
import { PlusIcon, CheckIcon } from "@/Icons";
import DefaultImage from "@/assets/default.png";

const CardProduct = (product) => {
  const $image = useRef(null);
  const { title, price, images, category } = product;
  const { setCart, toggleProductDetail, setProduct, cart, observer } = useContext(AppContext);
  const [image] = images;

  const addProductToCart = (ev) => {
    ev.stopPropagation();
    setCart((prev) => {
      const productExistsTheCart = prev.some((c) => c.id === product.id);
      if (productExistsTheCart) return prev;
      return [...prev, product];
    });
  };

  const showProductDetail = () => {
    setProduct(product);
    toggleProductDetail();
  };

  const RenderIcon = () => {
    const existsToCart = cart.some(({ id }) => id === product.id);
    if (existsToCart) {
      return (
        <button className="absolute right-2 top-2 rounded-full bg-gray-500 p-2 text-white">
          <CheckIcon />
        </button>
      );
    } else {
      return (
        <button
          onClick={addProductToCart}
          className="absolute right-2 top-2 rounded-full bg-white p-0.5 text-gray-500"
        >
          <PlusIcon />
        </button>
      );
    }
  };

  useEffect(() => {
    if (!$image) return;
    observer.observe($image.current);
  }, []);

  return (
    <div
      className="w-full cursor-pointer overflow-hidden rounded-md shadow-lg"
      onClick={showProductDetail}
    >
      <div className="relative">
        <RenderIcon />
        <figure className="card__image h-[200px]">
          <img
            ref={$image}
            alt={title}
            className="h-full w-full object-cover"
            data-src={image}
            onError={(ev) => (ev.target.src = "/images/product-default.png")}
          />
        </figure>
      </div>
      <div className="flex items-center justify-between px-3 py-4 text-gray-700">
        <p className="flex flex-col">
          <span className="text-xs font-bold capitalize">{category?.name}</span>
          <span className="product__title block font-light">{title}</span>
        </p>
        <p className="text-lg font-bold">$ {Number(price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CardProduct;
