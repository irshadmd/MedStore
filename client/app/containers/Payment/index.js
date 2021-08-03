/*
 *
 * Payment
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import AddressList from '../../components/Manager/AddressList';
import CartSummary from '../../components/Store/CartSummary';

const promise = loadStripe(process.env.STRIPE_API_KEY);


class Payment extends React.PureComponent {

  componentDidMount() {
    this.props.fetchAddresses();
  }


  render() {
    console.log(addresses);
    const { history, addresses, cartItems, cartTotal } = this.props;
    return (
      <div className='order-success'>
        <div className='order-message'>
          <h2>Checkout.</h2>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <div style={{ textAlign: "center" }}>
                      {addresses.length > 0 ? (
                        <AddressList addresses={addresses} />
                      ) : (
                        <NotFound message='No Addresses Found!' />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12" style={{ backgroundColor: '#f2f5f8', borderRadius: "20px", paddingTop: "20px" }}>
                    {cartItems.length > 0 && (
                      <div className='cart-checkout'>
                        <CartSummary cartTotal={cartTotal} />
                      </div>
                    )}

                  </div>
                </div>
              </div>
              <div className="col-md-1"><br></br></div>
              {cartTotal !== 0 ?
                <div className="col-md-4" >
                  <div style={{ textAlign: "center", backgroundColor: '#f2f5f8', borderRadius: "20px", padding: "4%" }}>
                    <p>Enter Card details</p>
                    <Elements stripe={promise}>
                      <CheckoutForm total={cartTotal} />
                    </Elements>
                  </div>
                </div>
                : <span></span>}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addresses: state.address.addresses,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal
  };
};

export default connect(mapStateToProps, actions)(Payment);
