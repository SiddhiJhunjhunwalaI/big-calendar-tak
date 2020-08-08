import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import classNames from "classnames";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavigationBar";
import { getuserDetails } from "../actions";
import Pagination from "react-js-pagination";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CheckDetails from "../components/CheckDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ChangePass extends Component {
  state = {
    loaded: false,
    events: null,
    viewableModal: false,
    selectedItem: null,
    activePage: 1,
    totalPages: null,
    startIndex: 0,
    endIndex: 10,
    count: 10,
    showLoader: false,
    hideMessage: true,
  };
  handlePass = (e) => {
    this.setState({ [e.target.name]: e.target.value, hideMessage: true });
  };
  submitPass = async (e) => {
    this.setState({ hideMessage: false });
    const { old_password, password, confirm_password } = this.state;
    if (old_password && confirm_password && password) {
      await axios
        .post("/api/users/change-password", {
          old_password,
          confirm_password,
          password,
          id: this.props.currentUser.id,
        })
        .then((response) => {
          toast.success("password changed sucessfully")
          this.setState({
            success: "password changed sucessfully",
            error: undefined,
          });
        })
        .catch((error) => {
          toast.error(error.response.data.error)
          this.setState({
            error: error.response.data.error,
            success: undefined,
          });
        });
    } else this.setState({ error: "Empty fields not acceptable" });
  };

  render() {
    return (
      <div >
        {/* <CheckDetails/>
        <Navbar />
        <div className="content-wrapper">
        <Sidebar /> */}

        {/* <h2>Change Password</h2> */}
        <form className="form-event">
          <div className="form-group row">
            <label htmlFor="editTitle" className=" control-label">
              Old Password
            </label>

            <input
              type="password"
              name="old_password"
              onChange={this.handlePass}
              value={this.state.old_password}
              className="form-control new_event_title"
            ></input>
          </div>
          <div className="form-group row">
            <label className=" control-label">New Password</label>

            <input
              type="password"
              name="password"
              onChange={this.handlePass}
              value={this.state.password}
              className="form-control new_event_title"
            ></input>
          </div>
          <div className="form-group row">
            <label className="control-label">Confirm Password</label>

            <input
              type="password"
              name="confirm_password"
              onChange={this.handlePass}
              value={this.state.confirm_password}
              className="form-control new_event_title"
            ></input>
          </div>
        </form>
        {this.state.error === "" || this.state.error!=="Empty fields not acceptable" ||this.state.hideMessage ? (
          ""
        ) : (
          <h4 style={{ color: "red" }}>{this.state.error}</h4>
        )}
       
        <br/>
        <button className="btn btn-primary" onClick={this.submitPass}>
          Change Password
        </button>

        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, { getuserDetails })(ChangePass);
