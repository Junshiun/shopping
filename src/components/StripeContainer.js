import "../css/Payment.css"
import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_51KauKyIGA1WbJUXENogV4eHLU4ldcPyUeO3Hj34gzYiTuG5bqE74ebf6XO68mIdD7hD7FfADqoJbEdaYzry3Cm7E00hkwYEK6U"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer () {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm/>
        </Elements>
    )
}