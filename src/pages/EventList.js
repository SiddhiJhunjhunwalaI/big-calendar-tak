import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/NavigationBar";
import { socket } from "../App";
import {
  STATUS_ONE,
  STATUS_TWO,
  STATUS_THREE,
  STATUS_FOUR,
} from "../utils/status";
import DatePicker from "react-datepicker";
import moment from "moment";
import CheckDetails from "../components/CheckDetails";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "./datatable.css";

export class EventList extends Component {
  state = {
    events: null,
    viewableModal: false,
    selectedItem: null,
    activePage: 1,
    totalPages: null,
    startIndex: 0,
    endIndex: 10,
    count: 10,
    tableData: {},
    mappedE: [],
  };
  changeData = () =>
    socket.emit("initial_data", { userId: this.props.currentUser.id });

  componentDidMount() {
    if (this.props.currentUser) {
      socket.emit("initial_data", { userId: this.props.currentUser.id });
      socket.on("get_data", this.getData);
      socket.on("change_data", this.changeData);
    }
    let end = new Date();
    end.setDate(end.getDate() + 30);
    let start = new Date();
    start.setDate(start.getDate());

    // for (let i = 1; i <= 7; i++) {
    //   let first = curr.getDate() - curr.getDay() + i;
    //   let day = new Date(curr.setDate(first));
    //   week.push(day);
    // }
    this.setState({ startDate: start, endDate: end });
    this.renderTable();
  }
  getData = (item) => {
    this.setState(
      {
        events: item.map((doc, ddx) => ({
          ...doc,
          start: `${doc.date}T${doc.start}`,
          end: `${doc.date}T${doc.end}`,
        })),
        totalPages: item.length,
      },
      () => this.setFilter()
    );
    this.renderTable("J", "K");
  };

  handleEventUpdate = (id, status) => {
    socket.emit("updateStatus", { id, status });
  };
  convertDate = (str) => {
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
  handlePageChange(pageNumber) {
    this.setState({
      startIndex: this.state.count * pageNumber - this.state.count,
      endIndex: this.state.count * pageNumber,
      activePage: pageNumber,
      selected: -1,
    });
  }

  handleStatus = (i) => {
    if (i)
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
          return <span className="">-</span>;
      }
  };

  handleConfirm = (i) => {
    switch (i.status) {
      case STATUS_TWO:
        return (
          <React.Fragment>
            <span
              className="badge badge-pill badge-success mr-2"
              onClick={() => this.handleEventUpdate(i._id, STATUS_ONE)}
            >
              Approve
            </span>
            <span
              className="badge badge-pill badge-danger"
              onClick={() => this.handleEventUpdate(i._id, STATUS_THREE)}
            >
              Decline
            </span>
          </React.Fragment>
        );
      case STATUS_ONE:
        return (
          <span
            className="badge badge-pill badge-secondary"
            onClick={() => this.handleEventUpdate(i._id, STATUS_FOUR)}
          >
            Cancel
          </span>
        );

      default:
        return <span>--</span>;
    }
  };
  setFilter = () => {
    const { startDate, endDate } = this.state;

    let mapped = this.state.events.filter(
      (i) =>
        moment(i.start).format("YYYY-MM-DD") >= this.convertDate(startDate) &&
        moment(i.end).format("YYYY-MM-DD") <= this.convertDate(endDate)
    );

    this.setState({ mappedE: mapped });
  };
  mapTableData = (startDate, endDate) => {
    let mapped = [];
    console.log("startDate", startDate, "enddate", endDate);
    if (startDate !== null && endDate !== null && this.state.events)
      mapped = this.state.events
        .filter((i) => {
          if (
            moment(i.start).format("YYYY-MM-DD") >=
              this.convertDate(startDate) &&
            moment(i.end).format("YYYY-MM-DD") <= this.convertDate(endDate)
          ) {
            console.log(
              i.start,
              moment(i.start).format("YYYY-MM-DD"),
              this.convertDate(startDate),
              moment(i.end).format("YYYY-MM-DD"),
              this.convertDate(endDate),
              "dates"
            );
            return i;
          }
        })
        .map((i, idx) => {
          console.log(
            moment(i.start).format("YYYY-MM-DD"),
            this.convertDate(new Date().toString()),
            "this issue"
          );
          return {
            SNO: idx + 1,
            TITLE: i.title,
            FULLNAME: i.fullName,
            EMAIL: i.email,
            DATE: i.date,
            STATUS: i.status,
            ACTIONS: idx,
          };
        });
    else if (this.state.events) {
      console.log("no dates");
      mapped = this.state.events.map((i, idx) => {
        return {
          SNO: idx + 1,
          TITLE: i.title,
          FULLNAME: i.fullName,
          EMAIL: i.email,
          DATE: i.date,
          STATUS: i.status,
          ACTIONS: idx,
        };
      });
      console.log(mapped, "hereee");
    }

    return mapped;
  };

