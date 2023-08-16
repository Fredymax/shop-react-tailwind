import React, { useContext, useEffect } from "react";
import { AppContext } from "@/Context/AppContext";
import { toSlug } from "@/utils/strings";

import CardProduct from "@/components/CardProduct";
import CardSkeleton from "@/components/CardSkeleton";
import NoProductsFound from "@/components/NoProductsFound";

import { useParams } from "react-router-dom";

const Home = () => {
  const { products, productLoading, setParams, categories } = useContext(AppContext);
  const { category } = useParams();

  useEffect(() => {
    if (!categories.length) return;
    const currentCategory = categories.find((item) => toSlug(item.name) == category);
    setParams((prev) => ({
      ...prev,
      categoryId: category ? currentCategory.id : null,
    }));
  }, [category, categories]);

  return (
    <main className="p-4 text-gray-700">
      <div className="container max-w-screen-xl m-auto">
        <h1 className="mb-4 text-2xl font-bold capitalize">
          {(category && category.replaceAll("-", " ")) || "Home"}
        </h1>
        {productLoading ? (
          <CardSkeleton repeat={8} />
        ) : !productLoading && !!products.length ? (
          <section className="grid gap-5 grid-cols-1 md:grid-cols-4">
            {products.map((product) => (
              <CardProduct key={product.id} {...product} />
            ))}
          </section>
        ) : (
          <NoProductsFound />
        )}
      </div>
    </main>
  );
};

export default Home;
