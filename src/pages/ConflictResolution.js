import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getuserDetails } from "../actions";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavigationBar";
import CheckDetails from "../components/CheckDetails";

class ConflictResolution extends React.Component {
  state = [];
  async componentDidMount() {
    const checkconflict = await axios.get(
      `/api/calendar/conflicts/get?id=` + this.props.currentUser.id
    );
    console.log(checkconflict);

    let gevents = [];
    let localevents = [];
    checkconflict.data.msg.forEach((ele) => {
      if (ele.g_created) gevents.push(ele);
      else localevents.push(ele);
    });
    let grouping = [],
      localgroup = [],
      geventsgroup = [];

    console.log(localevents, "locale events");
    console.log(gevents, "gevents");

    gevents.forEach((ele, key) => {
      let makegroups = [];

      ele.conflicts.Google.conflictData.forEach((elem) => {
        makegroups.push(localevents.find(({ _id }) => _id === elem));
      });

      
      
      localgroup.push(makegroups);
      makegroups=[];
    });
  
    gevents.forEach((ele)=>
    {
      geventsgroup.push([ele])
    })
    

    console.log(localgroup,"local")
    console.log(geventsgroup,"g group")

    let i = 0,
      c = 0,
      j = 0;

    while (i < geventsgroup.length) {
      console.log("running till i=", geventsgroup.length);
      while (j < geventsgroup.length - 1) {
        console.log("i in j", i);
        for (let k = 0; k < localgroup[j + 1].length; k++) {
          if (
            localgroup[j].find(({ _id }) => _id === localgroup[j + 1][k]._id)
          ) {
            c++;
            console.log("c here is", c);
          } else {
            console.log(localgroup[j + 1][k]._id, "unique");
          }
        }
        if (c > 0) {
          console.log("for i", i);
          for (let m = 0; m < localgroup[j + 1].length; m++) {
            if (
              localgroup[j].find(({ _id }) => _id === localgroup[j + 1][m]._id)
            ) {
              continue;
            } else localgroup[j].push(localgroup[j + 1][m]);
          }
          
          geventsgroup[j].push(...geventsgroup[j + 1]);
          console.log("gevent removed", geventsgroup.splice(j + 1, 1));
          localgroup.splice(j + 1, 1);
          i = 0;
          c = 0;
          break;
        }
        j++;
      }
      i++;
    }
    this.setState({ geventsgroup, localgroup });
    console.log(grouping, "g_array");
    console.log(this.state);
  }

  renderConflicts = () => {
    const { geventsgroup, localgroup } = this.state;

    console.log(localgroup, "local");
    console.log(geventsgroup, "google");

    const mappedFinal = geventsgroup.map((ele, key) => {
      const mappedG = ele.map((elem) => {
        return <div><span>{elem.title}</span><br></br></div>;
      });
      
      
       const mappedL = localgroup[key].map((elekid) => {
          return <div><span>{elekid.title}</span><br></br></div>;
       
      });
      console.log(mappedL)
      return (
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <div className="">
              <input
                type="radio"
                id={key}
                name={key}
                className=""
                style={{ margin: "10px" }}
                onClick={this.handleValue(key)}
                defaultChecked
              />
              <label className="" htmlFor="customRadio2">
                {mappedG}
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <input
                type="radio"
                id={key + "dash"}
                name={key}
                className=""
                style={{ margin: "10px" }}
                onClick={this.handleValue2(key)}
              />
              <label className="" htmlFor="customRadio2">
                {mappedL}
              </label>
            </div>
          </div>
        </div>
      );
    });
    console.log(mappedFinal);
    return mappedFinal;
  };
  handleValue = (x) => async (e) => {
    const key2 = x + "dash";
    await this.setState({ [x]: e.target.value, [key2]: "off" });
    console.log(this.state);
  };
  handleValue2 = (x) => async (e) => {
    const key2 = x + "dash";
    await this.setState({ [key2]: e.target.value, [x]: "off" });
    console.log(this.state);
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { geventsgroup, localgroup } = this.state;
    let selected = [];
    geventsgroup.forEach((ele, key) => {
      if (this.state[key] == "on") selected.push(...ele);
      else {
        selected.push(...localgroup[key]);
      }
    });
    console.log(selected);
    const response = await axios.post("/api/calendar/conflicts/resolve", {
      id: this.props.currentUser.id,
      selected,
    });
    console.log(response);
  };
  render() {
    return (
      <div id="app">
        <CheckDetails/>
        <Navbar />
        <div className="content-wrapper">
        <Sidebar />
          <div>{this.state.localgroup ? this.renderConflicts() : ""}</div>
          <button onClick={this.handleSubmit} className="btn btn-danger">
            submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, { getuserDetails })(ConflictResolution);
