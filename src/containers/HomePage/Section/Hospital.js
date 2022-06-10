import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllClinics } from "../../../services/userService";
import { withRouter } from "react-router";

class Hospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinics();
    console.log("check response", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  render() {
    let { dataClinic } = this.state;
    return (
      <div className="section-share section-clinic">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Cơ sở y tế nổi bật</span>
            <button className="section-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <div
                      className="section-customized"
                      key={index}
                      onClick={() => {
                        this.handleViewDetailClinic(item);
                      }}
                    >
                      <div
                        className="image section-clinic"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="image-title">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Hospital)
);
