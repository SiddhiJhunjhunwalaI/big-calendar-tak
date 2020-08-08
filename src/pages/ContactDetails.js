import React, { Component } from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import axios from "axios";
import classNames from "classnames";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavigationBar";
import { getuserDetails } from "../actions";
// import Pagination from "react-js-pagination";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DataTable, { Pagination } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "./datatable.css";
import CheckDetails from "../components/CheckDetails";
class ContactDetails extends Component {
  state = {
    loaded: false,
    events: null,
    viewableModal: false,
    selectedItem: null,
    activePage: 1,
    totalPages: null,
    startIndex: 0,
    endIndex: 10,
    count: 10,
    showLoader: false,
    errors: [
      {
        name: true,
        phone: true,
        email: true,
      },
    ],
    showError: false,
  };
  // handleErrors = (params) => {
  //   return (
  //     this.state.showError &&
  //     this.state.errors[params] && (
  //       <div className="invalid-feedback">This field cannot be empty</div>
  //     )
  //   );
  // };
  async componentDidMount() {
    const response = await axios.get(
      `/api/users/contacts?id=` + this.props.currentUser.id
    );
    console.log(response.data);
    await this.setState({
      loaded: true,
      contacts: response.data.msg.connections,
      totalPages: response.data.msg.connections.length,
    });
    await this.setState({
      tableData: {
        data: this.loadData(),
        columns: [
          { name: "Name", selector: "name", sortable: true },
          { name: "Email", selector: "email", sortable: true },
          { name: "Phone", selector: "phone", sortable: true },
        ],
      },
    });
  }
  componentDidUpdate = () => {
    // var doc=ReactDom.findDOMNode(DataTableExtensions)
    // var span= document.createElement('span')
    // span.classList.add('')
    // doc.appendChild()
  };
  checkNumber = () => {
    return !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(this.state.phone);
  };
  handleErrors = (params) => {
    return (
      this.state.showError &&
      this.state.errors[0][params] && (
        <div className="invalid-feedback">This field cannot be empty</div>
      )
    );
  };
  handleNumber = () => {
    return (
      this.state.showError &&
      !this.state.errors[0].phone &&
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(this.state.phone) && (
        <div className="invalid-feedback">Invalid Number</div>
      )
    );
  };
  getContacts=async()=>
  {
    const response = await axios.get(
      `/api/users/contacts?id=` + this.props.currentUser.id
    );
    console.log(response.data);
    await this.setState({
      loaded: true,
      contacts: response.data.msg.connections,
      totalPages: response.data.msg.connections.length,
    });
    await this.setState({
      tableData: {
        data: this.loadData(),
        columns: [
          { name: "Name", selector: "name", sortable: true },
          { name: "Email", selector: "email", sortable: true },
          { name: "Phone", selector: "phone", sortable: true },
        ],
      },
    });
  }
  handleField = (e) => {
    let { errors } = this.state;
    errors[0][e.target.name] = !e.target.value;
    this.setState({ [e.target.name]: e.target.value, errors });
  };
  loadData = () => {
    let { contacts } = this.state;
    if (contacts) {
      console.log(contacts);
      contacts.sort((a, b) => {
        var keyA = !("names" in a) ? "" : a.names[0].displayName,
          keyB = !("names" in b) ? "" : b.names[0].displayName;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      const mappedContacts = contacts.map((ele, id) => {
        return {
          id,
          name: ele.names !== undefined ? ele.names[0].displayName : "-",
          email:
            ele.emailAddresses !== undefined
              ? ele.emailAddresses[0].value
              : "-",
          phone:
            ele.phoneNumbers !== undefined ? ele.phoneNumbers[0].value : "-",
        };
        // <tr>
        //   <td>{ele.names !== undefined ? ele.names[0].displayName : "-"}</td>
        //   <td>
        //     {ele.emailAddresses !== undefined
        //       ? ele.emailAddresses[0].value
        //       : "-"}
        //   </td>
        //   <td>
        //     {ele.phoneNumbers !== undefined ? ele.phoneNumbers[0].value : "-"}
        //   </td>
        // </tr>
      });
      console.log(mappedContacts);
      return mappedContacts;
    } else return [];
  };
  handlePageChange(pageNumber) {
    this.setState({
      startIndex: this.state.count * pageNumber - this.state.count,
      endIndex: this.state.count * pageNumber,
      activePage: pageNumber,
      selected: -1,
    });
  }
  handleAdd = async (e) => {
    this.setState({ showLoader: true, showError: true });
    const { name, email, phone, errors } = this.state;
    errors[0] = {
      name: !this.state.name,
      phone: !this.state.phone,
      email: !this.state.email,
    };
    this.setState(
      {
        errors,
      },
      async () => {
        if (Object.values(this.state.errors[0]).every((i) => !i)&& !this.checkNumber()) {
          const response = await axios.post("/api/calendar/contact/add", {
            name,
            email,
            phone,
            id: this.props.currentUser.id,
          });
          if (response.data.msg === "sucessfully added contact") {
            alert('contact added successfully')
            this.getContacts()
            this.setState({showLoader:false ,viewableModal:!this.state.viewableModal})
          } else {alert('cant be added')}
        }
        else{
          console.log("here but by",this.state,errors) 
          this.setState({showLoader:false})}
      }
    );
  };

  render() {
    const tableData = {
      columns: [
        { name: "Name", selector: "name", sortable: true },
        { name: "Email", selector: "email", sortable: true },
        { name: "Phone", selector: "phone", sortable: true },
      ],
      data: [],
    };
    return (
      <div id="app">
        <CheckDetails />
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <div className="content container-fluid">
            <section className="page-content" style={{ padding: 0 }}>
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>Contacts</h1>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary xlx"
                      onClick={() =>
                        this.setState({
                          viewableModal: true,
                        })
                      }
                      // style={{ marginBottom: "20px" }}
                    >
                      Add Contact
                    </button>
                  </div>
                </div>
              </header>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        {/* <table
                        id="bs4-table"
                        className="table table-striped table-bordered"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.loaded ? this.loadData() : "hi"}
                        </tbody>
                      </table> */}
                        {this.state.loaded ? (
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
                        ) : (
                          <DataTableExtensions
                            {...tableData}
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="mt-1 d-flex justify-content-center"
                  style={{ width: "100%" }}
                >
                  {/* <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.count}
                  totalItemsCount={this.state.totalPages}
                  itemClass="page-item"
                  linkClass="page-link"
                  pageRangeDisplayed={10}
                  onChange={this.handlePageChange.bind(this)}
                /> */}
                </div>
              </div>
            </section>
          </div>
          <Modal
            isOpen={this.state.viewableModal}
            toggle={() =>
              this.setState({ viewableModal: !this.state.viewableModal })
            }
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Contact </h5>
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
                    <label
                      htmlFor="editTitle"
                      className="col-md-2 control-label"
                    >
                      Name
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className={classNames({
                          "form-control": true,
                          "is-invalid":
                            this.state.showError && this.state.errors[0].name,
                        })}
                        value={this.state.name}
                        name="name"
                        onChange={this.handleField}
                        placeholder="Enter Name"
                        required
                      />
                      {this.handleErrors("name")}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-2 control-label">Email</label>
                    <div className="col-md-10">
                      <input
                        type="email"
                        className={classNames({
                          "form-control": true,
                          "is-invalid":
                            this.state.showError && this.state.errors[0].email,
                        })}
                        value={this.state.email}
                        onChange={this.handleField}
                        name="email"
                        placeholder="Enter Email"
                        required
                      />
                      {this.handleErrors("email")}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-2 control-label">
                      Phone Number
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className={classNames({
                          "form-control": true,
                          "is-invalid":
                            this.state.showError &&
                            (this.state.errors[0].phone || this.checkNumber()),
                        })}
                        value={this.state.phone}
                        onChange={this.handleField}
                        name="phone"
                        placeholder="Enter Phone"
                        required
                      />
                      {this.handleErrors("phone")}
                      {this.handleNumber()}
                    </div>
                  </div>
                </form>
                <div className="modal-footer">
                  <div
                    className="preloader pl-xxs pls-primary"
                    style={
                      this.state.showLoader
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <svg className="pl-circular" viewBox="25 25 50 50">
                      <circle className="plc-path" cx={50} cy={50} r={20} />
                    </svg>
                  </div>
                  <button className="btn btn-primary" onClick={this.handleAdd} id="sweetalert_demo_9">
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, { getuserDetails })(ContactDetails);
