import { createContext, useState, useEffect } from 'react'
import { useProducts } from '@/Hooks/useProducts'
import { useCategories } from '@/Hooks/useCategories'

export const AppContext = createContext(null)

export default function AppProvider({ children }) {
  const { setParams, params, products, productLoading } = useProducts()
  const { categories } = useCategories()
  const [cart, setCart] = useState([])
  const [countProducts, setCountProducts] = useState(0)
  const [openProductDetail, setOpenProductDetail] = useState(false)
  const [openShopCart, setOpenShopCart] = useState(false)
  const [product, setProduct] = useState({})
  const [orders, setOrders] = useState([])
  const [openMenuCategories, setOpenMenuCategories] = useState(false)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { src } = entry.target.dataset
        entry.target.src = src
        entry.target.addEventListener('load', function () {
          this.classList.add('image-animation')
        })
        observer.unobserve(entry.target)
      }
    })
  })

  const toggleProductDetail = () => {
    if (openShopCart) setOpenShopCart(false)
    setOpenProductDetail((prev) => !prev)
  }

  const toggleShopCart = () => {
    if (openProductDetail) setOpenProductDetail(false)
    setOpenShopCart((prev) => !prev)
  }

  const toggleMenuCategories = () => {
    setOpenMenuCategories((prev) => !prev)
  }

  useEffect(() => {
    setCountProducts(cart.length)
  }, [cart])

  const provider = {
    setCart,
    cart,
    countProducts,

    toggleProductDetail,
    openProductDetail,

    toggleShopCart,
    openShopCart,

    setProduct,
    product,

    setOrders,
    orders,

    setParams,
    params,
    products,
    productLoading,

    setOpenMenuCategories,
    toggleMenuCategories,
    openMenuCategories,
    categories,

    observer,
  }

  return <AppContext.Provider value={provider}>{children}</AppContext.Provider>
}
