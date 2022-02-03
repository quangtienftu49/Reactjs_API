import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      titleArr: [],
      roleArr: [],
      previewImgUrl: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getTitleStart();
    this.props.getRoleStart();
    // this.props.dispatch(actions.fetchGenderStart());
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   console.log("check res redux form", res);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //render => didUpdate
    //present(this) vs past(prev)
    //[]..................[3]

    //[3]..................[3]
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }

    if (prevProps.titleRedux !== this.props.titleRedux) {
      this.setState({
        titleArr: this.props.titleRedux,
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
  }

  handleOnChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    //create URL to preview image
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let titles = this.state.titleArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isGetGender = this.props.isLoadingGender;
    // console.log("check props from redux: ", this.state);
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.reduxTitle" />
        </div>

        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12">
                {isGetGender ? "Loading genders" : ""}
              </div>
              <div className="col-3">
                <label>Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select className="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.title" />
                </label>
                <select className="form-control">
                  {titles &&
                    titles.length > 0 &&
                    titles.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.roleId" />
                </label>
                <select className="form-control">
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(e) => {
                      this.handleOnChangeImage(e);
                    }}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    <FormattedMessage id="manage-user.upload" />{" "}
                    <i className="fas fa-cloud-upload-alt"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                    onClick={() => {
                      this.openPreviewImage();
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button className="btn btn-primary">
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    titleRedux: state.admin.titles,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getTitleStart: () => dispatch(actions.fetchTitleStart()),

    getRoleStart: () => dispatch(actions.fetchRoleStart()),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    // dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
