import "../css/Payment.css"
import React, { useState, useEffect, useLayoutEffect} from "react";
import { CartState } from "../context/Context";
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { CLEAR_CART } from "../context/Reducer";
import { AiFillCloseSquare, AiOutlineLoading3Quarters } from "react-icons/ai"
import { FaAngleDoubleRight } from "react-icons/fa"

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

const cardNumberElementOptionsMobile = {
    style: {
      base: {
        fontSize: '12px',
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
    const [paymentSubmit, setPaymentSubmit] = useState(false);
    const [success, setsuccess] = useState(false);
    const [paymentFail, setPaymentFail] = useState(false);
    const [showGuide, setShowguide] = useState(true);
    const [windowSize, setWindowSize] = useState(0);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        //var cardNumber = elements.create("cardNumber");
        //cardNumber.mount('#example3-card-number');

        /*var cardExpiry = elements.create('cardExpiry');
        cardExpiry.mount('#example3-card-expiry');

        var cardCvc = elements.create('cardCvc');
        cardCvc.mount('#example3-card-cvc');*/

        /*
        let card = elements.getElement(CardNumberElement);*/

        window.addEventListener('resize', function(event) {

            if (window.innerWidth <= 500) {
                setWindowSize(false);
            }
            else {
                setWindowSize(true);
            }
        });

    }, [])

    const handlesubmit = async (event) => {
        event.preventDefault();
        
        let form = document.getElementById("payment-form");

        //console.log(form.elements["name"].value);

        setPaymentSubmit(true);

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
                    setPaymentSubmit(false);
                    dispatch({type: CLEAR_CART})
                }
                else {
                    setPaymentFail(true);
                    setPaymentSubmit(false);
                }
            }
            catch (error) {
                setPaymentFail(true);
                setPaymentSubmit(false);
            }
        }
        else {
            alert(error.message);
            setPaymentSubmit(false);
        }
    }

    return (
        <div className="paymentMain">
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
                            <CardNumberElement options={windowSize? cardNumberElementOptions:cardNumberElementOptionsMobile}/>
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
                    {paymentSubmit? 
                    <div className="paymentProcessing" disabled>
                        <AiOutlineLoading3Quarters className="loadingIcon"></AiOutlineLoading3Quarters>
                        Processing ...
                    </div>
                    :
                    <button className="pay-button" type="submit">Pay RM{total}</button>
                    }
                </form>):"your cart is empty")
                : 
                "Order Confirmed"}
            </div>
            {(cart.length>0)?
            <div className={"guide " + ((showGuide==true)? "showGuide":"hideGuide")}>
                <div className="guideContent">
                    <p>Hi, as this page is for demo purpose, please use the testing card number to proceed with payment:</p>
                    <ul>
                        <li>Name: Your Name</li>
                        <li>Email: Any Email</li>
                        <li>Card Number: 4242 4242 4242 4242</li>
                        <li>Expiry Date: Any Future Date</li>
                        <li>CVC: Any 3 Digits</li>
                    </ul>
                        <div className="closeGuide" onClick={() => {setShowguide(!showGuide)}}>
                        <AiFillCloseSquare fontSize="32px"></AiFillCloseSquare>
                    </div>
                </div>
                <div className="expandGuide" onClick={() => {setShowguide(!showGuide)}}>
                            <FaAngleDoubleRight fontSize="24px"></FaAngleDoubleRight>
                </div>
            </div>
            :
            <div></div>
            }
            <div className={"paymentFail " + ((paymentFail==true)? "showFail":"hideFail")}>
                <div className="failContent">
                    <p>Payment unsuccessfull, please try again</p>
                    <div className="failClose" onClick={() => {setPaymentFail(false)}}>
                        <AiFillCloseSquare fontSize="16px"></AiFillCloseSquare>
                    </div>
                </div>
            </div>
        </div>
    )
}