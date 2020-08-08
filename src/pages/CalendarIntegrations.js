import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getuserDetails } from "../actions";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavigationBar";
import CheckDetails from "../components/CheckDetails";

class CalendarIntegrations extends React.Component {
  state = { auth: false };
  timer;
  componentDidMount = async () => {
    this.timer = setInterval(this.polling, 1000);
    this.getGoogle()
  };
  getGoogle = async () => {
    const response = await axios.get(
      `/api/users/googlesync?id=` + this.props.currentUser.id,
      { id: this.props.currentUser.id }
    );
    console.log("resp", response);
    if (response.data.msg === true) this.setState({ auth: true });
  };
  win;
  handleGoogle = async (e) => {
    const SCOPES = [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ];
    const getUrl = await axios.get(`/api/calendar/auth`);
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    if (this.win && !this.win.closed) {
      this.win.focus();
    } else {
      this.win = window.open(getUrl.data.url);
      this.win.focus();
    }
  };

  polling = () => {
    console.log("here");
    if (this.win && this.win.closed) {
      clearInterval(this.timer);
      this.getGoogle()
    }
  };

  handleEvent = async (e) => {
    const response = await axios.get(`/api/calendar/google`);
    console.log(response);
  };

  handleDeLink = async (e) => {
    const response = await axios.get(
      `/api/calendar/googleDelink?id=` + this.props.currentUser.id,
      { id: this.props.currentUser.id }
    );
    if (response.data.msg === true) this.setState({ auth: false });
  };

  render() {
    return (
      <div id="app">
        <CheckDetails />
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <div className="row container-fluid content">
            <div className="col-sm-12 col-md-6 col-xl-3">
              <div className="card">
                
               
                
                <div className="card-content">
                  <div className="card-body">
                  {this.state.auth?<i className="la la-check" style={{float:"right"}}></i>:""}
                    <center>
                      <img
                        className="card-img img-fluid mb-4"
                        src="/google-calendar.jpg"
                        alt="Card image cap"
                      />
                      {!this.state.auth ? (
                        <button
                          className="btn btn-danger btn-large"
                          onClick={this.handleGoogle}
                        >
                          Sync your Google account
                        </button>
                      ) : (
                        <div>
                          <h4>Google Calendar</h4>
                          <p>Your Google account has been synced</p>
                          <button
                            className="btn btn-danger btn-large"
                            onClick={() =>
                              window.confirm(
                                "Do you want to delink your account?"
                              )
                                ? this.handleDeLink()
                                : ""
                            }
                          >
                            Delink account
                          </button>
                        </div>
                      )}
                    </center>
                  </div>
                </div>
              </div>
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

export default connect(mapStateToProps, { getuserDetails })(
  CalendarIntegrations
);
