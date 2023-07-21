import { createContext, useState} from 'react';
import { ShopifyClient } from '../components/shopify/ShopifyClient';

export const CartContext = createContext({
  items: [],
  itemsQuantity: 0,
  minicartOpen: () => {},
  setMinicartOpen: (state) => {},
  loading: () => {},
  setLoading: (state) => {},
  addItemToCart : (id, quantity) => {}, 
  removeItemFromCart: (id) => {},
  updateItemInCart: (id, quantity) => {},
  checkout: () => {},
  initCheckout: () => {}
});


export const CartProvider = ({children}) => {

  const [minicartOpen, setMinicartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cartProducts, setCartProducts] = useState([])
  const [checkout, setCheckout] = useState({})


  const addItemToCart = (id, quantity) => {
    const lineItemsToAdd = [{variantId: id, quantity: parseInt(quantity, 10)}]
    const checkoutId = checkout.id

    return ShopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd).then(result => {
      setCheckout(result);
      setCartProducts(result.lineItems);
      setMinicartOpen(true);
    });
  }

  const removeItemFromCart = (id) => {
    const lineItemIdsToRemove = [id];
    const checkoutId = checkout.id;

    return ShopifyClient.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then(result => {
      setCheckout(result);
      setCartProducts(result.lineItems);
      setLoading(false);
    });
  }

  const updateItemInCart = (id, quantity) => {
    const lineItemsToUpdate = [{id, quantity: parseInt(quantity, 10)}];
    const checkoutId = checkout.id;

    return ShopifyClient.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(result => {
      setCheckout(result);
      setCartProducts(result.lineItems);
      setLoading(false);
    });
  }

  const initCheckout = () => {
    if (checkout.id) {
      return;
    }

    const checkoutId = localStorage.getItem('checkout_id');

    if (checkoutId) {
      ShopifyClient.checkout.fetch(checkoutId).then((result) => {
        setCheckout(result);
        setCartProducts(result.lineItems);
      });
      return;
    }

    ShopifyClient.checkout.create().then((checkout) => {
      localStorage.setItem('checkout_id', checkout.id);
      setCheckout(checkout);
    });
  }


  const contextValue = {
    items: cartProducts,
    itemsQuantity: cartProducts.reduce((total, item) => total + item.quantity, 0),
    minicartOpen,
    setMinicartOpen,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
    initCheckout,
    checkout,
    loading,
    setLoading
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
