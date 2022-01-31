import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class Doctor extends Component {
  render() {
    return (
      <div className="section-share section-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Bác sỹ nổi bật</span>
            <button className="section-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-customized">
                  <div className="background">
                    <div className="image section-doctor"></div>
                  </div>
                  <div className="image-title">
                    <div>Bác sỹ chuyên khoa II 1</div>
                    <div>Tiêu hóa</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
