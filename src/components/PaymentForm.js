import "../css/Payment.css"
import React, { useState, useEffect} from "react";
import { CartState } from "../context/Context";
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { CLEAR_CART } from "../context/Reducer";

const cardNumberElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        lineHeight: "2em",
        letterSpacing: "0.5em",
        textAlign: "center"
      },
    },
};

const expiryElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        lineHeight: "2em",
        textAlign: "left"
      },
    },
};

const cvcElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        lineHeight: "2em",
        textAlign: "left"
      },
    },
};

export default function PaymentForm () {
    const {state: {cart, status: {total, paid}}, dispatch} = CartState();
    const [success, setsuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        //var cardNumber = elements.create("cardNumber");
        //cardNumber.mount('#example3-card-number');

        /*var cardExpiry = elements.create('cardExpiry');
        cardExpiry.mount('#example3-card-expiry');

        var cardCvc = elements.create('cardCvc');
        cardCvc.mount('#example3-card-cvc');*/
    }, [])

    const handlesubmit = async (event) => {
        event.preventDefault();
        
        let form = document.getElementById("payment-form")

        console.log(form.elements["name"].value);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
            billing_details: {
                /*address: {
                  city: "San Francisco",
                  country: "US",
                  line1: "1234 Fake Street",
                  line2: null,
                  postal_code: "94102",
                  state: "CA"
                },*/
                email: form.elements["email"].value,
                name: form.elements["name"].value,
            },
        })

        if (!error) {
            try {
                const {id} = paymentMethod;
                const response = await axios.post("https://shopping-server-side.herokuapp.com/payment", {
                    amount: total*100,
                    id
                })

                if (response.data.success) {
                    console.log("Success payment");
                    setsuccess(true);
                    dispatch({type: CLEAR_CART})
                }
            }
            catch (error) {
                console.log("Error: ", error)
            }
        }
        else {
            console.log(error.message)
        }
    }

    return (
        <div id="payment">
            {!success? ((cart.length>0)?

            (<form onSubmit={handlesubmit} id="payment-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" className="form-input" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" className="form-input" required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="card-number">Card Number</label>
                    <div className="form-input">
                        <CardNumberElement options={cardNumberElementOptions}/>
                    </div>
                </div>
                <div className="form-group-s">
                    <div className="group-s">
                        <label htmlFor="expiry">Expiry Date</label>
                        <div className="form-input-s">
                            <CardExpiryElement id="expiry" options={expiryElementOptions}/>
                        </div>
                    </div>
                    <div className="group-s">
                        <label htmlFor="cvc">CVC</label>
                        <div className="form-input-s">
                            <CardCvcElement id="cvc" options={cvcElementOptions}/>
                        </div>
                    </div>
                </div>
                <button className="pay-button" type="submit">Pay RM{total}</button>
            </form>):"your cart is empty")
            : 
            "you just bought a thing"}
        </div>
    )
}