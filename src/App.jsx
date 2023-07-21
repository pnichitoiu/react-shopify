import Header from  './components/Header'
 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/pages/Homepage'
import AboutUs from './components/pages/AboutUs'
import Contact from './components/pages/Contact'
import ProductList from './components/ProductList'
import Wrapper from './components/UI/Wrapper';
import ProductView from './components/ProductView';
import Cart from './components/Cart';
import { CartContext } from './store/CartContext'
import { useContext } from 'react'
import Footer from './components/Footer'

const App = () => {

  const cart = useContext(CartContext);
  cart.initCheckout();

  return (
    <BrowserRouter>
      <Header />
      <Cart />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/products/:productId" element={<ProductView />} />
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
