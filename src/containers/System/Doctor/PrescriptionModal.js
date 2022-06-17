import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./PrescriptionModal.scss";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";

class PrescriptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    let { isOpenModal, closeBookingModal, scheduleData } = this.props;

    return (
      <Modal
        isOpen={true}
        className={"prescription-modal-container"}
        size="md"
        centered
      >
        <div>Hello world from prescription Modal</div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);
