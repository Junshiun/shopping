import './App.css';
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import Cart from "./components/Cart.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home />}>
        </Route>
        <Route path="/cart" exact element={<Cart/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
