import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import NavigationBar from '../components/NavigationBar'
import { BASE_URL_SOCKET } from '../actions'
import CheckDetails from '../components/CheckDetails'

export class Integration extends Component {
  state = {
    data: [
      {
        name: 'Iframe 01 Auto',
        width: '100%',
        height: '100vh',
        value: ReactDOMServer.renderToStaticMarkup(
          <iframe
            src={`${BASE_URL_SOCKET}/calendar-ifm-01?userId=${this.props.currentUser.id}&auto=true`}
            style={{ height: '100vh', width: '100%' }}
            frameborder="0"
          ></iframe>
        ),
        description:"the events in this are automatically accepted and this card covers full web page"
      },
      {
        name: 'Iframe 02 Auto',
        width: '400px',
        height: '50vh',
        value: ReactDOMServer.renderToStaticMarkup(
          <iframe
            src={`${BASE_URL_SOCKET}/calendar-ifm-01?userId=${this.props.currentUser.id}&auto=true`}
            style={{ height: '80vh', width: '600px' }}
            frameborder="0"
          ></iframe>
        ),
        description:"the events in this are automatically accepted and this card covers width 400px and height 50vh of your webpage"
      },
      {
        name: 'Iframe 03 Auto',
        width: '600px',
        height: '50vh',
        value: ReactDOMServer.renderToStaticMarkup(
          <iframe
            src={`${BASE_URL_SOCKET}/calendar-ifm-01?userId=${this.props.currentUser.id}&auto=true`}
            style={{ height: '60vh', width: '400px' }}
            frameborder="0"
          ></iframe>
        ),
        description:"the events in this are automatically accepted and this card covers width 600px and height 50vh of your webpage"
      },

      {
        name: 'Iframe 04 Manual',
        width: '100%',
        height: '100vh',
        value: ReactDOMServer.renderToStaticMarkup(
          <iframe
            src={`${BASE_URL_SOCKET}/calendar-ifm-01?userId=${this.props.currentUser.id}&auto=false`}
            style={{ height: '100vh', width: '100%' }}
            frameborder="0"
          ></iframe>
        ),
        description:"the events in this are manually accepted and this card covers full webpage"
      },
      {
        name: 'Iframe 05 Manual',
        width: '400px',
        height: '50vh',
        value: ReactDOMServer.renderToStaticMarkup(
          <iframe
            src={`${BASE_URL_SOCKET}/calendar-ifm-01?userId=${this.props.currentUser.id}&auto=false`}
            style={{ height: '80vh', width: '600px' }}
            frameborder="0"
          ></iframe>
        ),
        description:"the events in this are manually accepted and this card covers width 400px and height 50vh of your webpage"
      },
      {
        name: 'Iframe 06 Manual',
        width: '600px',
        height: '50vh',
        value: ReactDOMServer.renderToStaticMarkup(
          <iframe
            src={`${BASE_URL_SOCKET}/calendar-ifm-01?userId=${this.props.currentUser.id}&auto=false`}
            style={{ height: '60vh', width: '400px' }}
            frameborder="0"
          ></iframe>
        ),
        description:"the events in this are manually accepted and this card covers width 600px and height 50vh of your webpage"
      }
    ],
    copied: false
  }
  render() {
    console.log(this.state, 'CC')
    return (
      <div id="app">
        <CheckDetails/>
        <NavigationBar />
        <div className="content-wrapper">
        <Sidebar />
          <div className="content">
            {/*START PAGE HEADER */}
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Calendar Integration</h1>
                </div>
                <ul className="actions top-right">
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
                </ul>
              </div>
            </header>
            {/*END PAGE HEADER */}
            {/*START PAGE CONTENT */}
            <section className="page-content container-fluid">
              <div className="row">
                <div className="col-12">
                  <header className="m-t-30 m-b-30">
                    <h5>How to Integrate our calendar in your website</h5>
                    <p>
                      Just choose one of the sizes of the calendar cards givern below and click on copy. then paste this card on your website.
                    </p>
                  </header>
                  <div className="card-deck row">
                    {this.state.data.map((i, idx) => (
                      <div className="col-md-4 mb-3">
                        <div className="card">
                          <img className="card-img-top" src="../assets/img/demos/33.jpg" alt="Card image cap" />
                          <div className="card-body">
                            <h5 className="card-title">{i.name}</h5>
                            <p className="card-text">
                              {i.description}
                            </p>
                            
                            <CopyToClipboard text={i.value} onCopy={() => this.setState({ copied: idx })}>
                              <button className="btn btn-primary btn-rounded text-center">
                                Copy to clipboard with button
                              </button>
                            </CopyToClipboard>
                            {this.state.copied === idx ? (
                              <span style={{ color: 'green', fontSize: 12 }} className="d-block mt-2 ml-3">
                                Copied.
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser
})

export default connect(mapStateToProps)(Integration)
