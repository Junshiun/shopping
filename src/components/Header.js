import "../css/Header.css"
import { CgShoppingCart } from "react-icons/cg"
import { RiArrowDownSLine} from "react-icons/ri"
import { BsSearch} from "react-icons/bs"
import {Link} from "react-router-dom"
import { useNavigate, useLocation } from 'react-router-dom';
import { CartState } from "../context/Context"
import { REMOVE_FROM_CART } from "../context/Reducer"
import { useEffect, useState, useRef} from 'react';

const Header = () => {
    const {state: {cart, category}, dispatch} = CartState();

    const [cartbox, setcartbox] = useState("hide");

    const [height, setheight] = useState(0);

    const history = useNavigate();

    const menu = useRef(null);

    const location = useLocation().pathname;

    //console.log(location);

    const updateCartbox = () => {
        if (cartbox === "hide"){
            setcartbox("show");
        }
        else{
            setcartbox("hide");
        }
    }

    const closeOpenMenus = (e)=>{
        if(!menu.current.contains(e.target)){
          document.getElementById("options").classList.add("hide")
        }
    }

    useEffect (() => {
        setheight(document.getElementById("measure-height").clientHeight);
        if (cartbox == "show")
            document.getElementById("cart-box").style.height = (height + ((cart.length>0)? 48:16)) + "px";
        else
            document.getElementById("cart-box").style.height = 0 + "px";
    })

    useEffect(() => {
        document.addEventListener('mousedown',closeOpenMenus)
    }, [])

    function handleCategories(e) {
        if (e.target.getAttribute("value") !== category){
            history("/shopping" + "?category=" + e.target.getAttribute("value"));
            history(0);
        }
    }

    function handleClass () {
        document.getElementById("options").classList.toggle("hide")
    }

    return (
        <header id="header">
            <h1 id="title" onClick={() => {history("/shopping"); history(0)}}>Shop</h1>
            <form id="form">
                {(location === "/shopping" ||
                  location === "/shopping/")?
                <div onClick={handleClass} id="categories" ref={menu}>
                    <div className="categories-main">
                        {category==="none"? "Categories": category}
                    </div>
                    <div id="options" className="options hide">
                        <a value="electronics" onClick={handleCategories} className="option">electronics</a>
                        <a value="jewelery" onClick={handleCategories} className="option">jewelery</a>
                        <a value="men's clothing" onClick={handleCategories}className="option">men's clothing</a>
                        <a value="women's clothing" onClick={handleCategories} className="option">women's clothing</a>
                    </div>
                    <RiArrowDownSLine className="categories-arrow" color="white"  fontSize="20px" ></RiArrowDownSLine>
                </div>
                :
                <div ref={menu}>
                    <div id="options"></div>
                </div>}
                {/*<select id="category-select" className="form-select form-select-sm form-control" value={category} onChange={handleCategories} aria-label=".form-select-sm">
                    <option value="none" disabled className="categories">Categories</option>
                    <option value="electronics">electronics</option>
                    <option value="jewelery">jewelery</option>
                    <option value="men's clothing">men's clothing</option>
                    <option value="women's clothing">women's clothing</option>
                </select>*/}
                {/*<BsSearch id="search-btn" color="white"></BsSearch>*/}
            </form>
            <div id="cart-container">
                <div className="cart-icon" onClick={updateCartbox}>
                    <CgShoppingCart color="white" fontSize="25px">
                    </CgShoppingCart>
                    {(cart.length>0)?
                        (<div className="amount">{cart.length}</div>) : (<div></div>)}
                </div>
                <div className="dropdown">
                    <RiArrowDownSLine className={"arrow " + cartbox} onClick={updateCartbox} color="white" fontSize="25px" ></RiArrowDownSLine>
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
                        })}</div><button className="checkout" onClick={() => history("/shopping/Cart")}>go to cart</button></div>): (<div id="cart-box" className={"cart-box " + cartbox}><div id="measure-height"><div className="empty-box">your cart is empty</div></div></div>)}
                </div>
            </div>
        </header>
    );
}

export default Header;