import React from "react";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import classNames from "classnames";
import { Select } from "antd";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";

import CustomToolbar from "../components/CustomToolbar";
import Sidebar from "../components/Sidebar";
import NavigationBar from "../components/NavigationBar";
import events from "../utils/events";
import { submitEvent } from "../actions";
import { socket } from "../App";
import { STATUS_ONE } from "../utils/status";
import axios from "axios";
import CheckDetails from "../components/CheckDetails";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const { Option } = Select;

class BigCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      addModal: false,
      editModal: false,
      id: null,
      title: "",
      email: "",
      desc: "",
      start: "",
      end: "",
      fullName: "",
      phoneNumber: "",
      date: null,
      g_created: null,
      privateEvent: true,
      errors: {
        title: true,
        email: true,
        desc: true,
        start: true,
        end: true,
        fullName: true,
        phoneNumber: true,
      },
      showclass: true,
      showForm: false,
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
      ],
      selectedEvent: null,
      timeFilled: [],
      timeFilledEnd: [],
      timeFilledOriginal: [],
      timeFilledEndOriginal: [],
      start: null,
      end: null,
      editable: false,
      emailError: false,
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  getData = (item) => {
    this.setState({
      events: item.map((doc, ddx) => ({
        ...doc,
        start: `${doc.date}T${doc.start}`,
        end: `${doc.date}T${doc.end}`,
      })),
    });
    console.log("event getdata",this.props.currentUser.id)
  };

  changeData = () =>{
    socket.emit("initial_data", { userId: this.props.currentUser.id });
    console.log("currentuser changedata",this.props.currentUser.id)
  }
   

  componentDidMount() {
    if (this.props.currentUser) {
      socket.emit("initial_data", { userId: this.props.currentUser.id });
      socket.on("get_data", this.getData);
      socket.on("change_data", this.changeData);
      socket.emit("initial_data", { userId: this.props.currentUser.id });
    }
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });
  }

  handleChange = (value, fieldType) => {
    if (fieldType === "start") {
      const x = this.state.timeFilledEndOriginal.find(
        (k) =>
          this.state.timelist.indexOf(k) > this.state.timelist.indexOf(value)
      );

      if (x) {
        this.setState({
          timeFilledEnd: [
            ...this.state.timeFilledEndOriginal,
            ...this.state.timelist.slice(this.state.timelist.indexOf(x)),
            ...this.state.timelist.slice(
              0,
              this.state.timelist.indexOf(value) + 1
            ),
          ],
        });
      } else {
        this.setState({
          timeFilledEnd: [
            ...this.state.timeFilledEndOriginal,
            ...this.state.timelist.slice(
              0,
              this.state.timelist.indexOf(value) + 1
            ),
          ],
        });
      }
    }

    this.setState({
      [fieldType]: value,
      errors: { ...this.state.errors, [fieldType]: !value },
    });
  };
  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  toggleModal = (e) => {
    const p = this.state.events
      .filter((f, fdx) => moment(e.start).format("YYYY-MM-DD") === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split("T")[1]),
          this.state.timelist.indexOf(i.end.split("T")[1])
        )
      );

    const p2 = this.state.events
      .filter((f, fdx) => moment(e.start).format("YYYY-MM-DD") === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split("T")[1]) + 1,
          this.state.timelist.indexOf(i.end.split("T")[1]) + 1
        )
      );

    console.log(p, "CCCC");

    this.setState({
      addModal: !this.state.addModal,
      date: moment(e.start).format("YYYY-MM-DD"),
      timeFilled: p.reduce((a, b) => a.concat(b), []),
      timeFilledOriginal: p.reduce((a, b) => a.concat(b), []),
      timeFilledEnd: p2.reduce((a, b) => a.concat(b), []),
      timeFilledEndOriginal: p2.reduce((a, b) => a.concat(b), []),
      g_created: null,
    });
  };

  toggleModalEdit = (e) => {
    console.log(e, "Edit Event");
    const p = this.state.events
      .filter((f, fdx) => moment(e.start).format("YYYY-MM-DD") === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split("T")[1]),
          this.state.timelist.indexOf(i.end.split("T")[1])
        )
      );

    const p2 = this.state.events
      .filter((f, fdx) => moment(e.start).format("YYYY-MM-DD") === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split("T")[1]) + 1,
          this.state.timelist.indexOf(i.end.split("T")[1]) + 1
        )
      );

    this.setState({
      addModal: !this.state.addModal,
      id: e._id,
      title: e.title,
      email: e.email,
      privateEvent: e.privateEvent,
      desc: e.desc,
      start: moment(e.start).format("HH:mm"),
      end: moment(e.end).format("HH:mm"),
      date: moment(e.date).format("YYYY-MM-DD"),
      fullName: e.fullName,
      phoneNumber: e.phoneNumber,
      timeFilled: p.reduce((a, b) => a.concat(b), []),
      timeFilledEnd: p2.reduce((a, b) => a.concat(b), []),
      timeFilledOriginal: p.reduce((a, b) => a.concat(b), []),
      timeFilledEndOriginal: p2.reduce((a, b) => a.concat(b), []),
      editable: true,
      g_created: e.g_created,
    });
  };
  handleField = (e, fieldType) => {
    this.setState({
      [fieldType]: e.target.value,
      errors: { ...this.state.errors, [fieldType]: !e.target.value },
      emailError: false,
    });
  };

  handleErrors = (params) => {
    return (
      this.state.showError &&
      this.state.errors[params] && (
        <div className="invalid-feedback">This field cannot be empty</div>
      )
    );
  };
  handleEmailErrors = (params) => {
    return (
      this.state.showError &&
      !this.state.errors[params] &&
      this.state.emailError && (
        <div className="invalid-feedback">This email is invalid</div>
      )
    );
  };

  handleTimeError = (params) => {
    return (
      this.state.showError &&
      this.state.errors[params] && (
        <div style={{ color: "red", fontSize: 12 }}>Select Time</div>
      )
    );
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.setState({ showError: true });
    if (!this.validateEmail(this.state.email)) {
      console.log("here but useless");
      return this.setState({ emailError: true });
    }
    this.setState(
      {
        errors: {
          ...this.state.errors,
          title: !this.state.title,
          email: !this.state.email,
          desc: !this.state.desc,
          start: !this.state.start,
          end: !this.state.end,
          fullName: !this.state.fullName,
          phoneNumber: !this.state.phoneNumber,
        },
      },
      () => {
        if (Object.values(this.state.errors).every((i) => !i)) {
          const {
            title,
            email,
            desc,
            start,
            end,
            fullName,
            phoneNumber,
            date,
            privateEvent,
          } = this.state;
          console.log("event",this.props.currentUser.id)
          socket.emit("submitEvent", {
            _user: this.props.currentUser.id,
            title,
            email,
            desc,
            start,
            end,
            fullName,
            phoneNumber,
            date,
            privateEvent,
            status: STATUS_ONE,
          });
          this.handleClose();
        }
      }
    );
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ showError: true });

    this.setState(
      {
        errors: {
          ...this.state.errors,
          title: !this.state.title,
          email: !this.state.email,
          desc: !this.state.desc,
          start: !this.state.start,
          end: !this.state.end,
          fullName: !this.state.fullName,
          phoneNumber: !this.state.phoneNumber,
        },
      },
      () => {
        if (Object.values(this.state.errors).every((i) => !i)) {
          const {
            title,
            email,
            desc,
            start,
            end,
            fullName,
            phoneNumber,
            date,
            id,
            privateEvent,
          } = this.state;
          socket.emit("updateEvent", {
            _user: this.props.currentUser.id,
            id,
            title,
            email,
            desc,
            start,
            end,
            fullName,
            phoneNumber,
            date,
            privateEvent,
            status: STATUS_ONE,
          });
          this.handleClose();
        }
      }
    );
  };

  handleClose = () => {
    this.setState({
      addModal: false,
      title: "",
      email: "",
      desc: "",
      start: "",
      end: "",
      fullName: "",
      phoneNumber: "",
      editable: false,
      privateEvent: true,
      errors: {
        title: true,
        email: true,
        desc: true,
        start: true,
        end: true,
        fullName: true,
        phoneNumber: true,
      },
      showError: false,
    });
  };
