import "../css/Cart.css"
import { CartState } from "../context/Context";
import { RiDeleteBinFill } from "react-icons/ri";
import { ADD_QUANTITY, MINUS_QUANTITY, CHANGE_QUANTITY_KEY, CHANGE_QUANTITY_BLUR, REMOVE_FROM_CART} from "../context/Reducer";
import { useState } from "react"; 

const Cart = () => {
    return (
        <div id="cart">
            <Cart_content />
            <Checkout />
        </div>
    );
}

const Cart_content = () => {
    const {state: {cart}, dispatch} = CartState();

    return (
        <div id="cart-content">
            {cart.map(item => {
                return (
                <div className="item-container" key={item.id}>
                    <img src={item.image}></img>
                        <div className="item-details">
                            <div className="item-info">
                                <span>{item.name}</span>
                                <span>RM {item.price}</span>
                                <span>stocks left: {item.inStock}</span>
                            </div>
                            <div className="quantity-box">
                                <button className="minus" onClick={() => dispatch({type:MINUS_QUANTITY, product: {id: item.id}})}>-</button>
                                <input className="quantity"  type="number" value={item.quantity} onChange={e => dispatch({type: CHANGE_QUANTITY_KEY, product:{id: item.id, quantity: e.target.value}})}
                                onBlur={e => dispatch({type: CHANGE_QUANTITY_BLUR, product: {id: item.id, quantity: e.target.value}})} min="1" max={item.inStock}></input>
                                <button className="plus" onClick={() => dispatch({type: ADD_QUANTITY, product: {id: item.id}})}>+</button>
                            </div>
                        </div>
                    <div className="delete-column">
                        <button onClick={() => dispatch({type: REMOVE_FROM_CART, product: {id: item.id}})}>
                            <RiDeleteBinFill fontSize="1.5em"></RiDeleteBinFill>
                        </button>
                    </div>
                    <div className="item-sum">RM {eval(item.price*item.quantity)}</div>
                </div>
                )}
            )}
        </div>
    )
}

const Checkout = () => {
    const {state: {cart}, dispatch} = CartState();

    let total = cart.reduce((total, currentValue) => {
    return (total + currentValue.price * currentValue.quantity)}, 0);

    /*{cart.map(item => {
        return (
            <div className="checkout-item" key={"item-" + item.id}>
                <span>{item.name}</span>
                <span>RM {item.price} x {item.quantity} = {eval(item.price*item.quantity)}</span>
            </div>
        )
    })}*/

    return (
        (cart.length>0)? (<div id="checkout-content"><span className="total">Total: RM {total}</span>
        <button className="btn btn-primary">Checkout</button></div>):(<div id="checkout-content"><span className="total">your cart is empty</span></div>)
    )
}

export default Cart