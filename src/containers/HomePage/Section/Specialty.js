import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Chuyên khoa phổ biến</span>
            <button className="section-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customized">
                <div className="image section-specialty"></div>
                <div className="image-title">Cơ xương khớp 1</div>
              </div>
              <div className="section-customized">
                <div className="image section-specialty"></div>
                <div className="image-title">Cơ xương khớp 2</div>
              </div>
              <div className="section-customized">
                <div className="image section-specialty"></div>
                <div className="image-title">Cơ xương khớp 3</div>
              </div>
              <div className="section-customized">
                <div className="image section-specialty"></div>
                <div className="image-title">Cơ xương khớp 4</div>
              </div>
              <div className="section-customized">
                <div className="image section-specialty"></div>
                <div className="image-title">Cơ xương khớp 5</div>
              </div>
              <div className="section-customized">
                <div className="image section-specialty"></div>
                <div className="image-title">Cơ xương khớp 6</div>
              </div>
              <div className="section-customized">
                <div className="image section-specialty"></div>
                <div className="image-title">Cơ xương khớp 7</div>
              </div>
              <div className="section-customized">
                <div className="image section-specialty"></div>
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
