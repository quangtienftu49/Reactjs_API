import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class Hospital extends Component {
  render() {
    return (
      <div className="section-share section-hospital">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Cơ sở y tế nổi bật</span>
            <button className="section-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 1</div>
              </div>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 2</div>
              </div>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 3</div>
              </div>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 4</div>
              </div>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 5</div>
              </div>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 6</div>
              </div>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 7</div>
              </div>
              <div className="section-customized">
                <div className="image section-hospital"></div>
                <div className="image-title">Hệ thống y tế Thu Cúc 8</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Hospital);
