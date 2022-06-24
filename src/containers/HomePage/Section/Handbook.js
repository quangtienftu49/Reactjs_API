import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";

class Handbook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="homepage.handbook" />
            </span>
            <button className="section-btn">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 1</div>
              </div>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 2</div>
              </div>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 3</div>
              </div>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 4</div>
              </div>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 5</div>
              </div>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 6</div>
              </div>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 7</div>
              </div>
              <div className="section-customized">
                <div className="image section-handbook"></div>
                <div className="image-title">Cẩm nang 8</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
