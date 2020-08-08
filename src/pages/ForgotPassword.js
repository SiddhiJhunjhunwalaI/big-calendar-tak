import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { resetPassword ,clearPrev } from "../actions";

export class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {
      email: true,
    },
    showError: false,
    showclass: true,
    loginCalled: false,
    showIncomingErrors: false,
    showIncomingSuccess: false,
  };

  handleField = (e, fieldType) => {
    this.setState({
      [fieldType]: e.target.value,
      errors: { ...this.state.errors, [fieldType]: !e.target.value },
      loginCalled: false,
      showIncomingErrors: false,
      showIncomingSuccess: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.clearPrev()
    this.setState({
      showError: true,
      loginCalled: true,
      showIncomingErrors: true,
      showIncomingSuccess: true,
    });

    this.setState(
      {
        errors: {
          ...this.state.errors,
          email: !this.state.email,
        },
      },
      () => {
        if (Object.values(this.state.errors).every((i) => !i)) {
          this.props.resetPassword(this.state);
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

  render() {
    console.log(this.props, "FF");
    const { loginCalled, showIncomingErrors, showIncomingSuccess } = this.state;
    return (
      <div className="container">
        <form className="sign-in-form">
          <div className="card">
            <div className="card-body">
              <a href="#" className="brand text-center d-block m-b-20">
                <img src="../assets/img/qt-logo@2x.png" alt="QuantumPro Logo" />
              </a>
              <h5 className="sign-in-heading text-center">
                Forgotten Password?
              </h5>
              <p className="text-center text-muted">
                Enter your email to reset your password
              </p>
              <div className="form-group">
                <label className="sr-only">Email address</label>
                <input
                  type="email"
                  className={classNames({
                    "form-control": this.state.showclass,
                    "is-invalid":
                      this.state.showError && this.state.errors.email,
                  })}
                  placeholder="Email address"
                  value={this.state.email}
                  onChange={(e) => this.handleField(e, "email")}
                />
                {this.handleErrors("email")}
              </div>
              <button
                className="btn btn-primary btn-rounded btn-floating btn-lg btn-block"
                onClick={(e) => this.handleSubmit(e)}
                disabled={loginCalled}
              >
                Reset Password
              </button>
              {this.props.passwordSuccess && showIncomingSuccess ? (
                <p className="m-t-25 m-b-0 p-0" style={{ color: "green" }}>
                  Please check your email Inbox for resetting your password.
                </p>
              ) : (
                <p className="m-t-25 m-b-0 p-0" style={{ color: "red" }}>
                  {this.props.passwordResetError &&
                  showIncomingErrors &&
                  this.props.passwordResetError.error
                    ? this.props.passwordResetError.error
                    : ""}
                  {this.props.passwordResetError &&
                  showIncomingErrors &&
                  this.props.passwordResetError.email
                    ? this.props.passwordResetError.email
                    : ""}
                </p>
              )}

              <p className="text-muted m-t-25 m-b-0 p-0">
                Don't have an account yet?
                <a href="" onClick={() => this.props.history.push("/register")}>
                  {" "}
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  passwordSuccess: auth.passwordSuccess,
  passwordResetError: auth.passwordResetError,
});

export default connect(mapStateToProps, { resetPassword, clearPrev })(ForgotPassword);
