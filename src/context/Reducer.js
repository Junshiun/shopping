export const ADD_TO_CART = "add";
export const REMOVE_FROM_CART = "remove";
export const CHANGE_QUANTITY_KEY = "change quantity onchange";
export const CHANGE_QUANTITY_BLUR = "change quantity onblur";
export const ADD_QUANTITY = "add quantity";
export const MINUS_QUANTITY = "minus quantity";
export const SORT_BY_PRICE = "sort by price";
export const SORT_BY_STOCK = "sort by stock";
export const SORT_BY_DELIVERY = "sort by delivery";
export const SORT_BY_RATING = "sort by ratings";
export const CLEAR_FILTER = "clear filter";

export const CartReducer = (state, action) => {

    switch (action.type){
        case ADD_TO_CART:
            return {products: state.products, cart: state.cart.concat(action.product)}
        case REMOVE_FROM_CART:
            return {...state, cart: state.cart.filter(element => {return (element.id !== action.product.id)})}
        case CHANGE_QUANTITY_KEY:
            return {...state, cart: state.cart.map(item => {
                if(item.id == action.product.id){
                    item.quantity = action.product.quantity;
                }
                return item;
            })}
        case CHANGE_QUANTITY_BLUR:
            return {...state, cart: state.cart.map(item => {
                if (item.id == action.product.id){
                    if (action.product.quantity < 1)
                        item.quantity = 1;
                    else if (action.product.quantity > item.inStock)
                        item.quantity = item.inStock;
                }
                return item;
            })}
        case ADD_QUANTITY:
            return {...state, cart: state.cart.filter(item => (item.id==action.product.id)? (item.quantity=((item.quantity>=item.inStock)? (item.inStock):(item.quantity+1))):item.quantity)}
        case MINUS_QUANTITY:
            return {...state, cart: state.cart.filter(item => (item.id==action.product.id)? (item.quantity=((item.quantity<=1)? 1 : (item.quantity-1) )):item.quantity)};
        default:
            return state;
    }
}

export const FilterReducer = (state, action) => {
    switch (action.type){
        case SORT_BY_PRICE:
            return {...state, byprice: action.sort};
        case SORT_BY_STOCK:
            return {...state, bystocks: !state.bystocks}
        case SORT_BY_DELIVERY:
            return {...state, bydelivery: !state.bydelivery}
        case SORT_BY_RATING:
            return {...state, byratings: action.ratings}
        case CLEAR_FILTER:
            return {
                byprice: false,
                bystocks: true,
                bydelivery: false,
                byratings: 1,
                clear: false
            }
        default:
            return state;
    }
}