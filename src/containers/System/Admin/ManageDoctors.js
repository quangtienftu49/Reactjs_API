import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctors.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import { add } from "lodash";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

//convert HTML into text: markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      // Save to doctor_infor table:
      listPrice: [],
      listPayments: [],
      listProvinces: [],
      listClinics: [],
      listSpecialties: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;

          result.push(object);
        });
      }

      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }

      if (type === "PAYMENT") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} `;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }

      if (type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;

          result.push(object);
        });
      }

      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;

          result.push(object);
        });
      }
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorData;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayments: dataSelectPayment,
        listProvinces: dataSelectProvince,
      });
    }

    if (prevProps.allRequiredDoctorData !== this.props.allRequiredDoctorData) {
      // console.log(
      //   "check get data from redux",
      //   this.props.allRequiredDoctorData
      // );
      let { resPrice, resPayment, resProvince, resSpecialty } =
        this.props.allRequiredDoctorData;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );

      // console.log(
      //   "check data select from redux",
      //   dataSelectPayment,
      //   dataSelectPrice,
      //   dataSelectProvince
      // );

      this.setState({
        listPrice: dataSelectPrice,
        listPayments: dataSelectPayment,
        listProvinces: dataSelectProvince,
        listSpecialties: dataSelectSpecialty,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let { listPayments, listPrice, listProvinces, listSpecialties } =
      this.state;

    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        specialtyId = "",
        provinceId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "";

      if (res.data.Doctor_infor) {
        addressClinic = res.data.Doctor_infor.addressClinic;
        nameClinic = res.data.Doctor_infor.nameClinic;
        note = res.data.Doctor_infor.note;
        paymentId = res.data.Doctor_infor.paymentId;
        priceId = res.data.Doctor_infor.priceId;
        provinceId = res.data.Doctor_infor.provinceId;
        specialtyId = res.data.Doctor_infor.specialtyId;

        selectedPayment = listPayments.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvinces.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialties.find((item) => {
          return item && item.value === specialtyId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
      });
    }
    // console.log(`check handleChangeSelect:`, res);
  };

  handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
    // console.log(
    //   "check select on change doctor infor",
    //   selectedDoctor,
    //   stateName
    // );
  };

  handleOnChangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    // console.log("check state", this.state);
    let { hasOldData, listSpecialties } = this.state;
    return (
      <div className="manage-doctors-container">
        <div className="manage-doctors-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro-infor" />:
            </label>
            <textarea
              className="form-control"
              onChange={(e) => {
                this.handleOnChangeText(e, "description");
              }}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-price" />
              }
              name={"selectedPrice"}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayments}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-payment" />
              }
              name={"selectedPayment"}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvinces}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-province" />
              }
              name={"selectedProvince"}
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-name" />
            </label>
            <input
              className="form-control"
              onChange={(e) => {
                this.handleOnChangeText(e, "nameClinic");
              }}
              value={this.state.nameClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-address" />
            </label>
            <input
              className="form-control"
              onChange={(e) => {
                this.handleOnChangeText(e, "addressClinic");
              }}
              value={this.state.addressClinic}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(e) => {
                this.handleOnChangeText(e, "note");
              }}
              value={this.state.note}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-specialty" />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              options={this.state.listSpecialties}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-specialty" />
              }
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-clinic" />
            </label>
            <Select
              value={this.state.selectedClinic}
              options={this.state.listClinics}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              }
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedClinic"
            />
          </div>
        </div>
        <div className="manage-doctors-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          className={
            hasOldData ? "save-content-doctor" : "create-content-doctor"
          }
          onClick={() => {
            this.handleSaveContentMarkdown();
          }}
        >
          {hasOldData ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save-infor" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.create-infor" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorData: state.admin.allRequiredDoctorData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
