/*
 *
 * PaymentFailed
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class PaymentFailed extends React.PureComponent {
  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const { order, isLoading } = this.props;

    return (
      <div className='order-success'>

        <div className='order-message'>
          <h2>Payment Failed.</h2>
          <p>
            Something went wrong please try agin!.
            </p>
          <div className='order-success-actions'>
            <Link to='/dashboard/orders' className='btn-link'>
              Manage Orders
              </Link>
            <Link to='/shop' className='btn-link shopping-btn'>
              Continue Shopping
              </Link>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order,
    isLoading: state.order.isLoading
  };
};

export default connect(mapStateToProps, actions)(PaymentFailed);
