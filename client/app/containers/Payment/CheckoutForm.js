import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import { useSelector, useDispatch } from "react-redux";
import actions from '../../actions';
import { processOrder } from "../Order/actions";

export default function CheckoutForm(props) {

    const dispatch = useDispatch();

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch("api/order/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ total: props.total })
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
            });

    }, []);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            receipt_email: email,
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
            dispatch(paymentFailed());

        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            dispatch(processOrder());
        }
    };

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name on Card"
                />
                <hr></hr>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <hr></hr>

                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                    style={{}}
                    className="btn btn-primary"
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner" ></div>
                        ) : (
                            "Pay now $" + props.total
                        )}
                    </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                {/* Show a success message upon completion */}
                {succeeded == true ?
                    <p className="result-message">    Payment succeeded.
                </p>
                    : <span></span>
                }
            </form>
        </>
    );
}
