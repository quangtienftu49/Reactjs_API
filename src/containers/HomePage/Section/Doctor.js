import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  render() {
    // console.log("chek top doctors", this.props.topDoctorsRedux);
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    //fake data
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);

    return (
      <div className="section-share section-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Bác sỹ nổi bật</span>
            <button className="section-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }

                  let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;

                  return (
                    <div key={index}>
                      <div className="section-customized">
                        <div className="background">
                          <div
                            className="image section-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        </div>
                        <div className="image-title">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Tiêu hóa</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
