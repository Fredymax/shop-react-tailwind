import React, { useContext, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AppContext } from "@/Context/AppContext";

const ProductDetail = () => {
  const { toggleProductDetail, product } = useContext(AppContext);

  const { title, description, price, images = [] } = product;
  const [image] = images;

  function handleKeypress(ev) {
    if (ev.key !== "Escape") return;
    toggleProductDetail();
  }

  useEffect(() => {
    document.addEventListener("keyup", handleKeypress);
    return () => document.removeEventListener("keyup", handleKeypress);
  }, []);

  return (
    <div
      className="fixed z-10 flex min-w-[100vw] justify-start bg-black/30 top-[129.5px] h-[calc(100vh-129.5px)]
      md:top-[74.25px] md:h-[calc(100vh-74.25px)]"
    >
      <aside className="w-full max-w-[23em] bg-white px-6 py-3 text-gray-600">
        <h3 className="mb-4 font-medium text-gray-700">
          Product detail
          <button className="float-right" onClick={toggleProductDetail}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </h3>
        <figure className="w-full text-start">
          <img className="w-full rounded" src={image} alt={product?.title} />
        </figure>
        <div className="mb-2 py-2">
          <p className="mb-2 font-bold">{title}</p>
          <p className="text-light text-sm">{description}</p>
        </div>
        <h4 className="text-2xl font-bold">${price}</h4>
      </aside>
    </div>
  );
};

export default ProductDetail;
