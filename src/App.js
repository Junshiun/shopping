import './App.css';
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import Cart from "./components/Cart.js";
import Footer from "./components/Footer.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StripeContainer from './components/StripeContainer';
import Contex from "./context/Context.js"

function App() {
  return (
    <BrowserRouter>
      <Contex>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home />}>
        </Route>
        <Route path="/cart" exact element={<Cart/>}>
        </Route>
        <Route path="/paymentform" exact element={<StripeContainer />}>
        </Route>
      </Routes>
      <Footer />
      </Contex>
    </BrowserRouter>
  );
}

export default App;
