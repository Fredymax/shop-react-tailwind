import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '@/Context/AppContext'
import { ShoppingCartIcon, BarsIcon } from '@/Icons'
import { ReactComponent as SignOutIcon } from '@/assets/sign-out.svg'
import { MagnifyingGlassIcon } from '@/Icons'
import { toSlug } from '@/utils/strings'
import { useAuth } from '@/Hooks/useAuth'

import { NavLink } from 'react-router-dom'

const navRight = [
  {
    text: 'My Orders',
    to: '/my-orders',
  },
  {
    text: 'My Account',
    to: '/my-account',
  },
]

const NavBar = () => {
  const {
    countProducts,
    toggleShopCart,
    categories,
    toggleMenuCategories,
    openMenuCategories,
    params,
    setParams,
    setOpenMenuCategories,
  } = useContext(AppContext)
  const { logout } = useAuth()
  const menuContainerRef = useRef(null)

  const buttonCategoryStyled = openMenuCategories ? 'bg-gray-700 text-white' : 'border-gray-700 text-gray-700'

  const handleSearch = (ev) => {
    setParams((prev) => ({
      ...prev,
      title: ev.target.value,
    }))
  }

  function clickOutside(ev) {
    if (!menuContainerRef.current?.contains(ev.target)) setOpenMenuCategories(false)
  }

  useEffect(() => {
    if (openMenuCategories) window.addEventListener('click', clickOutside, true)

    return () => window.removeEventListener('click', clickOutside)
  }, [openMenuCategories])

  const buildClassIsActive = ({ isActive }) =>
    (isActive ? '!bg-gray-700 text-white' : '') + ' block p-2.5 rounded-lg hover:bg-gray-50 capitalize'

  return (
    <header className="sticky top-0 z-20 bg-white p-4 shadow-sm text-gray-700">
      <div className="container max-w-screen-xl mx-auto">
        <nav className="md:flex items-center justify-between text-xs sm:text-sm">
          <ul className="flex justify-between sm:justify-start items-center gap-8 self-stretch font-bold mb-4 md:mb-0">
            <li className="text-2xl uppercase">
              <NavLink to="/">Shop</NavLink>
            </li>
            <li className="relative h-full">
              <button
                type="button"
                onClick={toggleMenuCategories}
                className={`flex h-full items-center gap-3 rounded border px-4 py-2 text-sm ${buttonCategoryStyled} rotate-180 sm:rotate-0`}
              >
                <BarsIcon className="h-5 w-5" />
                <span className="hidden sm:block">Categories</span>
              </button>
              {openMenuCategories && (
                <div ref={menuContainerRef} className={`absolute right-0 sm:left-0 top-full z-10 mt-2`}>
                  <div className="w-screen max-w-xs flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4 space-y-2">
                      <div>
                        <NavLink to="/" onClick={() => setOpenMenuCategories(false)} className={buildClassIsActive}>
                          Home
                        </NavLink>
                      </div>
                      {categories.map((nav, index) => (
                        <div key={index}>
                          <NavLink
                            to={`/category/${toSlug(nav.name.toString().toLowerCase())}`}
                            onClick={() => setOpenMenuCategories(false)}
                            className={buildClassIsActive}
                          >
                            {nav.name}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="hidden sm:block">
              <div className="flex w-[300px] items-center rounded border border-gray-700 text-gray-700">
                <label className="px-2 text-gray-500" htmlFor="input-search">
                  <MagnifyingGlassIcon className="select-none opacity-50 " />
                </label>
                <input
                  type="search"
                  id="input-search"
                  onChange={handleSearch}
                  value={params.title}
                  placeholder="Search product"
                  className="flex-1 rounded py-2 pe-3 text-sm font-normal text-gray-500 outline-none placeholder:opacity-70 placeholder:transition-opacity focus:placeholder:opacity-0"
                />
              </div>
            </li>
          </ul>
          <ul className="flex items-center gap-3 self-stretch text-sm font-bold justify-between md:justify-end">
            {navRight.map((nav, index) => (
              <li className="h-full" key={index}>
                <NavLink to={nav.to} className={buildClassIsActive}>
                  {nav.text}
                </NavLink>
              </li>
            ))}
            {/* <li className="h-full">
              <button type="button" onClick={logout} className="flex gap-1 items-center p-2 rounded hover:bg-gray-50">
                Log out
                <SignOutIcon className="hidden sm:inline w-5 h-5" />
              </button>
            </li> */}
            <li>
              <button onClick={toggleShopCart} className="w-full flex justify-center gap-2">
                <ShoppingCartIcon className="inline" />
                <span className="font-bold">{countProducts}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
