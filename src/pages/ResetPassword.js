import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import axios from "axios";
import { generateNewPassword } from "../actions";

export class ResetPassword extends Component {
  state = {
    email: "",
    passowrd: "",
    confirm_password: "",
    errors: {
      password: true,
      confirm_password: true,
      diff: false,
    },
    showError: false,
    showclass: true,
    showForm: false,
    showIncomingErrors:false,
    loginCalled:false
  };

  componentDidMount = () => {
    axios
      .post("/api/users/find-user-by-hash", {
        hash: this.props.match.params.hash,
      })
      .then((res) => this.setState({ showForm: true, email: res.data.email }))
      .catch((err) => this.setState({ error: err.response.data.error }));
  };

  handleField = (e, fieldType) => {
    this.setState({
      [fieldType]: e.target.value,
      errors: { ...this.state.errors, [fieldType]: !e.target.value },
      showIncomingErrors:false,loginCalled:false
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ showError: true ,showIncomingErrors:true,loginCalled:true});

    this.setState(
      {
        errors: {
          ...this.state.errors,
          confirm_password: this.state.confirm_password !== this.state.password,
          password: !this.state.password,
          diff:
            this.state.confirm_password &&
            this.state.confirm_password !== this.state.password,
        },
      },
      () => {
        if (Object.values(this.state.errors).every((i) => !i)) {
          this.props.generateNewPassword(this.state);
        }
      }
    );
  };

  handleErrors = (params) => {
    return (
      this.state.showError &&
      this.state.errors[params] && (
        <div className="invalid-feedback">This field cannot be empty</div>
      )
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.passowrdGenerated !== this.props.passowrdGenerated &&
      this.props.passowrdGenerated
    ) {
      this.props.history.push("/?password-reset=true");
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.showForm && (
          <form className="sign-in-form" action="index.html">
            <div className="card">
              <div className="card-body">
                <a
                  href="/"
                  className="brand text-center d-block m-b-20"
                >
                  <img
                    src="../assets/img/qt-logo@2x.png"
                    alt="QuantumPro Logo"
                  />
                </a>
                <h5 className="sign-in-heading text-center">Password Reset</h5>
                <p className="text-center text-muted">
                  Enter New Password and Confirm Password to reset your password
                </p>
                <div className="form-group">
                  <label className="sr-only">New Password</label>
                  <input
                    type="password"
                    className={classNames({
                      "form-control": this.state.showclass,
                      "is-invalid":
                        this.state.showError && this.state.errors.password,
                    })}
                    placeholder="Enter a new password"
                    value={this.state.password}
                    onChange={(e) => this.handleField(e, "password")}
                  />
                  {this.handleErrors("password")}
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className={classNames({
                      "form-control": this.state.showclass,
                      "is-invalid":
                        this.state.showError &&
                        this.state.errors.confirm_password,
                    })}
                    value={this.state.confirm_password}
                    onChange={(e) => this.handleField(e, "confirm_password")}
                  />
                  {this.state.errors.diff ? (
                    <div className="invalid-feedback">
                      Passwords don't match
                    </div>
                  ) : (
                    this.handleErrors("confirm_password")
                  )}
                </div>
                <button
                  className="btn btn-primary btn-rounded btn-floating btn-lg btn-block"
                  onClick={(e) => this.handleSubmit(e)}
                  disabled={this.state.loginCalled}
                >
                  Generate new Password
                </button>
                <p className="m-t-25 m-b-0 p-0" style={{ color: "red" }}>
                  {this.props.passwordGenerateError &&
                  this.state.showIncomingErrors &&
                  this.props.passwordGenerateError.password
                    ? this.props.passwordGenerateError.password
                    : ""}
                    {this.props.passwordGenerateError &&
                  this.state.showIncomingErrors &&
                  this.props.passwordGenerateError.error
                    ? this.props.passwordGenerateError.error
                    : ""}
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  passwordGenerateError: auth.passwordGenerateError,
  passowrdGenerated: auth.passowrdGenerated,
});

export default connect(mapStateToProps, { generateNewPassword })(ResetPassword);
