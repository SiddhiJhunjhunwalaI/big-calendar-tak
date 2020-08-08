import React, { Component } from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import axios from "axios";
import classNames from "classnames";
import Step3 from "./Step3";
import Step2 from "./Step2";
import Step1 from "./Step1";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavigationBar";
import { getuserDetails } from "../actions";
import CheckProfile from "../components/CheckProfile";
import { Redirect } from "react-router-dom";
import Stepmid from "./Stepmid";

class ProfileComplete extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    step: 1,
    l1: [true],
    name: "",
    phone: "",
    address: "",
    dob: "",
    worktype: "",
    start: "",
    end: "",
    workdays: [
      { off: true, day: "Monday", start: "OFF", end: "End Time", breaks: [] },
      { off: true, day: "Tuesday", start: "OFF", end: "End Time", breaks: [] },
      {
        off: true,
        day: "Wednesday",
        start: "OFF",
        end: "End Time",
        breaks: [],
      },
      { off: true, day: "Thursday", start: "OFF", end: "End Time", breaks: [] },
      { off: true, day: "Friday", start: "OFF", end: "End Time", breaks: [] },
      { off: true, day: "Saturday", start: "OFF", end: "End Time", breaks: [] },
      { off: true, day: "Sunday", start: "OFF", end: "End Time", breaks: [] },
    ],
    needs: "",
    website: "",
    logo: null,
    calendar: "",
    timezone: "",
    file: null,
    upload: false,
    fb: "",
    insta: "",
    twitter: "",
    linkedin: "",
    filled: false,
    services: [{category:"Electronics & Appliances",services:["Computer Service"]}],
    zip: "",
    state: "Alabama",
    country: "United States",
    industry: "Accounting",
    strength: null,
    errors: [
      {
        name: true,
        phone: true,
        address: true,
        zip: true,
        state: true,
        country: true,
        industry: true,
   
      },
    ],
    showError: false,
  };

  handleSubmit = async () => {
    const {
      phone,
      address,
      workdays,
      website,
      zip,
      country,
      state,
      strength,
      name,
      fb,
      twitter,
      insta,
      linkedin,
      industry,
      services,
    } = this.state;
    let worktime = [];
    let start = "start",
      end = "end";
    const details = {
      _user: this.props.currentUser.id,
      phone,
      address,
      workdays,
      website,
      zip,
      country,
      state,
      strength,
      name,
      fb,
      twitter,
      insta,
      linkedin,
      industry,
      services,
      details: true,
    };
    console.log(details);
    const response = await axios.post(`/api/users/profile/complete`, {
      data: { details },
    });
    console.log(response);
    this.setState({ filled: true });
  };
  selectCountry = (val) => {
    let { errors } = this.state;
    errors[0].country = !val;
    this.setState({ country: val });
  };

  selectRegion = (val) => {
    let { errors } = this.state;
    errors[0].state = !val;
    this.setState({ state: val });
  };
  handleTiming = (workdays) => {
    this.setState(workdays);
  };
  handleServices = (services) => {
    this.setState(services);
  };
  componentDidMount() {
    this.setState({ current_fs: 1 });
  }
  componentDidUpdate() {
    console.log(this.state, "state");
  }
  handlePhone = (phone) => {
    let { errors } = this.state;
    errors[0].phone = !phone;
    this.setState({ phone, errors });
  };
  nextStep = () => {
    const { step, l1 } = this.state;
    this.setState({ showError: true });
    let { errors } = this.state;
    errors[step - 1] = {
      name: !this.state.name,
      phone: !this.state.phone,
      address: !this.state.address,
      zip: !this.state.zip,
      state: !this.state.state,
      country: !this.state.country,
      industry: !this.state.industry,
 
    };
    this.setState(
      {
        errors,
      },
      () => {
        if (Object.values(this.state.errors[step - 1]).every((i) => !i)) {
          this.setState({ step: step + 1, l1: [...l1, true] });
        }
      }
    );
  };
  handleErrors = (params) => {
    return (
      this.state.showError &&
      this.state.errors[this.state.step - 1][params] && (
        <div className="invalid-feedback">This field cannot be empty</div>
      )
    );
  };
  handleNumber=()=>
  { 
    return (
      this.state.showError &&this.state.strength!==null && !/^\d+$/.test(this.state.strength)&&(
        <div className="invalid-feedback">Invalid Number</div>
      )
    );
  }
  checkNumber=()=>
    {if(this.state.strength===null||this.state.strength==='')
      return false
      return (
        ! /^\d+$/.test(this.state.strength)
        )
      
    }
    checkService=()=>
    {
      if(this.state.services.length<=0)
      return false
      else return true
    }
    checkHours=()=>
    {
     return !this.state.workdays.every((ele)=>ele.end==='End Time')
    }
  prevStep = () => {
    const { step, l1 } = this.state;
    l1.pop();
    this.setState({
      step: step - 1,
      l1: l1,
    });
  };
  showStep = () => {
    const {
      step,
      phone,
      address,
      workdays,
      worktype,
      starttime,
      endtime,
      website,
      timezone,
      file,
      upload,
      zip,
      country,
      state,
      strength,
      name,
      fb,
      twitter,
      insta,
      linkedin,
      industry,
      services,
    } = this.state;
    if (step === 1)
      return (
        <Step1
          handleChange={this.handleChange}
          nextStep={this.nextStep}
          name={name}
          phone={phone}
          address={address}
          zip={zip}
          country={country}
          strength={strength}
          state={state}
          industry={industry}
          handlePhone={this.handlePhone}
          handleTimeZone={this.handleTimeZone}
          selectCountry={this.selectCountry}
          selectRegion={this.selectRegion}
          handleErrors={this.handleErrors}
          showError={this.state.showError}
          errors={this.state.errors[0]}
          handleStrength={this.handleNumber}
          checkNumber={this.checkNumber}
          
        />
      );
    if (step === 2)
      return (
        <Stepmid
          handleChange={this.handleChange}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          services={services}
          handleServices={this.handleServices}
          checkService={this.checkService}
        />
      );
    if (step === 3)
      return (
        <Step2
          handleChange={this.handleChange}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          worktype={worktype}
          starttime={starttime}
          endtime={endtime}
          workdays={workdays}
          timezone={timezone}
          handleTiming={this.handleTiming}
          checkHours={this.checkHours}
        />
      );

    if (step === 4)
      return (
        <Step3
          handleChange={this.handleChange}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          insta={insta}
          fb={fb}
          twitter={twitter}
          linkedin={linkedin}
          website={website}
          file={file}
          upload={upload}
          handleLogo={this.handleDrop}
          handleFile={this.handleFile}
          handleUpload={this.handleUpload}
          handleSubmit={this.handleSubmit}
        />
      );
  };

  handleTimeZone = (timezone) => {
    this.setState({ timezone });
  };

  handleChange = (input) => (e) => {
    let { errors, step } = this.state;
    if(step===1)
    errors[0][input] = !e.target.value;
    this.setState({ [input]: e.target.value, errors });
   
  };

  handleDrop = (logo) => {
    this.setState({ logo: logo });
  };
  handleFile = (file) => {
    this.setState({ file: file });
  };
  handleUpload = () => {
    this.setState({ upload: true });
  };
  render() {
    console.log("filled", this.state.filled);
    return (
      <div id="app">
        <div className="bg-blur">
          <Navbar />
          <div
            className="content-wrapper override-content-wrapper"
            style={{ padding: "0 !important" }}
          >
            <Sidebar />
            {/* <CheckProfile /> */}
            {this.state.filled ? <Redirect to="/dashboard" /> : ""}
          </div>
        </div>
        <div className=" content container-fluid">
          <div className="row ">
            <div className="col-md-12 col-md-offset-3">
              <form id="msform" className="step-wrapper">
                {/* progressbar */}
                <div className="row row-full">
                  <div className="col-md-3 overx">
                    <br />
                    <p className="phead">Business Details</p>
                    <div className="activity prog-tab-x"></div>
                  </div>
                  <div className="col-md-3 overx">
                    <br />
                    <p className="phead">Services Offered </p>
                    <div
                      className={classNames({
                        "prog-tab": true,
                        activity: this.state.l1[1] ? this.state.l1[1] : false,
                      })}
                    ></div>
                  </div>
                  <div className="col-md-3 overx">
                    <br />
                    <p className="phead">Operating Hours</p>
                    <div
                      className={classNames({
                        "prog-tab": true,
                        activity: this.state.l1[2] ? this.state.l1[2] : false,
                      })}
                    ></div>
                  </div>
                  <div className="col-md-3 overy">
                    <br />
                    <p className="phead">Social Accounts</p>
                    <div
                      className={classNames({
                        "prog-tab-y": true,
                        activity: this.state.l1[3] ? this.state.l1[3] : false,
                      })}
                    ></div>
                  </div>
                </div>
                <br />
                {/* <ul id="progressbar">
                  <li className="activity">General Information</li>
                  <li className={this.state.l1[1]}>Business Information</li>
                  <li className={this.state.l1[2]}>Marketing Information</li>
                </ul> */}
                {/* <div className="row row-per row-h">
                
                <div className="col-md-2 prog-tab "></div>
                <div className="col-md-2 prog-tab "></div>
                <div className="col-md-2 prog-tab "></div>
                </div> */}
                {this.showStep()}

                {/* fieldsets */}
              </form>
              {/* link to designify.me code snippets */}
              {/* /.link to designify.me code snippets */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, { getuserDetails })(ProfileComplete);
