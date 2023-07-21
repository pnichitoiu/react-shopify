import { useContext } from "react";
import { PriceFormat } from "./shopify/PriceFormat";
import { CartContext } from "../store/CartContext";


const LineItem = (props) => {

  const cart = useContext(CartContext);
  const item = props.item
  const itemPrice = () => {
    return PriceFormat(item.variant.price.amount * item.quantity);
  }

  const incrementQty = (e) => {
    e.preventDefault();
    if (item.quantity === 20) return false;
    cart.setLoading(true);
    cart.updateItemInCart(item.id, item.quantity + 1);
  }

  const decrementQty = (e) => {
    e.preventDefault();
    if (item.quantity === 1) return false;
    cart.setLoading(true);
    cart.updateItemInCart(item.id, item.quantity - 1);
  }

  const removeItem = (e) => {
    e.preventDefault();
    cart.setLoading(true);
    cart.removeItemFromCart(item.id)
  }

  const showSize = () => {
    return item.variant.title !== "Default Title"
  }


  return (
    <li key={item.id.match(/\d+/).join()} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.variant.image.src}
          alt={item.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              {item.title}
            </h3>
            <p className="ml-4">{itemPrice()}</p>
          </div>
          { showSize() && (
            <div className="text-sm"> Size: {item.variant.title}</div>
            )}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex mt-4 flex-row h-10 rounded-lg relative bg-transparent mt-1 border-2">
            <button data-action="decrement" onClick={decrementQty} className="h-full w-10 rounded-l cursor-pointer">
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <span className="appearance-none outline-none focus:outline-none text-center font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700">
              {item.quantity}
            </span>
            <button data-action="increment" onClick={incrementQty}  className="h-full w-10 rounded-r cursor-pointer">
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={removeItem}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )

}

export default LineItem;