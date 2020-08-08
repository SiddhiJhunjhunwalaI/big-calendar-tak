import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import classNames from "classnames";
import { loginUser } from "../actions";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: true,
      password: true,
    },
    showError: false,
    showclass: true,
    showForm: false,
    verificationError: null,
    showverf: false,
    loginCalled: false,
    showIncomingErrors: false,
    showResetSuccess: false,
    showLoader:false
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    if (this.props.location.search && query.get("hash")) {
      axios
        .post("/api/users/verify", { hash: query.get("hash") })
        .then((res) => this.setState({ showForm: true, showverf: true }))
        .catch((err) =>
          this.setState({ verificationError: err.response.data.error })
        );
    } else if (this.props.location.search === "?password-reset=true") {
      console.log("here work");
      this.setState({ showForm: true, showResetSuccess: true });
    } else {
      this.setState({ showForm: true });
      console.log("here not work", this.props);
    }
  };

  handleField = (e, fieldType) => {
    this.setState({
      [fieldType]: e.target.value,
      errors: { ...this.state.errors, [fieldType]: !e.target.value },
      loginCalled: false,
      showIncomingErrors: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      showError: true,
      loginCalled: true,
      showIncomingErrors: true,
      showLoader: true,
    });

    this.setState(
      {
        errors: {
          ...this.state.errors,
          email: !this.state.email,
          password: !this.state.password,
        },
      },
      () => {
        if (Object.values(this.state.errors).every((i) => !i)) {
          this.props
            .loginUser(this.state)
           this.setState({ showLoader: false })
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
  handleLoader = () => {
    return (
      this.state.showLoader && (
        <div className="preloader pl-xs pls-primary">
          <svg className="pl-circular" viewBox="25 25 50 50">
            <circle className="plc-path" cx={50} cy={50} r={20} />
          </svg>
        </div>
      )
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.authenticated !== this.props.authenticated &&
      this.props.authenticated
    ) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    let { loginCalled, showIncomingErrors } = this.state;
    console.log("autherror", this.props.authError);
    return (
      <div className="container">
        {this.props.authenticated ? <Redirect to="/dashboard" /> : ""}
        {this.state.verificationError && (
          <div className="row">
            <div className="col-12">
              <h2 className=" mt-5">{this.state.verificationError}</h2>
            </div>
          </div>
        )}
        {this.state.showForm && (
          <form className="sign-in-form">
            <div className="card">
              <div className="card-body">
                {this.state.showverf ? (
                  <React.Fragment>
                    <h6 style={{ color: "green", textAlign: "center" }}>
                      Your email has been verified.{" "}
                    </h6>
                    <h6 style={{ color: "green", textAlign: "center" }}>
                      Please login to continue
                    </h6>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {this.state.showResetSuccess ? (
                  <React.Fragment>
                    <h6 style={{ color: "green", textAlign: "center" }}>
                      Your password has been changed successfully.{" "}
                    </h6>
                    <h6 style={{ color: "green", textAlign: "center" }}>
                      Please login to continue
                    </h6>
                  </React.Fragment>
                ) : (
                  ""
                )}
                <a href="/" className="brand text-center d-block m-b-20">
                  <img
                    src="../assets/img/qt-logo@2x.png"
                    alt="QuantumPro Logo"
                  />
                </a>
                <h5 className="sign-in-heading text-center m-b-20">
                  Sign in to your account
                </h5>
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
                <div className="form-group">
                  <label className="sr-only">Password</label>
                  <input
                    type="password"
                    className={classNames({
                      "form-control": this.state.showclass,
                      "is-invalid":
                        this.state.showError && this.state.errors.password,
                    })}
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => this.handleField(e, "password")}
                  />
                  {this.handleErrors("password")}
                </div>
                <button
                  className="btn btn-primary btn-rounded btn-floating btn-lg btn-block"
                  onClick={(e) => this.handleSubmit(e)}
                  disabled={loginCalled}
                >
                  Sign In
                </button>
                {this.handleLoader()}
                <p className="text-danger m-t-25 m-b-0 p-0">
                  {this.props.authError &&
                  this.props.authError.error &&
                  showIncomingErrors
                    ? this.props.authError.error
                    : ""}
                  {this.props.authError &&
                  this.props.authError.email &&
                  showIncomingErrors
                    ? this.props.authError.email
                    : ""}
                </p>
                <p className="text-muted m-t-25 m-b-0 p-0">
                  Don't have an account yet?
                  <a
                    href=""
                    onClick={() => this.props.history.push("/register")}
                  >
                    {" "}
                    Create an account
                  </a>
                </p>
                <p className="text-muted m-b-0 p-0">
                  Forgot your Password?
                  <a
                    href="/forgot-password"
                    // onClick={() => this.props.history.push("/forgot-password")}
                  >
                    {" "}
                    Reset Here
                  </a>
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
  authenticated: auth.authenticated,
  authError: auth.authError,
});

export default connect(mapStateToProps, { loginUser })(Login);
