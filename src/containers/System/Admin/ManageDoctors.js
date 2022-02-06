import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctors.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

//convert HTML into text: markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleEditorChange = (html, text) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    console.log("check state", this.state);
  };

  handleChange = (selectedOption) => {
    console.log("check options", selectedOption);
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  handleOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    return (
      <div className="manage-doctors-container">
        <div className="manage-doctors-title">Tạo thêm thông tin bác sỹ</div>
        <div className="more-infor">
          <div className="content-left">
            <label>Chọn bác sỹ</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu:</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(e) => {
                this.handleOnChangeDescription(e);
              }}
              value={this.state.description}
            >
              asgdfhgdhgd
            </textarea>
          </div>
        </div>
        <div className="manage-doctors-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={() => {
            this.handleSaveContentMarkdown();
          }}
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
