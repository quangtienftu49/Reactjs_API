import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import { getProfileDoctorById } from "../../../../services/userService";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      sex: "",
      doctorId: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({ ...stateCopy });
  };

  render() {
    let { isOpenModal, closeBookingModal, scheduleData } = this.props;
    let doctorId = "";
    // _ lodash check objects empty or not
    if (scheduleData && !_.isEmpty(scheduleData)) {
      doctorId = scheduleData.doctorId;
    }

    // same code functioning like if above
    // let doctorId = scheduleData && !_.isEmpty(scheduleData) ? scheduleData.doctorId : '';
    console.log("check state", this.state);
    console.log("check scheduleData: ", scheduleData);

    return (
      // Use reactstrap library for the modal
      // toggle={}
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>

          <div className="booking-modal-body">
            {/* {JSON.stringify(scheduleData)} convert object to string */}
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                scheduleData={scheduleData}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Họ tên</label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(e) => this.handleOnChangeInput(e, "fullName")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ</label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>Lý do khám</label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(e) => this.handleOnChangeInput(e, "reason")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Ngày sinh</label>
                <input
                  className="form-control"
                  value={this.state.birthday}
                  onChange={(e) => this.handleOnChangeInput(e, "bỉthday")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <input
                  className="form-control"
                  value={this.state.sex}
                  onChange={(e) => this.handleOnChangeInput(e, "sex")}
                ></input>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm" onClick={closeBookingModal}>
              Xác nhận
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
