import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
    };

    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="section-title">Chuyên khoa phổ biến</span>
            <button className="section-btn">Xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 1</div>
              </div>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 2</div>
              </div>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 3</div>
              </div>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 4</div>
              </div>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 5</div>
              </div>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 6</div>
              </div>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 7</div>
              </div>
              <div className="specialty-customized">
                <div className="image"></div>
                <div className="image-title">Cơ xương khớp 8</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
