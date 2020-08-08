import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar, defaults } from "react-chartjs-2";
import { socket } from "../App";
import {
  STATUS_ONE,
  STATUS_TWO,
  STATUS_THREE,
  STATUS_FOUR,
} from "../utils/status";

import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/NavigationBar";
import BigCalendar from "./BigCalendar";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import CheckDetails from "../components/CheckDetails";

defaults.global.animation = false;

class Home extends Component {
  state = {
    events: null,
    viewableModal: false,
    selectedItem: null,
    chartData: null,
    today: null,
    options: {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Number of Events",
            },
          },
        ],
      },
    },
  };
  changeData = () =>
    socket.emit("initial_data", { userId: this.props.currentUser.id });

  async componentDidMount() {
    console.log("reaching here but what");
      socket.connect()
      socket.emit("initial_data", { userId: this.props.currentUser.id });
      socket.on("get_data", this.getData);
      socket.on("change_data", this.changeData);
      const gresponse = await axios.get(
        `/api/calendar/auth/setToken?id=` + this.props.currentUser.id
      );
      console.log(gresponse);
    
  }
  getData = (item) => {
    console.log("in get dtata")
    let end = new Date();
    end.setDate(end.getDate() + 7);
    let start = new Date();
    start.setDate(start.getDate() - 7);
    let today = new Date();
    today.setDate(today.getDate());

    // for (let i = 1; i <= 7; i++) {
    //   let first = curr.getDate() - curr.getDay() + i;
    //   let day = new Date(curr.setDate(first));
    //   week.push(day);
    // }
    if (!this.state.startDate && !this.state.endDate) {
      this.setState({
        events: item.map((doc, ddx) => ({
          ...doc,
          start: `${doc.date}T${doc.start}`,
          end: `${doc.date}T${doc.end}`,
        })),
        chartData: {
          labels: ["Approved", "In Progress", "Declined", "Cancelled"],
          datasets: [
            {
              label: "Events",
              backgroundColor: "#c6b8e2",
              borderColor: "#635ebe",
              borderWidth: 2,
              hoverBackgroundColor: "#c6b8e2",
              hoverBorderColor: "#635ebe",
              data: [
                item.filter(
                  (i) =>
                    i.status === STATUS_ONE &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(start) &&
                    moment(i.date).format("YYYY-MM-DD") <= this.convertDate(end)
                ).length,
                item.filter(
                  (i) =>
                    i.status === STATUS_TWO &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(start) &&
                    moment(i.date).format("YYYY-MM-DD") <= this.convertDate(end)
                ).length,
                item.filter(
                  (i) =>
                    i.status === STATUS_THREE &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(start) &&
                    moment(i.date).format("YYYY-MM-DD") <= this.convertDate(end)
                ).length,
                item.filter(
                  (i) =>
                    i.status === STATUS_FOUR &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(start) &&
                    moment(i.date).format("YYYY-MM-DD") <= this.convertDate(end)
                ).length,
              ],
            },
          ],
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Y text",
                  },
                },
              ],
            },
          },
        },
        startDate: start,
        endDate: end,
        today,
      });
    } else {
      this.setState({
        events: item.map((doc, ddx) => ({
          ...doc,
          start: `${doc.date}T${doc.start}`,
          end: `${doc.date}T${doc.end}`,
        })),
        chartData: {
          labels: ["Approved", "In Progress", "Declined", "Cancelled"],
          datasets: [
            {
              label: "Events",
              backgroundColor: "#c6b8e2",
              borderColor: "#635ebe",
              borderWidth: 2,
              hoverBackgroundColor: "#c6b8e2",
              hoverBorderColor: "#635ebe",
              data: [
                item.filter(
                  (i) =>
                    i.status === STATUS_ONE &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(this.state.startDate) &&
                    moment(i.date).format("YYYY-MM-DD") <=
                      this.convertDate(this.state.endDate)
                ).length,
                item.filter(
                  (i) =>
                    i.status === STATUS_TWO &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(this.state.startDate) &&
                    moment(i.date).format("YYYY-MM-DD") <=
                      this.convertDate(this.state.endDate)
                ).length,
                item.filter(
                  (i) =>
                    i.status === STATUS_THREE &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(this.state.startDate) &&
                    moment(i.date).format("YYYY-MM-DD") <=
                      this.convertDate(this.state.endDate)
                ).length,
                item.filter(
                  (i) =>
                    i.status === STATUS_FOUR &&
                    moment(i.date).format("YYYY-MM-DD") >=
                      this.convertDate(this.state.startDate) &&
                    moment(i.date).format("YYYY-MM-DD") <=
                      this.convertDate(this.state.endDate)
                ).length,
              ],
            },
          ],
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Y text",
                  },
                },
              ],
            },
          },
        },
      });
    }
  };
  handleStatus = (i) => {
    switch (i.status) {
      case STATUS_ONE:
        return (
          <span className="badge badge-pill badge-success">{i.status}</span>
        );
      case STATUS_TWO:
        return (
          <span className="badge badge-pill badge-warning">{i.status}</span>
        );
      case STATUS_THREE:
        return (
          <span className="badge badge-pill badge-danger">{i.status}</span>
        );
      case STATUS_FOUR:
        return (
          <span className="badge badge-pill badge-secondary">{i.status}</span>
        );
      default:
        return (
          <span className="badge badge-pill badge-success">{i.status}</span>
        );
    }
  };
  convertDate = (str) => {
    if (str === null) return null;
    str = str.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
  };
  handleTotal = (status) => {
    if (this.state.startDate && this.state.endDate) {
      return (
        this.state.events &&
        this.state.events.filter(
          (i) =>
            i.status === status &&
            moment(i.start).format("YYYY-MM-DD") >=
              this.convertDate(this.state.startDate) &&
            moment(i.end).format("YYYY-MM-DD") <=
              this.convertDate(this.state.endDate)
        ).length
      );
    } else {
      return (
        this.state.events &&
        this.state.events.filter((i) => i.status === status).length
      );
    }
  };

  handlePercentage = (status) => {
    return (
      this.state.events &&
      (this.state.events.filter((i) => i.status === status).length /
        this.state.events.length) *
        100
    );
  };

  handleChart = async (inp1, inp2) => {
    const item = this.state.events;
    let { startDate, endDate } = this.state;
    if (inp1 === "startDate") startDate = inp2;
    else endDate = inp2;
    console.log("chart");
    if (startDate === null || endDate === null) {
      this.setState({ [inp1]: inp2 });
    } else {
      await this.setState(
        {
          [inp1]: inp2,
          chartData: {
            labels: ["Approved", "In Progress", "Declined", "Cancelled"],
            datasets: [
              {
                label: "Events",
                backgroundColor: "#c6b8e2",
                borderColor: "#635ebe",
                borderWidth: 2,
                hoverBackgroundColor: "#c6b8e2",
                hoverBorderColor: "#635ebe",
                data: [
                  item.filter(
                    (i) =>
                      i.status === STATUS_ONE &&
                      moment(i.start).format("YYYY-MM-DD") >=
                        this.convertDate(startDate) &&
                      moment(i.end).format("YYYY-MM-DD") <=
                        this.convertDate(endDate)
                  ).length,
                  item.filter(
                    (i) =>
                      i.status === STATUS_TWO &&
                      moment(i.start).format("YYYY-MM-DD") >=
                        this.convertDate(startDate) &&
                      moment(i.end).format("YYYY-MM-DD") <=
                        this.convertDate(endDate)
                  ).length,
                  item.filter(
                    (i) =>
                      i.status === STATUS_THREE &&
                      moment(i.start).format("YYYY-MM-DD") >=
                        this.convertDate(startDate) &&
                      moment(i.end).format("YYYY-MM-DD") <=
                        this.convertDate(endDate)
                  ).length,
                  item.filter(
                    (i) =>
                      i.status === STATUS_FOUR &&
                      moment(i.start).format("YYYY-MM-DD") >=
                        this.convertDate(startDate) &&
                      moment(i.end).format("YYYY-MM-DD") <=
                        this.convertDate(endDate)
                  ).length,
                ],
              },
            ],
            options: {
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Y text",
                    },
                  },
                ],
              },
            },
          },
        },
        () => console.log(this.state.chartData, "lets see")
      );
    }
  };
  handleChart2 = async () => {
    const item = this.state.events;
    console.log("chart");
    await this.setState(
      {
        startDate: null,
        endDate: null,
        chartData: {
          labels: ["Approved", "In Progress", "Declined", "Cancelled"],
          datasets: [
            {
              label: "Events",
              backgroundColor: "#c6b8e2",
              borderColor: "#635ebe",
              borderWidth: 2,
              hoverBackgroundColor: "#c6b8e2",
              hoverBorderColor: "#635ebe",
              data: [
                item.filter((i) => i.status === STATUS_ONE).length,
                item.filter((i) => i.status === STATUS_TWO).length,
                item.filter((i) => i.status === STATUS_THREE).length,
                item.filter((i) => i.status === STATUS_FOUR).length,
              ],
            },
          ],
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Y text",
                  },
                },
              ],
            },
          },
        },
        
      },
      () => console.log(this.state.chartData, "lets see")
    );
  };

  render() {
    console.log(this.state, "STATE");
    console.log(this.convertDate(this.state.today), "date today");
    return (
      <div id="app">
        <CheckDetails />
        <NavigationBar />
        <div className="content-wrapper" style={{ padding: "35px" }}>
          <Sidebar />
          <div className="content container-fluid">
            {/*START PAGE HEADER */}
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Dashboard</h1>
                </div>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={async (date) => {
                    await this.handleChart("startDate", date);
                  }}
                  placeholderText="start date"
                  maxDate={this.state.endDate}
                  className="form-control new_event_title"
                  dateFormat="dd-MM-yyyy"
                  className="right-home-filter"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Select start date range to view Appointments"
                />
                to
                <DatePicker
                  selected={this.state.endDate}
                  onChange={async (date) => {
                    await this.handleChart("endDate", date);
                  }}
                  placeholderText="end date"
                  minDate={this.state.startDate}
                  className="form-control new_event_title mr-3"
                  dateFormat="dd-MM-yyyy"
                  className="right-home-filter"
                  title="Select end date range to view Appointments"
                />
                
              </div>
            </header>
            {/*END PAGE HEADER */}
            {/*START PAGE CONTENT */}
            <section className="page-content container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="row m-0 col-border-xl">
                      <div className="col-md-12 col-lg-6 col-xl-3 py-3 d-flex align-items-center">
                        <div className="card-body">
                          <div className="icon-rounded icon-rounded-success float-left m-r-20">
                            <i className="zmdi zmdi-case-check zmdi-hc-fw" />
                          </div>
                          <h1 className="card-title m-b-5">
                            {this.handleTotal(STATUS_ONE)}
                          </h1>
                          <h6 className="text-muted m-t-10">APPROVED</h6>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-3 d-flex align-items-center">
                        <div className="card-body">
                          <div className="icon-rounded icon-rounded-info float-left m-r-20">
                            <i className="zmdi zmdi-spinner zmdi-hc-fw" />
                          </div>
                          <h1 className="card-title m-b-5">
                            {this.handleTotal(STATUS_TWO)}
                          </h1>
                          <h6 className="text-muted m-t-10">IN PROGRESS</h6>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-3 d-flex align-items-center">
                        <div className="card-body">
                          <div className="icon-rounded icon-rounded-primary float-left m-r-20">
                            <i className="zmdi zmdi-close-circle-o zmdi-hc-fw" />
                          </div>
                          <h1 className="card-title m-b-5">
                            {this.handleTotal(STATUS_THREE)}
                          </h1>
                          <h6 className="text-muted m-t-10">DECLINED</h6>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-3 d-flex align-items-center">
                        <div className="card-body">
                          <div className="icon-rounded icon-rounded-accent float-left m-r-20">
                            <i className="zmdi zmdi-alert-octagon zmdi-hc-fw" />
                          </div>
                          <h1 className="card-title m-b-5">
                            {this.handleTotal(STATUS_FOUR)}
                          </h1>
                          <h6 className="text-muted m-t-10">CANCELLED</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 col-sm-12 mt-3">
                  <div className="card" style={{ maxHeight: 600 }}>
                    <div className="card-header">
                      <span className="m-t-10 d-inline-block">
                        Today's Appointments
                      </span>
                      <ul
                        className="nav nav-pills nav-pills-primary float-right"
                        id="pills-demo-sales"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="pills-month-tab"
                            data-toggle="tab"
                            href="#sales-month-tab"
                            role="tab"
                          >
                            Public
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-year-tab"
                            data-toggle="tab"
                            href="#sales-year-tab"
                            role="tab"
                          >
                            Private
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-year-tab"
                            data-toggle="tab"
                            href="#all"
                            role="tab"
                          >
                            All
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body p-0">
                      <div className="tab-content" id="pills-tabContent-sales">
                        <div
                          className="tab-pane fade show active"
                          id="sales-month-tab"
                          role="tabpanel"
                          aria-labelledby="sales-month-tab"
                        >
                          <table className="table v-align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th className="p-l-20">Name</th>
                                <th>Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.events &&
                                this.state.events
                                  .sort((a, b) => {
                                    var keyA = a.date,
                                      keyB = b.date;
                                    if (keyA > keyB) return -1;
                                    if (keyA < keyB) return 1;
                                    return 0;
                                  })
                                  .filter(
                                    (k) =>
                                      !k.privateEvent &&
                                      moment(k.start).format("YYYY-MM-DD") ===
                                        this.convertDate(this.state.today)
                                  )

                                  .map((i, idx) => (
                                    <tr>
                                      <td>
                                        <strong className="nowrap">
                                          {i.title}
                                        </strong>
                                      </td>
                                      <td>{i.date}</td>
                                      <td>{this.handleStatus(i)}</td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                        <div
                          className="tab-pane fade show "
                          id="all"
                          role="tabpanel"
                          aria-labelledby="all"
                        >
                          <table className="table v-align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th className="p-l-20">Name</th>
                                <th>Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.events &&
                                this.state.events
                                  .sort((a, b) => {
                                    var keyA = a.date,
                                      keyB = b.date;
                                    if (keyA > keyB) return -1;
                                    if (keyA < keyB) return 1;
                                    return 0;
                                  })
                                  .filter(
                                    (k) =>
                                      moment(k.start).format("YYYY-MM-DD") ===
                                      this.convertDate(this.state.today)
                                  )

                                  .map((i, idx) => (
                                    <tr>
                                      <td>
                                        <strong className="nowrap">
                                          {i.title}
                                        </strong>
                                      </td>
                                      <td>{i.date}</td>
                                      <td>{this.handleStatus(i)}</td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="sales-year-tab"
                          role="tabpanel"
                          aria-labelledby="sales-year-tab"
                        >
                          <table className="table v-align-middle">
                            <thead className="bg-light">
                              <tr>
                                <th className="p-l-20">Name</th>
                                <th>Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.events &&
                                this.state.events
                                  .sort((a, b) => {
                                    var keyA = a.date,
                                      keyB = b.date;
                                    if (keyA > keyB) return -1;
                                    if (keyA < keyB) return 1;
                                    return 0;
                                  })
                                  .filter(
                                    (k) =>
                                      k.privateEvent &&
                                      moment(k.start).format("YYYY-MM-DD") ===
                                        this.convertDate(this.state.today)
                                  )

                                  .map((i, idx) => (
                                    <tr>
                                      <td>
                                        <strong className="nowrap">
                                          {i.title}
                                        </strong>
                                      </td>
                                      <td>{i.date}</td>
                                      <td>{this.handleStatus(i)}</td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        className="cp mr-3 mb-2"
                        onClick={() => this.props.history.push("/events")}
                      >
                        View All
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-sm-12 card">
                  <Bar data={this.state.chartData} width={100} height={50} options={this.state.options}/>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      List of Events
                      <ul className="actions top-right">
                        <li>
                          <a
                            href="javascript:void(0)"
                            data-q-action="card-expand"
                          >
                            <i className="icon dripicons-expand-2" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table
                          className="table table-striped table-bordered"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>S.NO</th>
                              <th>TITLE</th>
                              <th>FULLNAME</th>
                              <th>EMAIL</th>
                              <th>DATE</th>
                              <th>STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.events &&
                              this.state.events.map((i, idx) => (
                                <tr>
                                  <td>{idx + 1}</td>
                                  <td>{i.title}</td>
                                  <td>{i.fullName}</td>
                                  <td>{i.email}</td>
                                  <td>{i.date}</td>
                                  <td>{this.handleStatus(i)}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="cp"
                        onClick={() => this.props.history.push("/events")}
                      >
                        View More
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </section>
            {/*END PAGE CONTENT */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps)(Home);
