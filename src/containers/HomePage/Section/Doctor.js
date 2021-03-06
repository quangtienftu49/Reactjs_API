import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { FormattedDate, FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

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

  handleViewDetailDoctor = (doctor) => {
    // console.log("check onclick doctor", doctor);
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

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
            <span className="section-title">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="section-btn">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }

                  let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        this.handleViewDetailDoctor(item);
                      }}
                    >
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
                          <div>Ti??u h??a</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
