import { useEffect, useState } from "react";
import axios from "@/utils/axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [params, setParams] = useState({
    // limit: 20,
    // offset: 200,
    title: "",
    categoryId: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/products", { params });
      setProducts(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [params]);

  return {
    setParams,
    products,
    params,
    loading,
    error,
  };
};
