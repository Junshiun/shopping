import faker from "@faker-js/faker";
faker.seed(99);

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

export const FETCH_DATA = "fetch products";
export const FETCH_URL = "fetch url";

export const UPDATE_SUM = "update sum";
export const CLEAR_CART = "clear cart";

export const CartReducer = (state, action) => {
    let new_cart;

    let total = (items) => {
        
        let results = items.reduce(
            (total, currentValue) => {
                return (total + currentValue.price * currentValue.quantity)
        }, 0)

        return results;
    }

    switch (action.type){
        case FETCH_DATA:
            return {...state, products: action.fetched.map(item => {return{
                id: item.id,
                name: item.title,
                price: item.price,
                image: item.image,
                inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
                fastDelivery: faker.datatype.boolean(),
                ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
                quantity: 1
            }}), category: action.category}

        case ADD_TO_CART:
            new_cart = state.cart.concat(action.product);

            return {...state, products: state.products, cart: new_cart, status: {...state.status, total: total(new_cart)} }

        case REMOVE_FROM_CART:
            new_cart = state.cart.filter(element => {return (element.id !== action.product.id)});

            return {...state, cart: new_cart, status: {...state.status, total: total(new_cart)}}

        case CHANGE_QUANTITY_KEY:
            new_cart = state.cart.map(item => {
                if(item.id == action.product.id){
                    item.quantity = action.product.quantity;
                }
                return item;
            })

            return {...state, cart: new_cart}

        case CHANGE_QUANTITY_BLUR:
            new_cart = state.cart.map(item => {
                if (item.id == action.product.id){
                    if (action.product.quantity < 1)
                        item.quantity = 1;
                    else if (action.product.quantity > item.inStock)
                        item.quantity = item.inStock;
                }
                return item;
            })

            return {...state, cart: new_cart, status: {...state.status, total: total(new_cart)}}

        case ADD_QUANTITY:
            new_cart = state.cart.filter(item => (item.id==action.product.id)? (item.quantity=((item.quantity>=item.inStock)? (item.inStock):(item.quantity+1))):item.quantity)

            return {...state, cart: new_cart, status: {...state.status, total: total(new_cart)}}

        case MINUS_QUANTITY:
            new_cart = state.cart.filter(item => (item.id==action.product.id)? (item.quantity=((item.quantity<=1)? 1 : (item.quantity-1) )):item.quantity)

            return {...state, cart: new_cart, status: {...state.status, total: total(new_cart)}};

        case CLEAR_CART:
            new_cart = [];
            return {...state, cart: new_cart, status: {...state.status, total: total(new_cart)}}
            
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