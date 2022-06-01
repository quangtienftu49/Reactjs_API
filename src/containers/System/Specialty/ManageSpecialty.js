import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-title">Quản lý chuyên khoa</div>

        <div className="all-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input className="form-control" type="text"></input>
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input className="form-control-file" type="file"></input>
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              // onChange={this.handleEditorChange}
              // value={this.state.contentMarkdown}
            />
          </div>
          <div className="col-12">
            <button className="btn-save-specialty">Save</button>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
