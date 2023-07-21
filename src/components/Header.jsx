
import { useSinglePrismicDocument } from '@prismicio/react'
import { Link } from 'react-router-dom'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CartContext } from '../store/CartContext'

const Header = () => {

  const cart = useContext(CartContext)
  const [menu] = useSinglePrismicDocument('menu')
  const [open, setOpen] = useState(false)
  
  return (
    <div className="bg-white">

      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {( menu && <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {menu.data.menu_links.map((menu_item, idx) => {
                      let url = menu_item.link.link_type  === 'Any' ? 'products' : menu_item.link.slug
                      return (
                        <div key={menu_item.label[0].text} className="flow-root">
                          <Link onClick={() => setOpen(false)} className="-m-2 block p-2 font-medium text-gray-900" key={idx} to={'/' + url}>{menu_item.label[0].text}</Link>
                        </div>
                      )
                  })}
                </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-blue-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over 100 LEI
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"  to="/">
                <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                </Link>
              </div>

              {/* Flyout menus */}
              {( menu && <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                {menu.data.menu_links.map((menu_item, idx) => {
                    let url = menu_item.link.link_type  === 'Any' ? 'products' : menu_item.link.slug
                    return (
                      <Link className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800" key={idx} to={'/' + url}>{menu_item.label[0].text}</Link>
                    )
                })}
                </div>
              </Popover.Group>)}

              <div className="ml-auto flex items-center">
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button onClick={() => cart.setMinicartOpen(true)} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.itemsQuantity}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header;