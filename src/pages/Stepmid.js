import React from "react";
import { Select } from "antd";
import classNames from "classnames";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Multiselect } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
const { Option } = Select;

class Stepmid extends React.Component {
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
      "OFF",
    ],
    timeFilled: "",
    tags: [],
    cat: "",
    services: [],
    serviceList: [
      {
        main: "Electronics & Appliances",
        options: [
          "Computer Service",
          "Mobile Repair",

          "CCTV Installation & Repair",

          "Water Pump Repair",

          "Refrigerator Repair",

          "Water Purifier Repair ",
          "Microwave Oven Repair ",

          "Chimney Repair",

          "Electric Geyser Repair",

          "Washing Machine Repair",

          "TV Repair LED/ LCD Only",

          "Inverter Repair",

          "Dishwasher Repair",

          "AC Repair",

          "Apple Repair Services",

          "Printer Repair",

          "DTH Repair & Re-Installation",

          "TV Repair CRT TV Only",

          "TV Wall Mounting / Installation",

          "Technicians",
        ],
      },
      {
        main: "Home Maintenance",
        options: [
          "Packers and Movers",
          "Carpenters",

          "Plumbers",
          "Electricians",

          "Painters",
          "Rainwater Harvesting",

          "Interior Designers",
          "Gardeners",

          "Masonry Works",
          "Welding Works",
          "Architects",
          "Solar Heater Services",

          "Water Proofing",

          "Civil Contractors",
          "Packers and Movers Outstation",

          "False Ceiling",

          "Sofa Repair & Service",
          "Aluminum Fabrication",
        ],
      },
      {
        main: "Cleaning Services",
        options: [
          "Pest Control Services",

          "Laundry Services",
          "Watertank Cleaning",

          "House Cleaning Services",
          "Septic Tank Cleaning",

          "Chimney Cleaning",
          "Home Carpet Cleaning",

          "Glass Cleaning Service",
          "Office Cleaning Services",

          "Aquarium Cleaning",
          "Hob Cleaning",

          "Termite Control",
          "Commercial Pest Control",

          "Bathroom Cleaning",
          "Kitchen Cleaning",

          "Sofa Cleaning",
          "Commercial Carpet Cleaning",

          "Disinfection And Sanitisation",
        ],
      },
      {
        main: "Events & Occasions",
        options: [
          "Cake Delivery",

          "Flowers Delivery",
          "Pandits & Purohits",

          "Mehendi Artists",
          "Caterers",

          "Wedding Planners",
          "Birthday Planners",

          "Balloon Decor",
          "Engagement Planners",

          "Sangeet Planners",
          "Mehendi Planners",

          "Reception Planners",
          "Baby Shower",

          "Naming Ceremony",
          "Flower Decor",

          "Corporate Event",
        ],
      },
      {
        main: "Photography Services",
        options: [
          "Wedding Photography",

          "Pre Wedding Shoot",

          "Events Photography",
          "Baby Photographers",

          "Maternity Photographers",
          "Product Shoots",

          "Portraits and Portfolio Shoots",
        ],
      },
      {
        main: "Automobile Services",
        options: [
          "Car Wash",

          "Driving School",
          "Bike Repair & Service",

          "Car Body Shop",
          "Car Service",

          "Breakdown Assistance",
        ],
      },
      {
        main: "Health & Personal",
        options: [
          "Physiotherapy at Home",

          "Fitness Trainer at Home",
          "Yoga & Meditation at Home",

          "Tattoo Artists",
          "Beauty Services",

          "Astrology",
          "Tailoring",

          "Security Guards",
          "House Keeping",

          "Bridal Makeup",
          "Shoe Laundry",

          "Dietitian",
        ],
      },
      {
        main: "Document Services",
        options: [
          "Passport Consultants",

          "PAN Card Consultants",
          "Notary & Agreements ",

          "VISA Service",
          "GST Services",

          "IT Returns Filing  ",
        ],
      },
    ],
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    let { services } = this.props;
    console.log("workdays", services);
    this.setState({ services });
  };

  displayAll = () => {
    return this.state.services.map((obj, keybig) => {
      let mappedservices = [];
      if (obj && obj.services)
        mappedservices = obj.services.map((serv, key) => {
          return (
            <div className="flexing-child">
              <span className="spanners">{serv}</span>
              <span
                onClick={() => this.deleteService(key, keybig)}
                className="crosses"
              >
                x
              </span>
            </div>
          );
        });
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-3 flexing">
              <div className=" flexing-child">
                <span className="spanners2">{obj.category}</span>
                <span
                  onClick={() => this.deleteCategory(keybig)}
                  className="crosses2"
                >
                  x
                </span>
              </div>
            </div>
            <div className="col-md-9 flexing">{mappedservices}</div>
            <br />
          </div>
          <div className="empty-div"></div>
        </React.Fragment>
      );
    });
  };

  categoryHandle = () => {
    return this.state.services.map((ele, key) => {
      return (
        <div className="row">
          <div className="col-md-5">
            <label>Category</label>

            <select
              value={ele.category}
              onChange={(e) => this.handleCat(e, key)}
              className="form-input color-w"
            >
              <option>Electronics & Appliances</option>
              <option>Home Maintenance</option>
              <option>Cleaning Services</option>
              <option>Events & Occasions</option>
              <option>Photography Services</option>
              <option>Automobile Services</option>
              <option>Health & Personal</option>
              <option>Document Services</option>
            </select>
          </div>
          <div className="col-md-5">
            <label>Services</label>
            <br />
            <Multiselect
              data={
                this.state.serviceList[
                  this.state.serviceList.findIndex(
                    (e) => e.main === ele.category
                  )
                ].options
              }
              value={ele.services}
              onChange={(value) => this.handleAdd(value, key)}
            />
          </div>
          <div className="col-md-1  add-but">
            <i class="la la-plus" onClick={this.addCat}></i>
          </div>
          {key !== 0 && (
            <div className="col-md-1  add-but">
              <i class="la la-close" onClick={() => this.delCat(key)}></i>
            </div>
          )}
        </div>
      );
    });
  };
  addCat = () => {
    let { services } = this.state;
    services.push({ category: "Electronics & Appliances", services: [] });
    this.setState({ services });
  };
  delCat = (key) => {
    let { services } = this.state;
    services.splice(key, 1);
    this.setState({ services });
  };
  handleCat = (e, key) => {
    let { services } = this.state;
    services[key].category = e.target.value;
    services[key].services = [];
    this.setState({ services });
  };
  deleteCategory = (key) => {
    const { services } = this.state;
    services.splice(key, 1);
    this.setState({ services });
  };
  deleteService = (key, index) => {
    const { services } = this.state;
    services[index].services.splice(key, 1);
    this.setState({ services });
  };
  handleAdd = (value, key) => {
    let { services } = this.state;

    services[key].services = value;
    this.setState({ services });
  };
  continue = (e) => {
    e.preventDefault();
    if (this.props.checkService()) {
      console.log("xD", this.state.services);

      this.props.nextStep();
    }
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { handleChange, worktype, workservice } = this.props;
    console.log("statehere", this.state);
    return (
      <fieldset>
        <p style={{ textAlign: "left" }}>
          Please Enter Business Categories & Their Corresponding Services{" "}
        </p>

        {this.categoryHandle()}

        <button
          className={classNames({
            previous: true,
            "action-button-previous": true,
            "align-left": true,
            "down-bot": this.state.services.length === 0,
            "down-bot-2": this.state.services.length === 1,
            "down-bot-3": this.state.services.length === 2,
          })}
          onClick={this.back}
        >
          Previous
        </button>
        <button
          type="button"
          className={classNames({
            next: true,
            "action-button": true,
            "align-right": true,
            "down-bot": this.state.services.length === 0,
            "down-bot-2": this.state.services.length === 1,
            "down-bot-3": this.state.services.length === 2,
          })}
          onClick={this.continue}
        >
          Next
        </button>
      </fieldset>
    );
  }
}

export default Stepmid;
