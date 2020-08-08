import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getuserDetails, logoutUser } from "../actions";
import axios from "axios";
export class NavigationBar extends Component {
  imgs;
  state = {};
  componentDidMount = async () => {
    if (this.props.currentUser) {
      await axios
        .get("/api/users/current")
        .then((res) => {
          this.setState({ email: res.data.email });
        })
        .catch((err) => this.setState({ email: "albert@gmail.com" }));

      await axios
        .get(`/api/users/profile/get`, {
          params: { currentUser: this.props.currentUser.id },
        })
        .then((res) => {
          if (res.data.foundDetails && res.data.foundDetails.image) {
            this.imgs = require(`../images/${this.props.currentUser.id}.jpeg`);
            this.setState({ img: this.imgs });
          } else {
            this.imgs = require(`../images/image1.jpeg`);
            this.setState({ img: this.imgs });
          }
        });
    } else {
      //dd
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* START LOGO WRAPPER */}
        <nav className="top-toolbar navbar navbar-mobile navbar-tablet">
          <ul className="navbar-nav nav-left">
            <li className="nav-item">
              <a href="javascript:void(0)" data-toggle-state="aside-left-open">
                <i className="icon dripicons-align-left" />
              </a>
            </li>
          </ul>
          <ul className="navbar-nav nav-center site-logo">
            <li>
              <a href="/dashboard">
                <div className="logo_mobile">
                  <svg
                    id="logo_mobile"
                    width={27}
                    height={27}
                    viewBox="0 0 54.03 56.55"
                  >
                    <defs>
                      <linearGradient id="logo_background_mobile_color">
                        <stop className="stop1" offset="0%" />
                        <stop className="stop2" offset="50%" />
                        <stop className="stop3" offset="100%" />
                      </linearGradient>
                    </defs>
                    <path
                      id="logo_path_mobile"
                      className="cls-2"
                      d="M90.32,0c14.2-.28,22.78,7.91,26.56,18.24a39.17,39.17,0,0,1,1,4.17l.13,1.5A15.25,15.25,0,0,1,118.1,29v.72l-.51,3.13a30.47,30.47,0,0,1-3.33,8,15.29,15.29,0,0,1-2.5,3.52l.06.07c.57.88,1.43,1.58,2,2.41,1.1,1.49,2.36,2.81,3.46,4.3.41.55,1,1,1.41,1.56.68.92,1.16,1.89.32,3.06-.08.12-.08.24-.19.33a2.39,2.39,0,0,1-2.62.07,4.09,4.09,0,0,1-.7-.91c-.63-.85-1.41-1.61-2-2.48-1-1.42-2.33-2.67-3.39-4.1a16.77,16.77,0,0,1-1.15-1.37c-.11,0-.06,0-.13.07-.41.14-.65.55-1,.78-.72.54-1.49,1.08-2.24,1.56A29.5,29.5,0,0,1,97.81,53c-.83.24-1.6.18-2.5.39a16.68,16.68,0,0,1-3.65.26H90.58L88,53.36A36.87,36.87,0,0,1,82.71,52a27.15,27.15,0,0,1-15.1-14.66c-.47-1.1-.7-2.17-1.09-3.39-1-3-1.45-8.86-.51-12.38a29,29,0,0,1,2.56-7.36c3.56-6,7.41-9.77,14.08-12.57a34.92,34.92,0,0,1,4.8-1.3Zm.13,4.1c-.45.27-1.66.11-2.24.26a32.65,32.65,0,0,0-4.74,1.37A23,23,0,0,0,71,18.7,24,24,0,0,0,71.13,35c2.78,6.66,7.2,11.06,14.21,13.42,1.16.39,2.52.59,3.84.91l1.47.07a7.08,7.08,0,0,0,2.43,0H94c.89-.21,1.9-.28,2.75-.46V48.8A7.6,7.6,0,0,1,95.19,47c-.78-1-1.83-1.92-2.62-3s-1.86-1.84-2.62-2.87c-2-2.7-4.45-5.1-6.66-7.62-.57-.66-1.14-1.32-1.66-2-.22-.29-.59-.51-.77-.85a2.26,2.26,0,0,1,.58-2.61,2.39,2.39,0,0,1,2.24-.2,4.7,4.7,0,0,1,1.22,1.3l.51.46c.5.68,1,1.32,1.6,2,2.07,2.37,4.38,4.62,6.27,7.17.94,1.26,2.19,2.3,3.14,3.58l1,1c.82,1.1,1.8,2,2.62,3.13.26.35.65.6.9,1A23.06,23.06,0,0,0,105,45c.37-.27,1-.51,1.15-1h-.06c-.18-.51-.73-.83-1-1.24-.74-1-1.64-1.88-2.37-2.87-1.8-2.44-3.89-4.6-5.7-7-.61-.82-1.44-1.52-2-2.34-.85-1.16-3.82-3.73-1.54-5.41a2.27,2.27,0,0,1,1.86-.26c.9.37,2.33,2.43,2.94,3.26s1.27,1.31,1.79,2c1.44,1.95,3.11,3.66,4.54,5.6.41.55,1,1,1.41,1.56.66.89,1.46,1.66,2.11,2.54.29.39.61,1.06,1.09,1.24.54-1,1.34-1.84,1.92-2.8a25.69,25.69,0,0,0,2.5-6.32c1.27-4.51.32-10.37-1.15-13.81A22.48,22.48,0,0,0,100.75,5.94a35.12,35.12,0,0,0-6.08-1.69A20.59,20.59,0,0,0,90.45,4.11Z"
                      transform="translate(-65.5)"
                      fill="url(#logo_background_mobile_color)"
                    />
                  </svg>
                </div>
                <span className="brand-text">QuantumPro</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav nav-right">
            <li className="nav-item">
              <a
                href="javascript:void(0)"
                data-toggle-state="mobile-topbar-toggle"
              >
                <i className="icon dripicons-dots-3 rotate-90" />
              </a>
            </li>
          </ul>
        </nav>
        {/* END LOGO WRAPPER */}
        {/* START TOP TOOLBAR WRAPPER */}
        <nav className="top-toolbar navbar navbar-desktop flex-nowrap">
          <ul className="site-logo">
            <li>
              <a href="/dashboard">
                <div className="logo">
                  <svg
                    id="logo"
                    width={25}
                    height={25}
                    viewBox="0 0 54.03 56.55"
                  >
                    <defs>
                      <linearGradient id="logo_background_color">
                        <stop className="stop1" offset="0%" />
                        <stop className="stop2" offset="50%" />
                        <stop className="stop3" offset="100%" />
                      </linearGradient>
                    </defs>
                    <path
                      id="logo_path"
                      className="cls-2"
                      d="M90.32,0c14.2-.28,22.78,7.91,26.56,18.24a39.17,39.17,0,0,1,1,4.17l.13,1.5A15.25,15.25,0,0,1,118.1,29v.72l-.51,3.13a30.47,30.47,0,0,1-3.33,8,15.29,15.29,0,0,1-2.5,3.52l.06.07c.57.88,1.43,1.58,2,2.41,1.1,1.49,2.36,2.81,3.46,4.3.41.55,1,1,1.41,1.56.68.92,1.16,1.89.32,3.06-.08.12-.08.24-.19.33a2.39,2.39,0,0,1-2.62.07,4.09,4.09,0,0,1-.7-.91c-.63-.85-1.41-1.61-2-2.48-1-1.42-2.33-2.67-3.39-4.1a16.77,16.77,0,0,1-1.15-1.37c-.11,0-.06,0-.13.07-.41.14-.65.55-1,.78-.72.54-1.49,1.08-2.24,1.56A29.5,29.5,0,0,1,97.81,53c-.83.24-1.6.18-2.5.39a16.68,16.68,0,0,1-3.65.26H90.58L88,53.36A36.87,36.87,0,0,1,82.71,52a27.15,27.15,0,0,1-15.1-14.66c-.47-1.1-.7-2.17-1.09-3.39-1-3-1.45-8.86-.51-12.38a29,29,0,0,1,2.56-7.36c3.56-6,7.41-9.77,14.08-12.57a34.92,34.92,0,0,1,4.8-1.3Zm.13,4.1c-.45.27-1.66.11-2.24.26a32.65,32.65,0,0,0-4.74,1.37A23,23,0,0,0,71,18.7,24,24,0,0,0,71.13,35c2.78,6.66,7.2,11.06,14.21,13.42,1.16.39,2.52.59,3.84.91l1.47.07a7.08,7.08,0,0,0,2.43,0H94c.89-.21,1.9-.28,2.75-.46V48.8A7.6,7.6,0,0,1,95.19,47c-.78-1-1.83-1.92-2.62-3s-1.86-1.84-2.62-2.87c-2-2.7-4.45-5.1-6.66-7.62-.57-.66-1.14-1.32-1.66-2-.22-.29-.59-.51-.77-.85a2.26,2.26,0,0,1,.58-2.61,2.39,2.39,0,0,1,2.24-.2,4.7,4.7,0,0,1,1.22,1.3l.51.46c.5.68,1,1.32,1.6,2,2.07,2.37,4.38,4.62,6.27,7.17.94,1.26,2.19,2.3,3.14,3.58l1,1c.82,1.1,1.8,2,2.62,3.13.26.35.65.6.9,1A23.06,23.06,0,0,0,105,45c.37-.27,1-.51,1.15-1h-.06c-.18-.51-.73-.83-1-1.24-.74-1-1.64-1.88-2.37-2.87-1.8-2.44-3.89-4.6-5.7-7-.61-.82-1.44-1.52-2-2.34-.85-1.16-3.82-3.73-1.54-5.41a2.27,2.27,0,0,1,1.86-.26c.9.37,2.33,2.43,2.94,3.26s1.27,1.31,1.79,2c1.44,1.95,3.11,3.66,4.54,5.6.41.55,1,1,1.41,1.56.66.89,1.46,1.66,2.11,2.54.29.39.61,1.06,1.09,1.24.54-1,1.34-1.84,1.92-2.8a25.69,25.69,0,0,0,2.5-6.32c1.27-4.51.32-10.37-1.15-13.81A22.48,22.48,0,0,0,100.75,5.94a35.12,35.12,0,0,0-6.08-1.69A20.59,20.59,0,0,0,90.45,4.11Z"
                      transform="translate(-65.5)"
                      fill="url(#logo_background_color)"
                    />
                  </svg>
                </div>
                <span className="brand-text">QuantumPro</span>
              </a>
            </li>
          </ul>
          {/* <ul className="header-controls">
              <li className="nav-item">
                <button type="button" className="btn btn-link btn-menu" data-toggle-state="mini-sidebar">
                  <i className="la la-dot-circle-o" />
                </button>
              </li>
            </ul> */}

          {/* START LEFT DROPDOWN MENUS */}
          {/* <ul className="navbar-nav nav-left">
            <li className="nav-item nav-text dropdown dropdown-menu-md">
              <a
                href="javascript:void(0)"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Dropdown</span>
                <i className="la la-angle-down menu-arrow-down" />
              </a>
              <div className="dropdown-menu menu-icons dropdown-menu-left">
                <div className="form-group form-filter">
                  <input
                    type="text"
                    placeholder="Filter location..."
                    className="form-control filter-input"
                    data-search-trigger="open"
                  />
                  <i data-q-action="clear-filter" className="icon dripicons-cross clear-filter" />
                  <ul className="list-reset filter-list" data-scroll="minimal-dark">
                    <li>
                      <a className="dropdown-item" href="#">
                        New York, N.Y.
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Los Angeles, Calif.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        Chicago, Ill.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        Houston, Tex.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Philadelphia, Pa.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Phoenix, Ariz.{' '}
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        San Antonio, Tex.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        San Diego, Calif.{' '}
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Dallas, Tex.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        San Jose, Calif.{' '}
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Austin, Tex.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Jacksonville, Fla.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        San Francisco, Calif.{' '}
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        Indianapolis, Ind.{' '}
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Columbus, Ohio
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        Fort Worth, Tex.{' '}
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Charlotte, N.C.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        {' '}
                        Detroit, Mich.
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        El Paso, Tex.{' '}
                      </a>
                    </li>
                    <li>
                      {' '}
                      <a className="dropdown-item" href="#">
                        Seattle, Wash.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* START MEGA MENU */}
          {/* <li className="nav-item nav-text dropdown dropdown-menu-xl">
              <a
                href="javascript:void(0)"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Mega Menu</span>
                <i className="la la-angle-down menu-arrow-down" />
              </a>
              <div className="dropdown-menu dropdown-menu-left">
                <div className="row">
                  <div className="col">
                    <h3 className="menu-header">Shop Top Categories</h3>
                    <ul className="list-items">
                      <li>
                        <a href="javascript:void(0);">T-Shirts</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Tank Tops &amp; Fitted Tees</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Polos &amp; Button-Ups</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Women's Tops</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Dresses &amp; Skirts</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Sweaters &amp; Cardigans</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Hoodies</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Jackets &amp; Outerwear</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Activewear &amp; Swimwear</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Men's Jeans</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <h3 className="menu-header">Accessories</h3>
                    <ul className="list-items">
                      <li>
                        <a href="javascript:void(0);">Footwear</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Keychains &amp; Bag Accessories</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Wallets</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Hats &amp; Hair</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Ties &amp; Cufflinks</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Belts &amp; Suspenders</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Scarves</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Pouches &amp; Coin Purses</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Sunglasses</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Other Accessories</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <figure className="tint">
                      <div className="promo">
                        <h3>Grand Opening Sale!</h3>
                        <h4>Save up to 30% off.</h4>
                        <button className="btn btn-primary btn-rounded">Shop Now</button>
                      </div>
                      <img src="../assets/img/demos/ecom-header.jpg" alt="" />
                    </figure>
                  </div>
                </div>
              </div>
            </li> */}
          {/* END MEGA MENU */}
          {/* </ul> */}
          {/* END LEFT DROPDOWN MENUS  */}
          {/* START RIGHT TOOLBAR ICON MENUS */}
          <ul className="navbar-nav nav-right">
            {/* <li className="nav-item">
              <a href="javascript:void(0)" className="open-search-button" data-q-action="open-site-search">
                <i className="icon dripicons-search" />
              </a>
            </li>
            <li className="nav-item dropdown dropdown-menu-lg">
              <a
                href="javascript:void(0)"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="icon dripicons-view-apps" />
              </a>
              <div className="dropdown-menu dropdown-menu-right p-0">
                <div className="dropdown-menu-grid">
                  <div className="menu-grid-row">
                    <div>
                      <a className="dropdown-item  border-bottom border-right" href="apps.mail.html">
                        <i className="icon dripicons-mail" />
                        <span>Mail</span>
                      </a>
                    </div>
                    <div>
                      <a className="dropdown-item  border-bottom" href="apps.messages.html">
                        <i className="icon dripicons-message" />
                        <span>Messages</span>
                      </a>
                    </div>
                  </div>
                  <div className="menu-grid-row">
                    <div>
                      <a className="dropdown-item  border-right" href="apps.contacts.html">
                        <i className="icon dripicons-archive" />
                        <span>Contacts</span>
                      </a>
                    </div>
                    <div>
                      {' '}
                      <a className="dropdown-item" href="apps.calendar.html">
                        <i className="icon dripicons-calendar" />
                        <span>Calendar</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown dropdown-notifications dropdown-menu-lg">
              <a
                href="javascript:void(0)"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="icon dripicons-bell" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="card card-notification">
                  <div className="card-header">
                    <h5 className="card-title">Notifications</h5>
                    <ul className="actions top-right">
                      <li>
                        <a href="javascript:void(0);" data-q-action="open-notifi-config">
                          <i className="icon dripicons-gear" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="card-container-wrapper">
                      <div className="card-container">
                        <div className="timeline timeline-border">
                          <div className="timeline-list">
                            <div className="timeline-info">
                              <div>
                                Prep for bi-weekly meeting with{' '}
                                <a href="javascript:void(0)">
                                  <strong>Steven Weinberg</strong>
                                </a>{' '}
                              </div>
                              <small className="text-muted">07/05/18, 2:00 PM</small>
                            </div>
                          </div>
                          <div className="timeline-list timeline-border timeline-primary">
                            <div className="timeline-info">
                              <div>Skype call with development team</div>
                              <small className="text-muted">07/07/18, 1:00 PM</small>
                            </div>
                          </div>
                          <div className="timeline-list  timeline-border timeline-accent">
                            <div className="timeline-info">
                              <div>Programming control system</div>
                              <small className="text-muted">07/09/18, 10:00 AM - 6:00 PM</small>
                            </div>
                          </div>
                          <div className="timeline-list  timeline-border timeline-success">
                            <div className="timeline-info">
                              <div>Lunch with Peter Higgs</div>
                              <small className="text-muted">07/10/18, 12:00 PM</small>
                            </div>
                          </div>
                          <div className="timeline-list  timeline-border timeline-warning">
                            <div className="timeline-info">
                              <div>
                                <a href="#">
                                  <strong>Approve Request</strong>
                                </a>{' '}
                                for new training material by
                              </div>
                              <small className="text-muted">07/11/18, 9:00 AM</small>
                            </div>
                          </div>
                          <div className="timeline-list  timeline-border timeline-info">
                            <div className="timeline-info">
                              <div>
                                <a href="#">
                                  <strong>RSVP</strong>
                                </a>{' '}
                                for this year's hackathon.
                              </div>
                              <small className="text-muted">07/11/18, 1:30 PM</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-container">
                        <h6 className="p-0 m-0">Show notifications from:</h6>
                        <div className="row m-b-20 m-t-30">
                          <div className="col-10">
                            <span className="title">
                              <i className="icon dripicons-calendar" />
                              Calendar
                            </span>
                          </div>
                          <div className="col-2">
                            <input type="checkbox" className="js-switch" defaultChecked />
                          </div>
                        </div>
                        <div className="row m-b-20">
                          <div className="col-10">
                            <span className="title">
                              <i className="icon dripicons-mail" />
                              Email
                            </span>
                          </div>
                          <div className="col-2">
                            <input type="checkbox" className="js-switch" defaultChecked />
                          </div>
                        </div>
                        <div className="row m-b-20">
                          <div className="col-10">
                            <span className="title">
                              <i className="icon dripicons-message" />
                              Messages
                            </span>
                          </div>
                          <div className="col-2">
                            <input type="checkbox" className="js-switch" />
                          </div>
                        </div>
                        <div className="row m-b-20">
                          <div className="col-10">
                            <span className="title">
                              <i className="icon dripicons-stack" />
                              Projects
                            </span>
                          </div>
                          <div className="col-2">
                            <input type="checkbox" className="js-switch" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-pill user-avatar"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={this.state.img ? this.state.img : ""}
                  className="w-35 rounded-circle"
                  alt="Albert Einstein"
                />
              </a>
              <a
                className=""
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ minWidth: "30px", bottom: "-5px" }}
              >
                <i
                  class="zmdi zmdi-chevron-down zmdi-hc-fw"
                  style={{
                    fontSize: "20px",
                    paddingRight: "10px",
                    height: "30px",
                  }}
                ></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-accout">
                <div className="dropdown-header pb-3">
                  <div className="media d-user">
                    <img
                      className="align-self-center mr-3 w-40 rounded-circle"
                      src={this.state.img ? this.state.img : ""}
                      alt="Albert Einstein"
                    />
                    <div className="media-body">
                      <h5 className="mt-0 mb-0">
                        {this.props.currentUser
                          ? this.props.currentUser.name
                          : "Albert Einstein"}
                      </h5>
                      <span>
                        {this.state.email
                          ? this.state.email
                          : "fakegmail@gmail.com"}
                      </span>
                    </div>
                  </div>
                </div>
                {/* <a className="dropdown-item" href="apps.messages.html">
                  <i className="icon dripicons-mail" /> Message{' '}
                  <span className="badge badge-accent rounded-circle w-15 h-15 p-0 font-size-10">4</span>
                </a> */}
                <Link to="/profile/update">
                  <a className="dropdown-item">
                    <i className="icon dripicons-user" /> Profile
                  </a>
                </Link>

                <div className="dropdown-divider" />
                {/* <a className="dropdown-item" href="#">
                  <i className="icon dripicons-lock" /> Lock Account
                </a> */}
                <Link to="/">
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      this.props.logoutUser();
                    }}
                  >
                    <i className="icon dripicons-lock-open" /> Sign Out
                  </a>
                </Link>
              </div>
            </li>
            {/* <li className="nav-item">
              <a href="javascript:void(0)" data-toggle-state="aside-right-open">
                <i className="icon dripicons-align-right" />
              </a>
            </li> */}
          </ul>
          {/* END RIGHT TOOLBAR ICON MENUS */}
          {/*START TOP TOOLBAR SEARCH */}
          <form
            role="search"
            action="pages.search.html"
            className="navbar-form"
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Search and press enter..."
                className="form-control navbar-search"
                autoComplete="off"
              />
              <i
                data-q-action="close-site-search"
                className="icon dripicons-cross close-search"
              />
            </div>
            <button type="submit" className="d-none">
              Submit
            </button>
          </form>
          {/*END TOP TOOLBAR SEARCH */}
        </nav>
        {/* END TOP TOOLBAR WRAPPER */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered,
  currentUser: auth.currentUser,
});
export default connect(mapStateToProps, { getuserDetails, logoutUser })(
  NavigationBar
);
