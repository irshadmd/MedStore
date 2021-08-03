/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/helpers';

class Homepage extends React.PureComponent {
  render() {
    return (
      <>
        <div className="site-blocks-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
                <div className="site-block-cover-content text-center">
                  <h2 className="sub-title">Effective Medicine, New Medicine Everyday</h2>
                  <h1>Welcome To MedStore</h1>
                  <p>
                    <a href="/shop" className="btn btn-primary px-5 py-3">Shop Now</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section">
          <div className="container">
            <div className="row align-items-stretch section-overlap">
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap bg-primary h-20">
                  <a href="#" className="h-20">
                    <h5>Free <br></br> Shipping</h5>
                    <i className='fa fa-truck' />
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap h-20">
                  <a href="#" className="h-20">
                    <h5>Season <br></br> Sale 50% Off</h5>
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap bg-warning h-20">
                  <a href="#" className="h-20">
                    <h5>Safe <br></br> Delivery</h5>
                    <i className="fa fa-car"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='homepage'>
          <Row className='flex-row'>
            <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
              <div className='home-carousel'>
                <CarouselSlider
                  swipeable={true}
                  showDots={true}
                  infinite={true}
                  autoPlay={false}
                  slides={banners}
                  responsive={responsiveOneItemCarousel}
                >
                  {banners.map((item, index) => (
                    <img key={index} src={item.imageUrl} />
                  ))}
                </CarouselSlider>
              </div>
            </Col>
            <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
              <div className='d-flex flex-column h-100 justify-content-between'>
                <img src='/images/banners/banner-2.jpg' className='mb-3' />
                <img src='/images/banners/banner-5.jpg' />
              </div>
            </Col>
            <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
              <div className='d-flex flex-column h-100 justify-content-between'>
                <img src='/images/banners/banner-2.jpg' className='mb-3' />
                <img src='/images/banners/banner-6.jpg' />
              </div>
            </Col>
          </Row>
        </div>
        <br></br>

        <div className="site-section " >
          <div className="container">
            <div className="row align-items-stretch">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('/images/bg_1.jpg')" }}>
                  <div className="banner-1-inner align-self-center">
                    <h2>MedStore Products</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                </p>
                  </div>
                </a>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('/images/bg_2.jpg')" }}>
                  <div className="banner-1-inner ml-auto  align-self-center">
                    <h2>Rated by Experts</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Homepage);
