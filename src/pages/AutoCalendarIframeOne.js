import React from 'react'
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Select } from 'antd'

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CustomToolbarUser from '../components/CustomToolbarUser'
import Sidebar from '../components/Sidebar'
import NavigationBar from '../components/NavigationBar'
import EvenList from '../components/EventList'
import events from '../utils/events'
import { submitEvent } from '../actions'
import { socket } from '../App'
import { STATUS_ONE, STATUS_TWO } from '../utils/status'
import '../css/custom_auto.css'

const DragAndDropCalendar = withDragAndDrop(Calendar)
// const DragAndDropCalendar = Calendar
const localizer = momentLocalizer(moment)
const { Option } = Select


class CalendarIframe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Events_on_date : [],
      events: events,
      addModal: false,
      editModal: false,
      id: null,
      title: '',
      email: '',
      desc: '',
      start: '',
      end: '',
      fullName: '',
      phoneNumber: '',
      privateEvent: true,
      date: null,
      errors: {
        title: true,
        email: true,
        desc: true,
        start: true,
        end: true,
        fullName: true,
        phoneNumber: true
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
      viewableModal: false
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  getData = (item) => {
    this.setState({
      events:
        new URLSearchParams(this.props.location.search).get('auto') == 'true'
          ? item.map((doc, ddx) => ({
              ...doc,
              title: doc.privateEvent ? 'Booked' : doc.title,
              start: `${doc.date}T${doc.start}`,
              end: `${doc.date}T${doc.end}`
            }))
          : item
              .filter((k) => k.status !== STATUS_TWO)
              .map((doc, ddx) => ({
                ...doc,
                title: doc.privateEvent ? 'Booked' : doc.title,
                start: `${doc.date}T${doc.start}`,
                end: `${doc.date}T${doc.end}`
              }))
    })
  }

  changeData = () => {
    const query = new URLSearchParams(this.props.location.search)
    socket.emit('initial_data', { userId: query.get('userId') })
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)

    if (query) {
      socket.emit('initial_data', { userId: query.get('userId') })
      socket.on('get_data', this.getData)
      socket.on('change_data', this.changeData)
    }
  }
    // ***************  OUT OF ALL EVENTS IN STATE FILTER WHOSE ||START(improve)|| DATE = CLICKED DATE  **********************************  
  dateevents = function eventList(date){
      const p = this.state.events.filter((event) => {
      var start = event.start + ""
      var event_date = start.split("T")[0]
      
      return date == event_date
    })
    // console.log(p)
    // console.log(p)
    // return p
    this.setState({
      Events_on_date : p
    })
    // console.log(Events_on_date)
  }



  handleSelectSlot(e){
    var date = moment(e.start).format('YYYY-MM-DD')
    this.dateevents(date)
    
    // var start = this.state.events[0].start + ""
    // const p = this.state.events
    //   .filter((f, fdx) => moment(e.start).format('YYYY-MM-DD') === f.date)
    //   .map((i, idx) =>
    //     this.state.timelist.slice(
    //       this.state.timelist.indexOf(i.start.split('T')[1]),
    //       this.state.timelist.indexOf(i.end.split('T')[1])
    //     )
    //   )
    // console.log(p)
    // const p2 = this.state.events
    //   .filter((f, fdx) => moment(e.start).format('YYYY-MM-DD') === f.date)
    //   .map((i, idx) =>
    //     this.state.timelist.slice(
    //       this.state.timelist.indexOf(i.start.split('T')[1]) + 1,
    //       this.state.timelist.indexOf(i.end.split('T')[1]) + 1
    //     )
    //   )
    // console.log(p2)
  }

  

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })
  }

  handleChange = (value, fieldType) => {
    if (fieldType === 'start') {
      const x = this.state.timeFilledEndOriginal.find(
        (k) => this.state.timelist.indexOf(k) > this.state.timelist.indexOf(value)
      )

      if (x) {
        this.setState({
          timeFilledEnd: [
            ...this.state.timeFilledEndOriginal,
            ...this.state.timelist.slice(this.state.timelist.indexOf(x)),
            ...this.state.timelist.slice(0, this.state.timelist.indexOf(value) + 1)
          ]
        })
      } else {
        this.setState({
          timeFilledEnd: [
            ...this.state.timeFilledEndOriginal,
            ...this.state.timelist.slice(0, this.state.timelist.indexOf(value) + 1)
          ]
        })
      }
    }
    this.setState({ [fieldType]: value, errors: { ...this.state.errors, [fieldType]: !value } })
  }

  toggleModal = (e) => {
    const p = this.state.events
      .filter((f, fdx) => moment(e.start).format('YYYY-MM-DD') === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split('T')[1]),
          this.state.timelist.indexOf(i.end.split('T')[1])
        )
      )

    const p2 = this.state.events
      .filter((f, fdx) => moment(e.start).format('YYYY-MM-DD') === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split('T')[1]) + 1,
          this.state.timelist.indexOf(i.end.split('T')[1]) + 1
        )
      )

    this.setState({
      addModal: !this.state.addModal,
      date: moment(e.start).format('YYYY-MM-DD'),
      timeFilled: p.reduce((a, b) => a.concat(b), []),
      timeFilledOriginal: p.reduce((a, b) => a.concat(b), []),
      timeFilledEnd: p2.reduce((a, b) => a.concat(b), []),
      timeFilledEndOriginal: p2.reduce((a, b) => a.concat(b), [])
    })
  }

  toggleViewModal = (e) => {
    if (e.privateEvent) {
      return
    }
    const p = this.state.events
      .filter((f, fdx) => moment(e.start).format('YYYY-MM-DD') === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split('T')[1]),
          this.state.timelist.indexOf(i.end.split('T')[1])
        )
      )

    const p2 = this.state.events
      .filter((f, fdx) => moment(e.start).format('YYYY-MM-DD') === f.date)
      .map((i, idx) =>
        this.state.timelist.slice(
          this.state.timelist.indexOf(i.start.split('T')[1]) + 1,
          this.state.timelist.indexOf(i.end.split('T')[1]) + 1
        )
      )

    this.setState({
      viewableModal: !this.state.viewableModal,
      id: e._id,
      title: e.title,
      email: e.email,
      desc: e.desc,
      start: moment(e.start).format('HH:mm'),
      end: moment(e.end).format('HH:mm'),
      date: moment(e.date).format('YYYY-MM-DD'),
      fullName: e.fullName,
      phoneNumber: e.phoneNumber,
      timeFilled: p.reduce((a, b) => a.concat(b), []),
      timeFilledEnd: p2.reduce((a, b) => a.concat(b), []),
      timeFilledOriginal: p.reduce((a, b) => a.concat(b), []),
      timeFilledEndOriginal: p2.reduce((a, b) => a.concat(b), [])
    })
  }

  handleField = (e, fieldType) => {
    this.setState({ [fieldType]: e.target.value, errors: { ...this.state.errors, [fieldType]: !e.target.value } })
  }

  handleErrors = (params) => {
    return (
      this.state.showError &&
      this.state.errors[params] && <div className="invalid-feedback">This field cannot be empty</div>
    )
  }

  handleTimeError = (params) => {
    return (
      this.state.showError && this.state.errors[params] && <div style={{ color: 'red', fontSize: 12 }}>Select Time</div>
    )
  }

  handleAdd = (e) => {
    e.preventDefault()
    this.setState({ showError: true })

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
          phoneNumber: !this.state.phoneNumber
        }
      },
      () => {
        if (Object.values(this.state.errors).every((i) => !i)) {
          const { title, email, desc, start, end, fullName, phoneNumber, date, privateEvent } = this.state
          const query = new URLSearchParams(this.props.location.search)
          socket.emit('submitEvent', {
            _user: query.get('userId'),
            title,
            email,
            desc,
            start,
            end,
            fullName,
            phoneNumber,
            date,
            privateEvent,
            status: new URLSearchParams(this.props.location.search).get('auto') == 'true' ? STATUS_ONE : STATUS_TWO
          })
          this.handleClose()
        }
      }
    )
  }

  handleClose = () => {
    this.setState({
      addModal: false,
      title: '',
      email: '',
      desc: '',
      start: '',
      end: '',
      fullName: '',
      phoneNumber: '',
      privateEvent: true,
      viewableModal: false,
      errors: {
        title: true,
        email: true,
        desc: true,
        start: true,
        end: true,
        fullName: true,
        phoneNumber: true
      },
      showError: false
    })
  }

  render() {
    console.log(this.state, 'XXXXXX')
    return (
      <div id="app">
        <DragAndDropCalendar 
          selectable
          views={['month']}
          // onSelectEvent={(e) => this.toggleViewModal(e)}
          localizer={localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          onSelectSlot={(e) => this.handleSelectSlot(e)}
          // onSelectSlot={(e) => this.toggleModal(e)}
          style={{ height: '100vh', width: '100%' }}
          onDragStart={console.log}
          defaultView={Views.MONTH}
          components={{ toolbar: CustomToolbarUser }}
          defaultDate={new Date()}
        />
        <EvenList events={this.state.Events_on_date}/>


        {/* ******************************************************************************* */}


        <Modal isOpen={this.state.addModal} toggle={this.handleClose}>
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">
                    Add an event
                    {this.state.g_created === undefined ||""
                      ? ""
                      : "(" + this.state.g_created + ")"}
                  </h5>
              <button type="button" className="close" onClick={() => this.handleClose()}>
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
                    <input
                      type="text"
                      className={classNames({
                        'form-control new_event_title': this.state.showclass,
                        'is-invalid': this.state.showError && this.state.errors.title
                      })}
                      value={this.state.title}
                      onChange={(e) => this.handleField(e, 'title')}
                      placeholder="Event Name"
                    />
                    {this.handleErrors('title')}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">Start</label>
                  <div className="col-md-10">
                    <div className="form-group m-0">
                      <Select
                        style={{ width: 120 }}
                        onChange={(e) => this.handleChange(e, 'start')}
                        value={this.state.start ? this.state.start : 'Start Time'}
                      >
                        {this.state.timelist.map((item, idx) => (
                          <Option value={item} key={idx} disabled={this.state.timeFilled.includes(item)}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                      {this.handleTimeError('start')}
                    </div>
                    <div className="form-group m-0 mt-2">
                      <Select
                        style={{ width: 120 }}
                        className="mr-2"
                        onChange={(e) => this.handleChange(e, 'end')}
                        value={this.state.end ? this.state.end : 'End Time'}
                      >
                        {this.state.timelist.map((item, idx) => (
                          <Option value={item} key={idx} disabled={this.state.timeFilledEnd.includes(item)}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                      {this.handleTimeError('end')}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">Full Name</label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className={classNames({
                        'form-control new_event_title': this.state.showclass,
                        'is-invalid': this.state.showError && this.state.errors.fullName
                      })}
                      value={this.state.fullName}
                      onChange={(e) => this.handleField(e, 'fullName')}
                      placeholder="Full Name"
                    />
                    {this.handleErrors('fullName')}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Email</label>
                  <div className="col-md-10">
                    <input
                      type="email"
                      className={classNames({
                        'form-control new_event_title': this.state.showclass,
                        'is-invalid': this.state.showError && this.state.errors.email
                      })}
                      value={this.state.email}
                      onChange={(e) => this.handleField(e, 'email')}
                      placeholder="Enter your Email"
                    />
                    {this.handleErrors('email')}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Phone Number</label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className={classNames({
                        'form-control new_event_title': this.state.showclass,
                        'is-invalid': this.state.showError && this.state.errors.phoneNumber
                      })}
                      value={this.state.phoneNumber}
                      onChange={(e) => this.handleField(e, 'phoneNumber')}
                      placeholder="Enter your Phone Number"
                    />
                    {this.handleErrors('phoneNumber')}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Description</label>
                  <div className="col-md-10">
                    <textarea
                      className={classNames({
                        'form-control new_event_title': this.state.showclass,
                        'is-invalid': this.state.showError && this.state.errors.desc
                      })}
                      value={this.state.desc}
                      onChange={(e) => this.handleField(e, 'desc')}
                      placeholder="Enter Description"
                    />
                    {this.handleErrors('desc')}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Event Type</label>
                  <div className="col-md-10">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="private_event"
                        id="public"
                        value={this.state.privateEvent}
                        checked={!this.state.privateEvent}
                        onChange={() => this.setState({ privateEvent: false })}
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
                        onChange={() => this.setState({ privateEvent: true })}
                      />
                      <label class="form-check-label" for="private">
                        Private
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => this.handleClose()}>
                  Close
                </button>
                <button className="btn btn-primary" id="btn_add_event" onClick={(e) => this.handleAdd(e)}>
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={this.state.viewableModal} toggle={this.
          toggleViewModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add an Event</h5>
              <button type="button" className="close" onClick={() => this.handleClose()}>
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form-event">
                <div className="form-group row">
                  <label htmlFor="editTitle" className="col-md-2 control-label">
                    Title
                  </label>
                  <div className="col-md-10">{this.state.title}</div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">Start</label>
                  <div className="col-md-10">
                    <div className="form-group m-0">
                      {this.state.start} - {this.state.end}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 control-label">Full Name</label>
                  <div className="col-md-10">{this.state.fullName}</div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Email</label>
                  <div className="col-md-10">{this.state.email}</div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Phone Number</label>
                  <div className="col-md-10">{this.state.phoneNumber}</div>
                </div>

                <div className="form-group row">
                  <label className="col-md-2 control-label">Description</label>
                  <div className="col-md-10">{this.state.desc}</div>
                </div>
              </form>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => this.handleClose()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered
})

export default connect(mapStateToProps, { submitEvent })(CalendarIframe)
