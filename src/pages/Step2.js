import React from "react";
import { Select } from "antd";
import classNames from "classnames";
import { validDuration, validBreak } from "../utils/timecheck";

const { Option } = Select;

class Step2 extends React.Component {
  state = {
    timelist: [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30",
      "00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "OFF",
    ],
    timeFilled: "",
    breakError: "",
    show0: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    let { workdays } = this.props;
    // console.log("workdays", workdays);
    // window.addEventListener('click', function(e){
    //   if (document.getElementsByClassName('drop-card').forEach((el)).contains(e.target)){
    //     console.log("see clicked")
    //   } else{

    //   }
    // });
    const self = this;
    window.addEventListener("click", function (e) {
      console.log("click");
      if (e.target.name !== "dropdown")
        for (let index = 0; index < 7; index++) {
          const x = `show${index}`;
          if (self.state[x]) self.setState({ [x]: false });
        }
    });
    this.setState({ workdays });
  };
  componentDidUpdate = () => {
    console.log(this.state, "uptadejd");
  };
  timezoneList = () => {
    const { timezone, handleChange } = this.props;
    return (
      <select
        name="timezone"
        id="timezone-offset"
        className=""
        onChange={handleChange("timezone")}
        value={timezone}
      >
        <option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
        <option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
        <option value="-10:00">(GMT -10:00) Hawaii</option>
        <option value="-09:50">(GMT -9:30) Taiohae</option>
        <option value="-09:00">(GMT -9:00) Alaska</option>
        <option value="-08:00">
          (GMT -8:00) Pacific Time (US &amp; Canada)
        </option>
        <option value="-07:00">
          (GMT -7:00) Mountain Time (US &amp; Canada)
        </option>
        <option value="-06:00">
          (GMT -6:00) Central Time (US &amp; Canada), Mexico City
        </option>
        <option value="-05:00">
          (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
        </option>
        <option value="-04:50">(GMT -4:30) Caracas</option>
        <option value="-04:00">
          (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
        </option>
        <option value="-03:50">(GMT -3:30) Newfoundland</option>
        <option value="-03:00">
          (GMT -3:00) Brazil, Buenos Aires, Georgetown
        </option>
        <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
        <option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
        <option value="+00:00" selected="selected">
          (GMT) Western Europe Time, London, Lisbon, Casablanca
        </option>
        <option value="+01:00">
          (GMT +1:00) Brussels, Copenhagen, Madrid, Paris
        </option>
        <option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
        <option value="+03:00">
          (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
        </option>
        <option value="+03:50">(GMT +3:30) Tehran</option>
        <option value="+04:00">
          (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
        </option>
        <option value="+04:50">(GMT +4:30) Kabul</option>
        <option value="+05:00">
          (GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
        </option>
        <option value="+05:50">
          (GMT +5:30) Bombay, Calcutta, Madras, New Delhi
        </option>
        <option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
        <option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
        <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
        <option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
        <option value="+08:00">
          (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
        </option>
        <option value="+08:75">(GMT +8:45) Eucla</option>
        <option value="+09:00">
          (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
        </option>
        <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
        <option value="+10:00">
          (GMT +10:00) Eastern Australia, Guam, Vladivostok
        </option>
        <option value="+10:50">(GMT +10:30) Lord Howe Island</option>
        <option value="+11:00">
          (GMT +11:00) Magadan, Solomon Islands, New Caledonia
        </option>
        <option value="+11:50">(GMT +11:30) Norfolk Island</option>
        <option value="+12:00">
          (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
        </option>
        <option value="+12:75">(GMT +12:45) Chatham Islands</option>
        <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
        <option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
      </select>
    );
  };

  timeList1 = (inp1, inp2, inp3) => {
    console.log("one");
    return (
      <Select
        style={{ width: 120 }}
        className="mr-2"
        onChange={(e) => this.handleTime(e, inp1, inp3)}
        value={
          this.state.workdays[inp3] === undefined
            ? inp2
            : this.state.workdays[inp3].start
        }
        name={inp1}
      >
        {this.state.timelist.map((item, idx) => (
          <Option
            value={item}
            key={idx}
            disabled={this.state.timeFilled.includes(item)}
          >
            {item}
          </Option>
        ))}
      </Select>
    );
  };
  timeList2 = (inp1, inp2, inp3) => {
    console.log("two");
    return (
      <Select
        style={{ width: 120 }}
        className="mr-2"
        onChange={(e) => this.handleTime(e, inp1, inp3)}
        value={
          this.state.workdays[inp3] === undefined && this.state.workdays
            ? "OFF"
            : this.state.workdays[inp3].end
        }
        name={inp1}
      >
        {this.state.timelist
          .slice(0, this.state.timelist.length - 1)
          .map((item, idx) => (
            <Option
              value={item}
              key={idx}
              disabled={this.state.timeFilled.includes(item)}
            >
              {item}
            </Option>
          ))}
      </Select>
    );
  };
  timeList3 = (inp1, inp2, inp3) => {
    console.log("two");
    return (
      <Select
        style={{ width: "80%", display: "block", margin: "20px auto" }}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => this.handleBreak(e, inp3)}
        value={this.state[inp3] ? this.state[inp3] : inp1}
        name={inp1}
      >
        {this.state.timelist
          .slice(0, this.state.timelist.length - 1)
          .map((item, idx) => (
            <Option
              value={item}
              key={idx}
              disabled={this.state.timeFilled.includes(item)}
            >
              {item}
            </Option>
          ))}
      </Select>
    );
  };

  handleTime = (value, fieldtype, inp3) => {
    const { handleTiming } = this.props;
    const { workdays } = this.state;
    const currentDay = workdays[inp3].day;
    if (value === "OFF")
      workdays.splice(inp3, 1, {
        off: true,
        day: currentDay,
        start: "OFF",
        end: "End Time",
        breaks: [],
      });
    else {
      if (fieldtype === "start") {
        const { end, breaks } = this.state.workdays[inp3];
        workdays.splice(inp3, 1, {
          off: false,
          day: currentDay,
          [fieldtype]: value,
          end,
          breaks,
        });
      } else {
        const { start, breaks } = this.state.workdays[inp3];
        workdays.splice(inp3, 1, {
          off: false,
          day: currentDay,
          [fieldtype]: value,
          start,
          breaks,
        });
      }
    }
    handleTiming(workdays);
    this.setState({ workdays, breakError: "" });
    console.log("starte here", this.state);
    // handleTiming(value, fieldtype);
  };

  handleBreak = (value, fieldtype) => {
    this.setState({ [fieldtype]: value, breakError: "" });
    console.log("starte here", this.state);
    // handleTiming(value, fieldtype);
  };
  addBreak(inp3) {
    const { handleTiming } = this.props;
    const str = "show" + inp3;
    console.log("inp3", inp3);
    const { workdays } = this.state;
    if (
      validBreak(
        workdays[inp3].start,
        workdays[inp3].end,
        this.state.startBreak,
        this.state.endBreak
      )
    ) {
      console.log("break", workdays[inp3]);
      workdays[inp3].breaks.push({
        start: this.state.startBreak,
        end: this.state.endBreak,
      });
      handleTiming(workdays);
      this.setState({
        workdays,
        startBreak: "start",
        endBreak: "end",
        [str]: false,
        breakError: "",
      });
    } else {
      this.setState({
        breakError: "Invalid break",
      });
    }
  }
  showDrop = (idx) => {
    const str = "show" + idx;
    console.log(str);
    console.log(this.state[str], this.state, "strhere");
    return this.state[str] === undefined ? false : this.state[str];
  };
  deleteBreak = (inp1, inp3) => {
    const { handleTiming } = this.props;
    const { workdays } = this.state;
    console.log("break", workdays[inp1]);
    handleTiming(workdays);
    workdays[inp1].breaks.splice(inp3, 1);
    this.setState({ workdays });
  };
  // mapTime = () => {
  //   if (this.state.workdays)
  //     return this.state.workdays.map((item, idx) => {
  //       if (item.off===false) {
  //         var mapbreaks = item.breaks.map((b, i) => {
  //           if (item.breaks.length === 0) return "";
  //           else
  //             return (
  //               <div className="break flexing-child">
  //                 <span className="spanners">
  //                   {" "}
  //                   {b.start}-{b.end}{" "}
  //                 </span>
  //                 <span
  //                   className="crosses"
  //                   onClick={(e) => this.deleteBreak(idx, i)}
  //                 >
  //                   {" "}
  //                   x
  //                 </span>
  //               </div>
  //             );
  //         });
  //       } else var mapbreaks = "";
  //       console.log("spans", mapbreaks);
  //       return (
  //         <div>
  //           <div className="row">
  //             <div className="col-md-1">
  //               <div className="form-group row">
  //                 <label htmlFor={item.day}>{item.day}</label>
  //               </div>
  //             </div>
  //             <div className="col-md-3" style={{"paddingRight":"0"}}>
  //               {this.timeList1("start", "OFF", idx)}
  //             </div>
  //             <div >
  //               {this.state.workdays[idx] &&
  //               this.state.workdays[idx].off === true
  //                 ? ""
  //                 : "to"}
  //             </div>

  //             <div className="col-md-3" style={{"padding":"0"}}>
  //               {this.state.workdays[idx] &&
  //               this.state.workdays[idx].off === true
  //                 ? ""
  //                 : this.timeList2("end", "", idx)}
  //             </div>

  //             {this.state.workdays[idx] &&
  //             this.state.workdays[idx].end === "End Time" ? (
  //               ""
  //             ) : (
  //               <div className="col-md-3" style={{"padding":"0", width:"70px"}}>
  //                 <div class="dropdown" style={{"padding":"0", width:"70px"}}>
  //                   <a
  //                     href="#"
  //                     role="button"
  //                     onClick={(e) => {
  //                       e.preventDefault();
  //                       console.log(this.state.workdays[idx].end, "see here");
  //                       const str = "show" + idx;
  //                       this.setState({ [str]: true });
  //                       console.log(this.state[str], "fine here");
  //                     }}
  //                   >
  //                     add break
  //                   </a>
  //                   <div
  //                     class={classNames({ "drop-card": true })}
  //                     style={
  //                       this.showDrop(idx)
  //                         ? { display: "block" }
  //                         : { display: "none" }
  //                     }
  //                     aria-labelledby="dropdownMenuLink"
  //                     onClick={(e) => e.stopPropagation()}
  //                   >
  //                     <div className="row">
  //                       <div className="col-md-6">
  //                         {this.timeList3("start", "OFF", "startBreak")}
  //                       </div>
  //                       <div className="col-md-6">
  //                         {this.state.workdays[idx] &&
  //                         this.state.workdays[idx].off === true
  //                           ? ""
  //                           : this.timeList3("end", "", "endBreak")}
  //                       </div>
  //                     </div>
  //                         <p>{this.state.breakError}</p>
  //                     <button
  //                       className="next action-button"
  //                       style={{ display: "block", margin: "0px auto" }}
  //                       onClick={(e) => {
  //                         e.preventDefault();
  //                         this.addBreak(idx);
  //                       }}
  //                     >
  //                       ADD
  //                     </button>
  //                   </div>
  //                 </div>
  //                 <div className="flexing">{mapbreaks}</div>
  //               </div>
  //             )}
  //           </div>
  //           <div className="row" style={{ height: "10px" }}></div>
  //         </div>
  //       );
  //     });
  //   else return <div>loading</div>;
  // };
  mapTime = () => {
    if (this.state.workdays)
      return this.state.workdays.map((item, idx) => {
        if (item.off === false) {
          var mapbreaks = item.breaks.map((b, i) => {
            if (item.breaks.length === 0) return "";
            else
              return (
                <div
                  className="break flexing-child"
                  style={{ display: "inline-block" }}
                >
                  <span className="spanners">
                    {" "}
                    {b.start}-{b.end}{" "}
                  </span>
                  <span
                    className="crosses"
                    onClick={(e) => this.deleteBreak(idx, i)}
                  >
                    {" "}
                    x
                  </span>
                </div>
              );
          });
        } else var mapbreaks = "";
        console.log("spans", mapbreaks);
        return (
          <React.Fragment>
          <div
            style={
              this.showDrop(idx)
                ? {
                    display: "inline-block",
                    overflowX:"auto",
                    whiteSpace: "nowrap",
                    maxWidth: "720px",
                    minWidth:"720px",
                    height:"200px",
                    zIndex: -1,
                  }
                : {
                    display: "inline-block",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    maxWidth: "720px",
                    minWidth:"720px",
                    zIndex: -1,
                  }
            }
          >
            <div className="">
              <div className="col-md-1" style={{ display: "inline-block", paddingRight:"50px"}}>
                <div className="form-group row">
                  <label htmlFor={item.day}>{item.day}</label>
                </div>
              </div>
              <div
                className="col-md-3"
                style={{ display: "inline-block", paddingLeft:"15px" ,width:"130px"}}
              >
                {this.timeList1("start", "OFF", idx)}
              </div>
              <div
                className="col-md-1"
                style={{
                  display: "inline-block",
                  paddingRight: "25px",
                  width: "40px",
                  paddingLeft: "20px",
                }}
              >
                {this.state.workdays[idx] &&
                this.state.workdays[idx].off === true
                  ? ""
                  : "to"}
              </div>

              <div
                className="col-md-3"
                style={{
                  display: "inline-block",
                  paddingLeft: "0px",
                  width:"140px"
                }}
              >
                {this.state.workdays[idx] &&
                this.state.workdays[idx].off === true
                  ? ""
                  : this.timeList2("end", "", idx)}
              </div>

              {this.state.workdays[idx] &&
              this.state.workdays[idx].end === "End Time" ? (
                ""
              ) : (
                <React.Fragment>
                  <div
                    className=""
                    style={{
                      display: "inline-block",
                      position: "relative",
                      oveflow: "visible",
                    }}
                    name="dropdown"
                  >
                    <div
                      class="dropdown"
                      style={{ padding: "0", width: "70px" }}
                      name="dropdown"
                    >
                      <a
                        href="#"
                        role="button"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(this.state.workdays[idx].end, "see here");
                          const str = "show" + idx;
                          this.setState({ [str]: true });
                          console.log(this.state[str], "fine here");
                        }}
                        name="dropdown"
                      >
                        add break
                      </a>
                      <div
                        class={classNames({ "drop-card": true })}
                        style={
                          this.showDrop(idx)
                            ? { display: "block", overflow: "visible" }
                            : { display: "none" }
                        }
                        aria-labelledby="dropdownMenuLink"
                        onClick={(e) => e.stopPropagation()}
                        name="dropdown"
                      >
                        <div className="row" name="dropdown">
                          <div className="col-md-6" name="dropdown">
                            {this.timeList3("start", "OFF", "startBreak")}
                          </div>
                          <div className="col-md-6" name="dropdown">
                            {this.state.workdays[idx] &&
                            this.state.workdays[idx].off === true
                              ? ""
                              : this.timeList3("end", "", "endBreak")}
                          </div>
                        </div>
                        <p>{this.state.breakError}</p>
                        <button
                          name="dropdown"
                          className="next action-button"
                          style={{ display: "block", margin: "0px auto" }}
                          onClick={(e) => {
                            e.preventDefault();
                            this.addBreak(idx);
                          }}
                        >
                          ADD
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    {mapbreaks}
                  </div>
                  
                </React.Fragment>
              )}
            </div>
          </div>
           <div className="row" style={{height:"10px"}}></div>
           </React.Fragment>
        );
      });
    else return <div>loading</div>;
  };

  continue = (e) => {
    e.preventDefault();

    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { handleChange, worktype, workservice } = this.props;

    return (
      <fieldset style={{ textAlign: "left" }}>
        <p>Please Enter Operating hours </p>
        {this.mapTime()}

        <br />

        <button
          className="previous action-button-previous align-left"
          onClick={this.back}
        >
          Previous
        </button>
        <button
          type="button"
          className="next action-button align-right"
          onClick={this.continue}
        >
          Next
        </button>
      </fieldset>
    );
  }
}

export default Step2;
