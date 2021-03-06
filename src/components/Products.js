import { CartState } from "../context/Context.js";
import "../css/Products.css";

import { ADD_TO_CART, REMOVE_FROM_CART } from "../context/Reducer.js";

import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { Loading } from "./Loading.js";

export const Products = () => {
  const {
    state,
    state: { products, cart, fetched_products },
    dispatch,
    filter,
    fetch_data,
    loading,
  } = CartState();

  //console.log(products);
  //console.log(products);

  const { categoryId } = useParams();

  useEffect(() => {
    fetch_data(categoryId);
    // console.log(location);
  }, [categoryId]);

  const filtered_products = () => {
    let sorted_products = products;

    if (filter.byprice === "ascending") {
      sorted_products.sort((a, b) => a.price - b.price);
    } else if (filter.byprice === "decending") {
      sorted_products.sort((a, b) => b.price - a.price);
    }

    if (filter.bystocks === false) {
      sorted_products = sorted_products.filter((item) => item.inStock);
    }

    if (filter.bydelivery === true) {
      sorted_products = sorted_products.filter((item) => item.fastDelivery);
    }

    sorted_products = sorted_products.filter(
      (item) => item.ratings >= filter.byratings
    );

    return sorted_products;
  };

  return loading === true ? (
    <Loading />
  ) : (
    <div className="main-container">
      <div className="products-wrap">
        {filtered_products().map((item) => {
          return (
            <div className="product-container" key={item.id}>
              <div className="product-image">
                <img src={item.image} alt={item.name}></img>
              </div>
              <div className="description">
                <span>{item.name}</span>
                <span>RM {item.price}</span>
                <span>fastDelivery: {item.fastDelivery ? "yes" : "no"}</span>
                <span>
                  ratings: {item.ratings}{" "}
                  <AiFillStar
                    style={{ color: "orange", marginBottom: "3px" }}
                  ></AiFillStar>
                </span>
              </div>
              <div className="to-cart">
                {cart.some((element) => element.id === item.id) ? (
                  <button
                    onClick={(e) =>
                      dispatch({
                        type: REMOVE_FROM_CART,
                        product: {
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                        },
                      })
                    }
                    className="btn btn-danger"
                  >
                    remove from cart
                  </button>
                ) : item.inStock > 0 ? (
                  <button
                    onClick={(e) =>
                      dispatch({
                        type: ADD_TO_CART,
                        product: {
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                          inStock: item.inStock,
                        },
                      })
                    }
                    className="btn btn-success"
                  >
                    add to cart
                  </button>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    out of stock
                  </button>
                )}
                <span style={{ marginLeft: "1em" }}>
                  stocks: {item.inStock}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
