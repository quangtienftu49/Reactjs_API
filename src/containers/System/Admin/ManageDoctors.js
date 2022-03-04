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
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      // Save to doctor_infor table:
      listPrice: [],
      listPayments: [],
      listProvinces: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
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
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;

        result.push(object);
      });
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
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allRequiredDoctorData !== this.props.allRequiredDoctorData) {
      // console.log(
      //   "check get data from redux",
      //   this.props.allRequiredDoctorData
      // );
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorData;

      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

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
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    // console.log(`check handleChangeSelect:`, res);
  };

  handleOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    // console.log("check state", this.state);
    let { hasOldData } = this.state;
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
              value={this.state.selectedOption}
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
                this.handleOnChangeDescription(e);
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
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listPrice}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-price" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-payment" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listPayments}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-payment" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-province" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listProvinces}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-province" />
              }
            />
          </div>

          <div className="col-4 form-group">
            <label>Tên phòng khám</label>
            <input className="form-control"></input>
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám</label>
            <input className="form-control"></input>
          </div>
          <div className="col-4 form-group">
            <label>Ghi chú</label>
            <input className="form-control"></input>
          </div>
        </div>
        <div className="manage-doctors-editor">
          <MdEditor
            style={{ height: "500px" }}
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
