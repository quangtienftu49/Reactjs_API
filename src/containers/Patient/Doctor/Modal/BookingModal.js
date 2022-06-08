import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import { getProfileDoctorById } from "../../../../services/userService";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

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
      selectedGender: "",
      doctorId: "",

      genders: "",
      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;

        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.scheduleData !== prevProps.scheduleData) {
      if (this.props.scheduleData && !_.isEmpty(this.props.scheduleData)) {
        let doctorId = this.props.scheduleData.doctorId;
        let timeType = this.props.scheduleData.timeType;

        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({ ...stateCopy });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      // Convert string to date using moment
      // Check language to change date format
      let date =
        language === LANGUAGES.VI
          ? // ? moment(new Date(dataTime.date)).format("dddd - DD/MM/YYYY")
            // : moment(new Date(dataTime.date)).format("ddd - MM/DD/YYYY");

            // unix is another way to convert string to date
            // + to convert string to number
            // / 1000 to convert ms to s (timestamp)
            moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en") // convert to english days (MON, SUN)
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return ``;
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return name;
    }
    return ``;
  };

  handleConfirmBooking = async () => {
    // console.log("hit confirm button", this.state);

    // Validate input
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.scheduleData);
    let doctorName = this.buildDoctorName(this.props.scheduleData);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.state.birthday,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment successfully!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking a new appointment failed!");
    }
  };

  render() {
    let { isOpenModal, closeBookingModal, scheduleData } = this.props;
    let doctorId = "";

    // _ lodash check objects empty or not
    if (scheduleData && !_.isEmpty(scheduleData)) {
      doctorId = scheduleData.doctorId;
    }

    // console.log("check scheduleData", scheduleData);

    // same code functioning like if above
    // let doctorId = scheduleData && !_.isEmpty(scheduleData) ? scheduleData.doctorId : '';
    // console.log("check state", this.state);
    // console.log("check scheduleData: ", scheduleData);

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
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
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
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(e) => this.handleOnChangeInput(e, "fullName")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
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
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(e) => this.handleOnChangeInput(e, "reason")}
                ></input>
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.confirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="patient.booking-modal.cancel" />
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
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