eventStyleGetter=(event)=>{
  console.log("reaching here stylegetter")
  if(event.status==='DECLINED')
  return {style:{backgroundColor:"red"}}
  else return {style:{backgroundColor:"#635ebe"}}
}
  render() {
    console.log(this.state, "STATE");
    console.log(this.props, "PROPS");
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
                  <h1>Calendar View</h1>
                </div>
                
              </div>
            </header>
            {/*END PAGE HEADER */}
            {/*START PAGE CONTENT */}
            <section className="page-content container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <DragAndDropCalendar
                      selectable
                      views={["month", "day", "agenda"]}
                      onSelectEvent={(e) => this.toggleModalEdit(e)}
                      localizer={localizer}
                      events={this.state.events}
                      onEventDrop={this.moveEvent}
                      onSelectSlot={(e) => this.toggleModal(e)}
                      style={{ height: "100vh" }}
                      onDragStart={console.log}
                      defaultView={Views.MONTH}
                      components={{ toolbar: CustomToolbar }}
                      defaultDate={new Date()}
                      eventPropGetter={(this.eventStyleGetter)}
                    />
                  </div>
                </div>
              </div>
            </section>
            <Modal isOpen={this.state.addModal} toggle={this.handleClose}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {this.state.editable ? "Update Event" : "Add an event"}
                    {this.state.g_created === null ||
                    this.state.g_created === ""
                      ? ""
                      : "(" + this.state.g_created + ")"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => this.handleClose()}
                  >
                    <span>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form className="form-event">
                    <div className="form-group row">
                      <label
                        htmlFor="editTitle"
                        className="col-md-2 control-label"
                      >
                        Title
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className={classNames({
                            "form-control new_event_title": this.state
                              .showclass,
                            "is-invalid":
                              this.state.showError && this.state.errors.title,
                          })}
                          value={this.state.title}
                          onChange={(e) => this.handleField(e, "title")}
                          placeholder="Event Name"
                        />
                        {this.handleErrors("title")}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 control-label">Start</label>
                      <div className="col-md-10">
                        <div className="form-group m-0">
                          <Select
                            style={{ width: 120 }}
                            onChange={(e) => this.handleChange(e, "start")}
                            value={
                              this.state.start ? this.state.start : "Start Time"
                            }
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
                          {this.handleTimeError("start")}
                        </div>
                        <div className="form-group m-0 mt-2">
                          <Select
                            style={{ width: 120 }}
                            className="mr-2"
                            onChange={(e) => this.handleChange(e, "end")}
                            value={this.state.end ? this.state.end : "End Time"}
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
                          {this.handleTimeError("end")}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 control-label">
                        Full Name
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className={classNames({
                            "form-control new_event_title": this.state
                              .showclass,
                            "is-invalid":
                              this.state.showError &&
                              this.state.errors.fullName,
                          })}
                          value={this.state.fullName}
                          onChange={(e) => this.handleField(e, "fullName")}
                          placeholder="Full Name"
                        />
                        {this.handleErrors("fullName")}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-2 control-label">Email</label>
                      <div className="col-md-10">
                        <input
                          type="email"
                          className={classNames({
                            "form-control new_event_title": this.state
                              .showclass,
                            "is-invalid":
                              this.state.showError &&
                              (this.state.errors.email ||
                                this.state.emailError),
                          })}
                          value={this.state.email}
                          onChange={(e) => this.handleField(e, "email")}
                          placeholder="Enter your Email"
                        />
                        {this.handleErrors("email")}
                        {this.handleEmailErrors("email")}
                      </div>
                    </div>

                    < div className="form-group row">
                      <label className="col-md-2 control-label">
                        Phone Number
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className={classNames({
                            "form-control new_event_title": this.state
                              .showclass,
                            "is-invalid":
                              this.state.showError &&
                              this.state.errors.phoneNumber,
                          })}
                          value={this.state.phoneNumber}
                          onChange={(e) => this.handleField(e, "phoneNumber")}
                          placeholder="Enter your Phone Number"
                        />
                        {this.handleErrors("phoneNumber")}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-2 control-label">
                        Description
                      </label>
                      <div className="col-md-10">
                        <textarea
                          className={classNames({
                            "form-control new_event_title": this.state
                              .showclass,
                            "is-invalid":
                              this.state.showError && this.state.errors.desc,
                          })}
                          value={this.state.desc}
                          onChange={(e) => this.handleField(e, "desc")}
                          placeholder="Enter Description"
                        />
                        {this.handleErrors("desc")}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-2 control-label">
                        Event Type
                      </label>
                      <div className="col-md-10">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="private_event"
                            id="public"
                            value={this.state.privateEvent}
                            checked={!this.state.privateEvent}
                            onChange={() => {
                              console.log("called");
                              this.setState({ privateEvent: false });
                            }}
                          />
                          <label class="form-check-label" for="public">
                            Public
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="private_event"
                            id="private"
                            checked={this.state.privateEvent}
                            value={this.state.privateEvent}
                            onChange={() =>
                              this.setState({ privateEvent: true })
                            }
                          />
                          <label class="form-check-label" for="private">
                            Private
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-default btn-flat"
                      onClick={() => this.handleClose()}
                    >
                      Close
                    </button>
                    {this.state.editable ? (
                      <button
                        className="btn btn-primary"
                        id="btn_add_event"
                        onClick={(e) => this.handleEdit(e)}
                      >
                        Update Event
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        id="btn_add_event"
                        onClick={(e) => this.handleAdd(e)}
                      >
                        Add Event
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
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

export default connect(mapStateToProps, { submitEvent })(BigCalendar);