  returniconJSX = (i) => {
    console.log(moment(this.state.mappedE[i].start).format("YYYY-MM-DD") >=
    this.convertDate(new Date().toString()),moment(this.state.mappedE[i].start).format("YYYY-MM-DD"),this.convertDate(new Date().toString()),"response")
    return (
      <React.Fragment>
        <div></div>
        <div class="dropdown dropdown-lol">
          <a
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="icon dripicons-gear text-success"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-left dropdown-xD"
            aria-labelledby="dropdownMenuLink"
          >
            <span
              class="dropdown-item"
              onClick={() =>
                this.setState({
                  selectedItem: this.state.mappedE[i],
                  viewableModal: true,
                })
              }
            >
              View more
            </span>
            <span
              class="dropdown-item"
              onClick={() => {
                this.handleEventUpdate(
                  this.state.mappedE[i] ? this.state.mappedE[i]._id : "",
                  STATUS_ONE
                );
              }}
              hidden={
                this.state.mappedE[i] &&
                  this.state.mappedE[i].status === STATUS_ONE ||
                !(moment(this.state.mappedE[i].start).format("YYYY-MM-DD") >=
                  this.convertDate(new Date().toString()))
                  ? true
                  : false
              }
            >
              Accept
            </span>
            <span
              class="dropdown-item"
              onClick={() => {
                this.handleEventUpdate(
                  this.state.mappedE[i] ? this.state.mappedE[i]._id : "",
                  STATUS_THREE
                );
              }}
              hidden={
                this.state.mappedE[i] &&
                  this.state.mappedE[i].status === STATUS_THREE ||
                !(moment(this.state.mappedE[i].start).format("YYYY-MM-DD") >=
                  this.convertDate(new Date().toString()))
                  ? true
                  : false
              }
            >
              Decline
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  };
  renderTable = (key, val) => {
    let { startDate, endDate } = this.state;
    if (key === "startDate") {
      startDate = val;
    }
    if (key === "endDate") endDate = val;
    if (key == null) {
      startDate = null;
      endDate = null;
    }
    this.setState({
      tableData: {
        data: this.mapTableData(startDate, endDate),
        columns: [
          {
            name: "S.NO",
            selector: "SNO",
            sortable: "true",
            maxWidth: "50px",
            minWidth: "10px",
          },
          { name: "TITLE", selector: "TITLE", sortable: "true" },
          { name: "FULLNAME", selector: "FULLNAME", sortable: "true" },
          { name: "EMAIL", selector: "EMAIL", sortable: "true" },
          { name: "DATE", selector: "DATE", sortable: "true" },
          {
            name: "STATUS",
            selector: "STATUS",
            sortable: "true",
            cell: (i) =>
              this.handleStatus(
                moment(this.state.mappedE[i.ACTIONS].start).format(
                  "YYYY-MM-DD"
                ) >= this.convertDate(new Date().toString())
                  ? this.state.mappedE[i.ACTIONS]
                  : "-"
              ),
          },
          {
            name: "ACTIONS",
            selector: "ACTIONS",
            sortable: "true",
            cell: (i) => this.returniconJSX(i.ACTIONS),
          },
        ],
      },
    });
  };
  render() {
    console.log(this.state, "state");
    const { selectedItem } = this.state;
    return (
      <div id="app">
        <CheckDetails />
        <NavigationBar />
        <div className="content-wrapper">
          <Sidebar />
          <div className="content">
            {/*START PAGE HEADER */}
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Appointments</h1>
                </div>
                {/* <ul className="actions top-right">
                  <li className="dropdown">
                    <a href="javascript:void(0)" className="btn btn-fab" data-toggle="dropdown" aria-expanded="false">
                      <i className="la la-ellipsis-h" />
                    </a>
                    <div className="dropdown-menu dropdown-icon-menu dropdown-menu-right">
                      <div className="dropdown-header">Quick Actions</div>
                      <a href="#" className="dropdown-item">
                        <i className="icon dripicons-clockwise" /> Refresh
                      </a>
                      <a href="#" className="dropdown-item">
                        <i className="icon dripicons-gear" /> Manage Widgets
                      </a>
                      <a href="#" className="dropdown-item">
                        <i className="icon dripicons-cloud-download" /> Export
                      </a>
                      <a href="#" className="dropdown-item">
                        <i className="icon dripicons-help" /> Support
                      </a>
                    </div>
                  </li>
                </ul> */}
                <DatePicker
                  selected={this.state.startDate}
                  onChange={(date) => {
                    this.setState({ startDate: date }, () => this.setFilter());
                    this.renderTable("startDate", date);
                  }}
                  placeholderText="start date"
                  maxDate={this.state.endDate}
                  className=" right-home-filter"
                  dateFormat="dd-MM-yyyy"
                  title="Select start date range to view Appointments"
                />
                to
                <DatePicker
                  selected={this.state.endDate}
                  onChange={(date) => {
                    this.setState({ endDate: date }, () => this.setFilter());
                    this.renderTable("endDate", date);
                  }}
                  placeholderText="end date"
                  minDate={this.state.startDate}
                  className=" right-home-filter"
                  dateFormat="dd-MM-yyyy"
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
                    <div className="card-header">List of Appointments</div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <DataTableExtensions
                          {...this.state.tableData}
                          export={false}
                          print={false}
                        >
                          <DataTable
                            striped={true}
                            pagination={true}
                            highlightOnHover
                            customStyles={{
                              header: { style: { minHeight: "0" } },
                              table: {
                                style: {
                                  color: "#617182 !important",
                                  fontFamily: "Poppins,sans-serif",
                                },
                              },
                              stripedStyle: {
                                "rdt_TableRow:nth-of-type(odd)": {
                                  backgroundColor: "#F0F6FF",
                                },
                              },
                            }}
                            className="dataTables_wrapper container-fluid dt-bootstrap4 table table-striped dataTable"
                          ></DataTable>
                        </DataTableExtensions>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className="mt-5 d-flex justify-content-center"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </section>
          </div>
        </div>
        <Modal
          isOpen={this.state.viewableModal}
          toggle={() =>
            this.setState({ viewableModal: !this.state.viewableModal })
          }
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Event Details</h5>
              <button
                type="button"
                className="close"
                onClick={() =>
                  this.setState({ viewableModal: !this.state.viewableModal })
                }
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form-event">
                <div className="form-group row">
                  <label htmlFor="editTitle" className="col-md-2 control-label">
                    Title
                  </label>
                  <div className="col-md-10">
                    {selectedItem && selectedItem.title}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">Date</label>
                  <div className="col-md-10">
                    <div className="form-group m-0">
                      {selectedItem &&
                        selectedItem.start.substring(
                          0,
                          selectedItem.start.indexOf("T")
                        )}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">Time</label>
                  <div className="col-md-10">
                    <div className="form-group m-0">
                      {selectedItem &&
                        selectedItem.start.substring(
                          selectedItem.start.indexOf("T") + 1
                        )}{" "}
                      -{" "}
                      {selectedItem &&
                        selectedItem.end.substring(
                          selectedItem.end.indexOf("T") + 1
                        )}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">Full Name</label>
                  <div className="col-md-10">
                    {selectedItem && selectedItem.fullName}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Email</label>
                  <div className="col-md-10">
                    {selectedItem && selectedItem.email}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Phone Number</label>
                  <div className="col-md-10">
                    {selectedItem && selectedItem.phoneNumber}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Description</label>
                  <div className="col-md-10">
                    {selectedItem && selectedItem.desc}
                  </div>
                </div>
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.setState({ viewableModal: false })}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps)(EventList);
