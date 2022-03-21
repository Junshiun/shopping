import { createContext, useContext , useReducer, useState, useEffect} from "react";
import faker from "@faker-js/faker";
import { CartReducer , FilterReducer, FETCH_DATA, FETCH_URL} from './Reducer';
import { useSearchParams, useNavigate } from "react-router-dom";

export const Cart = createContext();
faker.seed(99);

const Context = ({children}) => {


    const [loading, setloading] = useState("loading");

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const fetch_data = async() => {

        let category_get = searchParams.get("category")

        category_get = (category_get===null)? "none": category_get;

        await fetch('https://fakestoreapi.com/products/' + ((category_get==="none")? "": "category/" + category_get), {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
        }
        }).then(res=>res.json()).then(res => dispatch({type: FETCH_DATA, fetched: res, category: category_get}))
        
        setloading("done")

        /*.catch(() => {
            fetch('http://fakestoreapi.com/products/' + ((category_get==="none")? "": "category/" + category_get)
            ).then(res=>res.json()).then(res => dispatch({type: FETCH_DATA, fetched: res, category: category_get}))
        })*/
    }

    useEffect(() => {

       fetch_data();

    }, []);

    /*const products = fetched_products.map((item) => {return {
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
        quantity: 1
    }})*/

    /*const products = [...Array(20)].map(() => {return {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
        quantity: 1
    }})*/

    const [state, dispatch] = useReducer(CartReducer,{
        products: [],
        cart:  (JSON.parse(localStorage.getItem('cart'))===null)? []:JSON.parse(localStorage.getItem('cart')),

        //useState(localStorage.getItem('cart')),
        //fetched_products: []
        
        status: {total: JSON.parse(localStorage.getItem('total')),
                },
        category: "none"
    });

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },[state.cart]);

    useEffect(()=>{
        localStorage.setItem('total', JSON.stringify(state.status.total))
    },[state.status]);

    useEffect(() => {
        window.addEventListener('popstate', ()=>{
            navigate(0)
        });
    });

    const [filter, filterdispatch] = useReducer(FilterReducer,{
        byprice: false,
        bystocks: true,
        bydelivery: false,
        byratings: 1,
        clear: false
    });

    return (
        <Cart.Provider value={{state, dispatch, filter, filterdispatch, loading}}>
            {children}
        </Cart.Provider>
    )
}

export default Context;

export const CartState = () => {
    return useContext(Cart);
};
