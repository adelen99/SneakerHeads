import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  Cart,
  Home,
  About,
  Products,
  SingleProduct,
  Checkout,
  Contact,
  Error,
} from "./Pages";
import { SneakerDataProvider } from "./context/sneakers_context";
import { CartContextProvider } from "./context/cart_context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <React.StrictMode>
      <Auth0Provider
        domain='dev-w8do6587lb4jqnin.us.auth0.com'
        clientId='Bb2ivUtzuDzrqw4tkavMBvGBUsHslFtr'
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}>
        <SneakerDataProvider>
          <CartContextProvider>
            <Router>
              <Navbar />
              <TransitionGroup>
                <CSSTransition classNames='page-transition' timeout={300}>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/products/:id' element={<SingleProduct />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/*' element={<Error />} />
                  </Routes>
                </CSSTransition>
              </TransitionGroup>
            </Router>
            <ToastContainer position='top-center' />
          </CartContextProvider>
        </SneakerDataProvider>
      </Auth0Provider>
    </React.StrictMode>
  );
}

export default App;
