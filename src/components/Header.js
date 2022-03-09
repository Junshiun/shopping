import "../css/Header.css"
import { CgShoppingCart } from "react-icons/cg"
import { RiArrowDownSLine} from "react-icons/ri"
import { BsSearch} from "react-icons/bs"
import {Link} from "react-router-dom"
import { useNavigate, useSearchParams} from 'react-router-dom';
import { CartState } from "../context/Context"
import { REMOVE_FROM_CART } from "../context/Reducer"
import { useEffect, useState } from 'react';

const Header = () => {
    const {state: {cart, category}, dispatch} = CartState();

    const [cartbox, setcartbox] = useState("hide");

    const [height, setheight] = useState(0);

    const history = useNavigate();

    const updateCartbox = () => {
        if (cartbox === "hide"){
            setcartbox("show");
        }
        else{
            setcartbox("hide");
        }
    }

    useEffect (() => {
        setheight(document.getElementById("measure-height").clientHeight);
        if (cartbox == "show")
            document.getElementById("cart-box").style.height = (height + ((cart.length>0)? 48:16)) + "px";
        else
            document.getElementById("cart-box").style.height = 0 + "px";
    })

    function handleCategories(e) {
        history("/" + "?category=" + e.target.value);
        history(0);
    }

    return (
        <header id="header">
            <h1 id="title" onClick={() => {history("/"); history(0)}}>Shop</h1>
            <form id="form">
                <select value={category} onChange={handleCategories}>
                    <option value="none" disabled></option>
                    <option value="electronics">electronics</option>
                    <option value="jewelery">jewelery</option>
                    <option value="men's clothing">men's clothing</option>
                    <option value="women's clothing">women's clothing</option>
                </select>
                {/*<BsSearch id="search-btn" color="white"></BsSearch>*/}
            </form>
            <div id="cart-container">
                <div className="cart-icon">
                    <CgShoppingCart color="white" fontSize="25px">
                    </CgShoppingCart>
                    {(cart.length>0)?
                        (<div className="amount">{cart.length}</div>) : (<div></div>)}
                </div>
                <div className="dropdown">
                    <RiArrowDownSLine className={"arrow " + cartbox} color="white"  fontSize="25px" onClick={updateCartbox}></RiArrowDownSLine>
                        {(cart.length > 0)?
                        (<div id="cart-box" className={"cart-box " + cartbox}><div id="measure-height">
                            {cart.map((element) => {
                            return (
                                <div id="item-box" className="item-box" key={element.id}>
                                    <img src={element.image}></img>
                                    <div className="description"><span>{element.name}</span>
                                    <span>RM {element.price}</span>
                                    </div>
                                    <button onClick={() => dispatch({type: REMOVE_FROM_CART, product: {id: element.id}})}>remove</button>
                                </div>
                            )
                        })}</div><button className="checkout" onClick={() => history("/Cart")}>go to cart</button></div>): (<div id="cart-box" className={"cart-box " + cartbox}><div id="measure-height"><div className="empty-box">your cart is empty</div></div></div>)}
                </div>
            </div>
        </header>
    );
}

export default Header;