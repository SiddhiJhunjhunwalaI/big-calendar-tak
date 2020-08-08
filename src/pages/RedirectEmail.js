import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { getuserDetails } from "../actions";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RedirectEmail extends React.Component {
  state = {};
  componentDidMount = async () => {
    const params = new URLSearchParams(this.props.location.search);
    const eventId = params.get("eventId");
    const userId = params.get("userId");
    const accept = params.get("accepted");
    if (eventId && userId && accept !== undefined) {
      const response = await axios.post(`/api/calendar/confirm`, {
        eventId,
        userId,
        accept,
      });
      console.log(response.data);

      this.setState({ auth: response.data });
    }
  };

  redirecter = () => {
    const { auth } = this.state;
    if (this.props.currentUser !== null)
      return <Redirect to={{ pathname: "/dashboard", auth }} />;
    else return <Redirect to={{ pathname: "/", auth }} />;
  };

  render() {
    return (
      <div>
        <div className="preloader pl-xxl pls-primary">
          <svg className="pl-circular" viewBox="25 25 50 50">
            <circle className="plc-path" cx={50} cy={50} r={20} />
          </svg>
        </div>
        {this.state.auth ? this.redirecter() : ""}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, { getuserDetails })(RedirectEmail);
