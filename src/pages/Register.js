import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { registerUser ,clearPrev , loginUser} from "../actions";

export class Register extends Component {
  state = {
    email: "",
    fullName: "",
    password: "",
    confirm_password: "",
    errors: {
      email: true,
      fullName: true,
      password: true,
      confirm_password: true,
      diff: false,
    },
    showError: false,
    showclass: true,
    showConfirmation: false,
    loginCalled: false,
    showIncomingSuccess: false,
  };

  handleField = (e, fieldType) => {
    this.setState({
      [fieldType]: e.target.value,
      errors: { ...this.state.errors, [fieldType]: !e.target.value },
      loginCalled: false,
      showConfirmation: false,
      showIncomingSuccess: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.clearPrev()
    this.setState({ showError: true, diff: false , loginCalled: true,
        showIncomingErrors: true,
        showConfirmation: true,});

    this.setState(
      {
        errors: {
          ...this.state.errors,
          fullName: !this.state.fullName,
          email: !this.state.email,
          confirm_password: this.state.confirm_password !== this.state.password,
          password: !this.state.password,
          diff:
            this.state.confirm_password &&
            this.state.confirm_password !== this.state.password,
        },
      },
      () => {
        if (Object.values(this.state.errors).every((i) => !i)) {
          this.props.registerUser(this.state);
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
      prevProps.registered !== this.props.registered &&
      this.props.registered
    ) {
      let self=this
      this.setState({ showConfirmation: true });
      setTimeout(()=>{ self.props.loginUser(this.state)
        self.props.history.push("/profile/complete")},3000)
     
    }
  }

  render() {
    console.log(this.state, "STATE");
    console.log(
      this.props.authError !== null ? this.props.authError.response : "lol",
      "error"
    );
    return (
      <div className="container">
        <form className="sign-in-form">
          <div className="card">
            <div className="card-body">
              <a href="index.html" className="brand text-center d-block m-b-20">
                <img src="../assets/img/qt-logo@2x.png" alt="QuantumPro Logo" />
              </a>
              <h5 className="sign-in-heading text-center m-b-20">
                Create an account
              </h5>
              <div className="form-group">
                <label className="sr-only">Full Name</label>
                <input
                  type="text"
                  className={classNames({
                    "form-control": this.state.showclass,
                    "is-invalid":
                      this.state.showError && this.state.errors.fullName,
                  })}
                  placeholder="Full Name"
                  value={this.state.fullName}
                  onChange={(e) => this.handleField(e, "fullName")}
                />
                {this.handleErrors("fullName")}
              </div>
              <div className="form-group">
                <label className="sr-only">Email Address</label>
                <input
                  type="email"
                  className={classNames({
                    "form-control": this.state.showclass,
                    "is-invalid":
                      this.state.showError && this.state.errors.email,
                  })}
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={(e) => this.handleField(e, "email")}
                />
                {this.handleErrors("email")}
              </div>
              <div className="form-group">
                <label className="sr-only">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className={classNames({
                    "form-control": this.state.showclass,
                    "is-invalid":
                      this.state.showError && this.state.errors.password,
                  })}
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
                  <div className="invalid-feedback">Passwords don't match</div>
                ) : (
                  this.handleErrors("confirm_password")
                )}
                <p className="text-danger m-t-25 m-b-0 p-0">
                  {this.props.authError && this.state.showIncomingErrors&&
                  this.props.authError.response.data.email
                    ? this.props.authError.response.data.email
                    : ""}
                </p>
                <p className="text-danger m-t-25 m-b-0 p-0">
                  {this.props.authError &&this.state.showIncomingErrors&&
                  this.props.authError.response.data.name
                    ? this.props.authError.response.data.name
                    : ""}
                </p>
                <p className="text-danger m-t-25 m-b-0 p-0">
                  {this.props.authError &&this.state.showIncomingErrors&&
                  this.props.authError.response.data.password
                    ? this.props.authError.response.data.password
                    : ""}
                </p>
              </div>
              <button
                className="btn btn-primary btn-rounded btn-floating btn-lg btn-block"
                onClick={(e) => this.handleSubmit(e)}
                disabled={this.state.loginCalled}
              >
                Create My Account
              </button>
              {this.state.showConfirmation &&this.props.registered && (
                <p className="m-t-25 m-b-0 p-0" style={{ color: "green" }}>
                  Please check your email to verify your account !
                </p>
              )}
              <p className="text-muted m-t-25 m-b-0 p-0">
                Already have an account?
                <a href="#" onClick={() => this.props.history.push("/")}>
                  {" "}
                  Sign In
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
  registered: auth.registered,
  authError: auth.authError,
});

export default connect(mapStateToProps, { registerUser ,clearPrev , loginUser})(Register);
