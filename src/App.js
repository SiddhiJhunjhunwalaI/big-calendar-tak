import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import socketIOClient from 'socket.io-client'
import Home from './pages/Home'
import store from './store'
import BigCalendar from './pages/BigCalendar'
import CalendarTest from './pages/CalendarTest'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser, BASE_URL_SOCKET } from './actions/index'
import CalendarIframeOne from './pages/CalendarIframeOne'
import AutoCalendarIframeOne from './pages/AutoCalendarIframeOne'
import Integration from './pages/Integration'
import EventList from './pages/EventList'
import ProfileComplete from './pages/ProfileComplete'
import ProfileUpdate from './pages/ProfileUpdate'
import CalendarIntegrations from './pages/CalendarIntegrations'
import RedirectSpinner from './pages/RedirectSpinner'
import ContactDetails from './pages/ContactDetails'
import ConflictResolution from './pages/ConflictResolution'
import ChangePass from './pages/ChangePass'
import RedirectEmail from './pages/RedirectEmail'
import PrivateRoute from './privateroutes'
import PublicRoute from './publicroutes'

const token = localStorage.jwtToken

if (token) {
    setAuthToken(token)
    const decoded = jwt_decode(token)
    store.dispatch(setCurrentUser(decoded))
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())
        window.location.href = '/'
    }
}

export let socket

class App extends Component {
    constructor(props) {
        super(props)
        socket = socketIOClient(BASE_URL_SOCKET)
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <PublicRoute exact path="/" component={Login} name="Login" />
                    <PublicRoute exact path="/register" component={Register} name="Register" />
                    <PrivateRoute exact path="/dashboard" component={Home} name="Home" />
                    <PublicRoute exact path="/forgot-password" component={ForgotPassword} name="ForgotPassword" />
                    <PublicRoute exact path="/reset-password/:hash" component={ResetPassword} name="ResetPassword" />
                    <PrivateRoute exact path="/calendar" component={BigCalendar} name="BigCalendar" />
                    <Route exact path="/calendar-ifm-01" component={AutoCalendarIframeOne} name="CalendarIframeOne" />
                    {/* <Route exact path="/calendar-ifm-01" component={CalendarIframeOne} name="CalendarIframeOne" /> */}
                    <PrivateRoute exact path="/integration" component={Integration} name="Integration" />
                    <PrivateRoute exact path="/calendar-test" component={CalendarTest} name="CalendarTest" />
                    <PrivateRoute exact path="/events" component={EventList} name="EventList" />
                    <PrivateRoute exact path="/profile/complete" component={ProfileComplete} name="ProfileComplete" />
                    <PrivateRoute exact path="/profile/update" component={ProfileUpdate} name="ProfileUpdate" />
                    <PrivateRoute exact path="/calendar/i" component={CalendarIntegrations} name="Integrations" />
                    <PrivateRoute exact path='/calendar/auth' component={RedirectSpinner} name="Redirect"/>
                    <PrivateRoute exact path='/contacts' component={ContactDetails} name="ContactDetails" />
                    <PrivateRoute exact path='/conflicts' component={ConflictResolution} name="ConflictResolution" />
                    <PrivateRoute exact path="/change-password" component={ChangePass} name="Changepass" />
                    <PrivateRoute exact path='/event/notif' component={RedirectEmail} name="RedirectEmail" />
                </Router>
            </Provider>
        )
    }
}

export default App
