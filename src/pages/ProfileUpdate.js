import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavigationBar";
import { getuserDetails } from "../actions";
import { connect } from "react-redux";
import axios from "axios";
import { Select } from "antd";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import Dropzone from "react-dropzone";
import { socket } from "../App";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import CheckDetails from "../components/CheckDetails";
import classNames from "classnames";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Multiselect } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { validDuration, validBreak } from "../utils/timecheck";
import ChangePass from "./ChangePass";


const { Option } = Select;

class ProfileUpdate extends React.Component {
  imgs;
  state = {
    userDetails: {},
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
    newWorkDays: [],
    tags: [],
    cat: "",
    fullname:"",
    errors: [
      {
        name: true,
        phone: true,
        address: true,
        zip: true,
        state: true,
        country: true,
        industry: true,
        
      },
    ],
    showError: false,
    services: [{category:"Electronics & Appliances",services:["Computer Service"]}],
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
    console.log(this.props.currentUser);
    this.cropper = React.createRef(null);
  }
  checkService = () => {
    if (this.state.services.length <= 0) return false;
    else return true;
  };
  checkHours = () => {
    return !this.state.workdays.every((ele) => ele.end === "End Time");
  };
  handleSubmit1 = async () => {
    // await this.handleUpload();
    this.setState({ showError: true });
    let { errors } = this.state;
    errors[0] = {
      name: !this.state.name,
      phone: !this.state.phone,
      address: !this.state.address,
      zip: !this.state.zip,
      state: !this.state.state,
      country: !this.state.country,
      industry: !this.state.industry,
      
    };
    this.setState(
      {
        errors,
      },
      async () => {
        if (Object.values(this.state.errors[0]).every((i) => !i)) {
          const {
            name,
            phone,
            address,
            zip,
            state,
            country,
            industry,
            strength,
          } = this.state;

          const details = {
            _user: this.props.currentUser.id,
            name,
            phone,
            address,
            zip,
            state,
            country,
            industry,
            strength,
          };
          console.log(details);
           await axios.post(`/api/users/profile/update`, {
            data: { details },
          }).then((res)=>{
          toast.success("Profile Saved successfully")
            this.getProfile()
        }
          ).catch(()=>{toast.error("Profile couldnt be saved")
          this.getProfile()
        })
          
        }
      }
    );
  };

  handleSubmit2 = async () => {
    if (this.checkService()) {
      console.log("xD", this.state.services);

      const { services } = this.state;

      const details = {
        _user: this.props.currentUser.id,
        services,
      };
      console.log(details);
      await axios.post(`/api/users/profile/update`, {
        data: { details },
      }).then((res)=>{
      toast.success("Profile Saved successfully")
        this.getProfile()
    }
      ).catch(()=>{toast.error("Profile couldnt be saved")
      this.getProfile()
    })
    }
  };
  handleSubmit3 = async () => {
  
      console.log("xD", this.state.services);

      const { workdays } = this.state;

      const details = {
        _user: this.props.currentUser.id,
        workdays,
      };
      console.log(details);
      await axios.post(`/api/users/profile/update`, {
        data: { details },
      }).then((res)=>{
      toast.success("Profile Saved successfully")
        this.getProfile()
    }
      ).catch(()=>{toast.error("Profile couldnt be saved")
      this.getProfile()
    })
    
  };
  handleSubmit4 = async () => {
    console.log("xD", this.state.services);

    const { fb, twitter, insta, linkedin, website } = this.state;

    const details = {
      _user: this.props.currentUser.id,
      fb,
      twitter,
      insta,
      linkedin,
      website,
    };
    console.log(details);
    await axios.post(`/api/users/profile/update`, {
      data: { details },
    }).then((res)=>{
    toast.success("Profile Saved successfully")
      this.getProfile()
  }
    ).catch(()=>{toast.error("Profile couldnt be saved")
    this.getProfile()
  })
  };
  getProfile=async ()=>
  {  const { currentUser } = this.props;
  const userDetails = await axios.get(`/api/users/profile/get`, {
    params: { currentUser: currentUser.id },
  });
  axios.get(`/api/users/current`).then((res)=>{this.setState({fullname:res.data.name})})
  if(userDetails.data.foundDetails.image)
  this.imgs=require(`../images/${this.props.currentUser.id}.jpeg`)
  else
  this.imgs=require(`../images/image1.jpeg`)
  console.log("img ups",this.imgs)
  this.setState({ userDetails: userDetails.data.foundDetails });
  this.setState({ email: userDetails.data.email });
  const arr = Object.keys(userDetails.data.foundDetails);
  console.log(arr);

  Object.keys(userDetails.data.foundDetails).forEach((ele) => {
    this.setState({ [ele]: userDetails.data.foundDetails[ele] });
  });

  }
  componentDidUpdate = () => {
    console.log(this.state);
  };
  componentDidMount = async () => {
    const { currentUser } = this.props;
    const userDetails = await axios.get(`/api/users/profile/get`, {
      params: { currentUser: currentUser.id },
    });
    axios.get(`/api/users/current`).then((res)=>{this.setState({fullname:res.data.name})})
    if(userDetails.data.foundDetails.image)
    this.imgs=require(`../images/${this.props.currentUser.id}.jpeg`)
    else
    this.imgs=require(`../images/image1.jpeg`)
    console.log("img ups",this.imgs)
    this.setState({ userDetails: userDetails.data.foundDetails });
    this.setState({ email: userDetails.data.email });
    const arr = Object.keys(userDetails.data.foundDetails);
    console.log(arr);

    Object.keys(userDetails.data.foundDetails).forEach((ele) => {
      this.setState({ [ele]: userDetails.data.foundDetails[ele] });
    });
  };

  handleChange = (input) => (e) => {
    let { errors } = this.state;
    errors[0][input] = !e.target.value;
    this.setState({ [input]: e.target.value, errors });
  };
  handlePhone = (phone) => {
    this.setState({ phone });
  };
  selectCountry = (val) => {
    let { errors } = this.state;
    errors[0].country = !val;
    this.setState({ country: val });
  };

  selectRegion = (val) => {
    let { errors } = this.state;
    errors[0].state = !val;
    this.setState({ state: val });
  };
  handleErrors = (params) => {
    return (
      this.state.showError &&
      this.state.errors[0][params] && (
        <div className="invalid-feedback">This field cannot be empty</div>
      )
    );
  };
  checkNumber=()=>
  {if(this.state.strength===null||this.state.strength==='')
    return false
    return (
      ! /^\d+$/.test(this.state.strength)
      )
    
  }
  handleNumber = () => {
    return (
      this.state.showError &&
     
      !/^\d+$/.test(this.state.strength) && (
        <div className="invalid-feedback">Invalid Number</div>
      )
    );
  };
  // timezoneList = () => {
  //   const { userDetails } = this.state;
  //   return (
  //     <div className="form-group">
  //       <label htmlFor="timezone">Timezone</label>
  //       <select
  //         name="timezone"
  //         id="timezone-offset"
  //         className="form-control"
  //         onChange={this.handleChange("timezone")}
  //         value={this.state.timezone}
  //       >
  //         <option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
  //         <option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
  //         <option value="-10:00">(GMT -10:00) Hawaii</option>
  //         <option value="-09:50">(GMT -9:30) Taiohae</option>
  //         <option value="-09:00">(GMT -9:00) Alaska</option>
  //         <option value="-08:00">
  //           (GMT -8:00) Pacific Time (US &amp; Canada)
  //         </option>
  //         <option value="-07:00">
  //           (GMT -7:00) Mountain Time (US &amp; Canada)
  //         </option>
  //         <option value="-06:00">
  //           (GMT -6:00) Central Time (US &amp; Canada), Mexico City
  //         </option>
  //         <option value="-05:00">
  //           (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
  //         </option>
  //         <option value="-04:50">(GMT -4:30) Caracas</option>
  //         <option value="-04:00">
  //           (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
  //         </option>
  //         <option value="-03:50">(GMT -3:30) Newfoundland</option>
  //         <option value="-03:00">
  //           (GMT -3:00) Brazil, Buenos Aires, Georgetown
  //         </option>
  //         <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
  //         <option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
  //         <option value="+00:00" selected="selected">
  //           (GMT) Western Europe Time, London, Lisbon, Casablanca
  //         </option>
  //         <option value="+01:00">
  //           (GMT +1:00) Brussels, Copenhagen, Madrid, Paris
  //         </option>
  //         <option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
  //         <option value="+03:00">
  //           (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
  //         </option>
  //         <option value="+03:50">(GMT +3:30) Tehran</option>
  //         <option value="+04:00">
  //           (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
  //         </option>
  //         <option value="+04:50">(GMT +4:30) Kabul</option>
  //         <option value="+05:00">
  //           (GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
  //         </option>
  //         <option value="+05:50">
  //           (GMT +5:30) Bombay, Calcutta, Madras, New Delhi
  //         </option>
  //         <option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
  //         <option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
  //         <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
  //         <option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
  //         <option value="+08:00">
  //           (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
  //         </option>
  //         <option value="+08:75">(GMT +8:45) Eucla</option>
  //         <option value="+09:00">
  //           (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
  //         </option>
  //         <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
  //         <option value="+10:00">
  //           (GMT +10:00) Eastern Australia, Guam, Vladivostok
  //         </option>
  //         <option value="+10:50">(GMT +10:30) Lord Howe Island</option>
  //         <option value="+11:00">
  //           (GMT +11:00) Magadan, Solomon Islands, New Caledonia
  //         </option>
  //         <option value="+11:50">(GMT +11:30) Norfolk Island</option>
  //         <option value="+12:00">
  //           (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
  //         </option>
  //         <option value="+12:75">(GMT +12:45) Chatham Islands</option>
  //         <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
  //         <option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
  //       </select>
  //     </div>
  //   );
  // };
  _crop = () => {
    this.setState({
      cropped: this.cropper.current.getCroppedCanvas().toDataURL(),
    });
  };

  handleDrop = (accepted) => {
    const currentFile = accepted[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.setState({ Imgsrc: reader.result });
      },
      false
    );
    reader.readAsDataURL(currentFile);
    this.setState({ file: accepted[0] });
  };
  handleUpload = async () => {
    socket.emit("image", {
      Imgsrc: this.state.cropped,
      id: this.props.currentUser.id,
    });
    socket.on("error", () => {
      alert("error");
    });
    socket.on("success", () => {
      window.reload()
    });
    this.setState({ viewableModal: false });
    // const details = {
    //   _user: this.props.currentUser.id,
    //   image,
    // };
    // console.log(details);
    // const response = await axios.post(`/api/users/profile/update`, {
    //   data: { details },
    // });
  };
  handleDelete = async (e) => {
    e.preventDefault();
    this.setState({ file: null, Imgsrc: null });
  };
  handleDisplay = () => {
    const { workdays } = this.state.userDetails;
    return workdays.map((ele, key) => {
      if (ele.off === true)
        return (
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="icon dripicons-calendar font-size-22 v-align-middle p-r-15 p-t-5" />{" "}
              {ele.day}:{ele.start}
            </a>
          </li>
        );
      else
        return (
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="icon dripicons-calendar font-size-22 v-align-middle p-r-15 p-t-5" />{" "}
              {ele.day}:{ele.start}-{ele.end}
            </a>
          </li>
        );
    });
  };

  dropIt = () => {
    if (!this.state.Imgsrc) {
      return (
        <Dropzone onDrop={this.handleDrop} accept="image/*">
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section
              className="card"
              style={{ border: "1px dashed black", margin: "50px" }}
            >
              <div {...getRootProps()} style={{ padding: "100px" }}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="dropzone-content">
                    Release to drop the files here
                  </p>
                ) : (
                  <p className="dropzone-content">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
            </section>
          )}
        </Dropzone>
      );
    } else {
      return (
        <div className="card" style={{ width: "18rem;" }}>
          <div style={{ margin: "10px" }}>
            <center>
              <Cropper
                ref={this.cropper}
                src={this.state.Imgsrc}
                style={{ height: 220, width: 220 }}
                modal={false}
                // Cropper.js options
                cropBoxResizable={false}
                guides={false}
                minCropBoxWidth={200}
                minCropBoxHeight={200}
                crop={this._crop}
              />
            </center>
          </div>
          <center>
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={this.handleUpload}
                style={{ margin: "5px" }}
              >
                Upload
              </button>
              <button
                className="btn btn-danger"
                onClick={this.handleDelete}
                style={{ margin: "5px" }}
              >
                Delete
              </button>
            </div>
          </center>
        </div>
      );
    }
  };
  
  returnLinkedin=()=>
  {
    return(<React.Fragment>
    <option>Accounting</option>
    <option>Airlines/Aviation</option>
    <option>Alternative Dispute Resolution</option>
    <option>Alternative Medicine</option>
    <option>Animation</option>
    <option>Apparel &amp; Fashion</option>
    <option>Architecture &amp; Planning</option>
    <option>Arts &amp; Crafts</option>
    <option>Automotive</option>
    <option>Aviation &amp; Aerospace</option>
    <option>Banking</option>
    <option>Biotechnology</option>
    <option>Broadcast Media</option>
    <option>Building Materials</option>
    <option>Business Supplies &amp; Equipment</option>
    <option>Capital Markets</option>
    <option>Chemicals</option>
    <option>Civic &amp; Social Organization</option>
    <option>Civil Engineering</option>
    <option>Commercial Real Estate</option>
    <option>Computer &amp; Network Security</option>
    <option>Computer Games</option>
    <option>Computer Hardware</option>
    <option>Computer Networking</option>
    <option>Computer Software</option>
    <option>Construction</option>
    <option>Consumer Electronics</option>
    <option>Consumer Goods</option>
    <option>Consumer Services</option>
    <option>Cosmetics</option>
    <option>Dairy</option>
    <option>Defense &amp; Space</option>
    <option>Design</option>
    <option>E-learning</option>
    <option>Education Management</option>
    <option>Electrical &amp; Electronic Manufacturing</option>
    <option>Entertainment</option>
    <option>Environmental Services</option>
    <option>Events Services</option>
    <option>Executive Office</option>
    <option>Facilities Services</option>
    <option>Farming</option>
    <option>Financial Services</option>
    <option>Fine Art</option>
    <option>Fishery</option>
    <option>Food &amp; Beverages</option>
    <option>Food Production</option>
    <option>Fundraising</option>
    <option>Furniture</option>
    <option>Gambling &amp; Casinos</option>
    <option>Glass, Ceramics &amp; Concrete</option>
    <option>Government Administration</option>
    <option>Government Relations</option>
    <option>Graphic Design</option>
    <option>Health, Wellness &amp; Fitness</option>
    <option>Higher Education</option>
    <option>Hospital &amp; Health Care</option>
    <option>Hospitality</option>
    <option>Human Resources</option>
    <option>Import &amp; Export</option>
    <option>Individual &amp; Family Services</option>
    <option>Industrial Automation</option>
    <option>Information Services</option>
    <option>Information Technology &amp; Services</option>
    <option>Insurance</option>
    <option>International Affairs</option>
    <option>International Trade &amp; Development</option>
    <option>Internet</option>
    <option>Investment Banking</option>
    <option>Investment Management</option>
    <option>Judiciary</option>
    <option>Law Enforcement</option>
    <option>Law Practice</option>
    <option>Legal Services</option>
    <option>Legislative Office</option>
    <option>Leisure, Travel &amp; Tourism</option>
    <option>Libraries</option>
    <option>Logistics &amp; Supply Chain</option>
    <option>Luxury Goods &amp; Jewelry</option>
    <option>Machinery</option>
    <option>Management Consulting</option>
    <option>Maritime</option>
    <option>Market Research</option>
    <option>Marketing &amp; Advertising</option>
    <option>Mechanical Or Industrial Engineering</option>
    <option>Media Production</option>
    <option>Medical Device</option>
    <option>Medical Practice</option>
    <option>Mental Health Care</option>
    <option>Military</option>
    <option>Mining &amp; Metals</option>
    <option>Motion Pictures &amp; Film</option>
    <option>Museums &amp; Institutions</option>
    <option>Music</option>
    <option>Nanotechnology</option>
    <option>Newspapers</option>
    <option>Non-profit Organization Management</option>
    <option>Oil &amp; Energy</option>
    <option>Online Media</option>
    <option>Outsourcing/Offshoring</option>
    <option>Package/Freight Delivery</option>
    <option>Packaging &amp; Containers</option>
    <option>Paper &amp; Forest Products</option>
    <option>Performing Arts</option>
    <option>Pharmaceuticals</option>
    <option>Philanthropy</option>
    <option>Photography</option>
    <option>Plastics</option>
    <option>Political Organization</option>
    <option>Primary/Secondary Education</option>
    <option>Printing</option>
    <option>Professional Training &amp; Coaching</option>
    <option>Program Development</option>
    <option>Public Policy</option>
    <option>Public Relations &amp; Communications</option>
    <option>Public Safety</option>
    <option>Publishing</option>
    <option>Railroad Manufacture</option>
    <option>Ranching</option>
    <option>Real Estate</option>
    <option>Recreational Facilities &amp; Services</option>
    <option>Religious Institutions</option>
    <option>Renewables &amp; Environment</option>
    <option>Research</option>
    <option>Restaurants</option>
    <option>Retail</option>
    <option>Security &amp; Investigations</option>
    <option>Semiconductors</option>
    <option>Shipbuilding</option>
    <option>Sporting Goods</option>
    <option>Sports</option>
    <option>Staffing &amp; Recruiting</option>
    <option>Supermarkets</option>
    <option>Telecommunications</option>
    <option>Textiles</option>
    <option>Think Tanks</option>
    <option>Tobacco</option>
    <option>Translation &amp; Localization</option>
    <option>Transportation/Trucking/Railroad</option>
    <option>Utilities</option>
    <option>Venture Capital &amp; Private Equity</option>
    <option>Veterinary</option>
    <option>Warehousing</option>
    <option>Wholesale</option>
    <option>Wine &amp; Spirits</option>
    <option>Wireless</option>
    <option>Writing &amp; Editing</option>
    </React.Fragment>)
  }
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
  handleAdd = (value, key) => {
    let { services } = this.state;

    services[key].services = value;
    this.setState({ services });
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
    const { workdays } = this.state;
    console.log("break", workdays[inp1]);

    workdays[inp1].breaks.splice(inp3, 1);
    this.setState({ workdays });
  };
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
                    maxWidth: "1074px",
                    minWidth:"1074px",
                    height:"200px",
                    zIndex: -1,
                  }
                : {
                    display: "inline-block",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    maxWidth: "1074px",
                    minWidth:"1074px",
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
                style={{ display: "inline-block", paddingLeft:"10px" ,width:"130px"}}
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
  render() {
    const { userDetails, email } = this.state;
    return (
      <div id="app">
        <CheckDetails />
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <div className="content container-fluid">
            <section className="page-content container-fluid">
              <ToastContainer/>
              <div className="row">
                <div className="col-xl-3 col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="profile-card text-center">
                        <div className="thumb-xl member-thumb m-b-10 center-block">
                          <img
                            src={
                              userDetails.image
                                ? this.imgs
                                : this.imgs
                            }
                            className="rounded-circle img-thumbnail avatar-img"
                            alt="profile-image"
                            onClick={() =>
                              this.setState({
                                viewableModal: true,
                              })
                            }
                            style={{cursor:`url('../pencil.png'),auto`}}
                          />
                        </div>
                        <div className>
                          <h5 className="m-b-5">{this.state.fullname}</h5>
                          
                        </div>

                        <ul className="list-reset text-left m-t-40">
                          <li className="text-muted">
                            <strong>Mobile:</strong>
                            <span className="m-l-15">{userDetails.phone}</span>
                          </li>
                          <li className="text-muted">
                            <strong>Email:</strong>{" "}
                            <span className="m-l-15">{email}</span>
                          </li>
                         
                        </ul>
                        <ul className="social-links list-inline m-t-30">
                          <li className="list-inline-item">
                            <a
                              title
                              data-placement="top"
                              data-toggle="tooltip"
                              className="tooltips"
                              href={userDetails.fb}
                              data-original-title="Facebook"
                            >
                              <i className="zmdi zmdi-facebook" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              title
                              data-placement="top"
                              data-toggle="tooltip"
                              className="tooltips"
                              
                              data-original-title="Twitter"
                              href={userDetails.twitter}
                            >
                              <i className="zmdi zmdi-twitter" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              title
                              data-placement="top"
                              data-toggle="tooltip"
                              className="tooltips"
                              data-original-title="Instagram"
                              href={userDetails.insta}
                            >
                              <i className="zmdi zmdi-instagram" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              title
                              data-placement="top"
                              data-toggle="tooltip"
                              className="tooltips"
                              href
                              data-original-title="LinkedIn"
                              href={userDetails.linkedin}
                            >
                              <i className="zmdi zmdi-linkedin" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              title
                              data-placement="top"
                              data-toggle="tooltip"
                              className="tooltips"
                              href
                              data-original-title="Website"
                              href={userDetails.website}
                            >
                              <i className="zmdi zmdi-globe-alt" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <hr />
                    {/* <ul className="nav sub-nav v-sub-nav flex-column p-b-30">
                      {this.state.userDetails.workdays
                        ? this.handleDisplay()
                        : ""}
                    </ul> */}
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8">
                  <div className="card card-tabs">
                    <div className="card-header p-0 no-border">
                      <ul className="nav nav-tabs primary-tabs p-l-30 m-0">
                        <li className="nav-item" role="presentation">
                          <a
                            href="#profile-about"
                            className="nav-link active show"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Business Details
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            href="#profile-working"
                            className="nav-link"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Services Offered
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            href="#profile-time"
                            className="nav-link"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Operating Hours
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            href="#profile-social"
                            className="nav-link"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Social Accounts
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            href="#profile-pass"
                            className="nav-link"
                            data-toggle="tab"
                            aria-expanded="true"
                          >
                            Change Password
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane fadeIn active"
                          id="profile-about"
                        >
                          <div className="profile-wrapper p-t-20">
                            <div className="updateprof" id="#msform">
                              <label htmlFor="name">Business Name</label>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Enter registered business name"
                                  value={this.state.name}
                                  onChange={this.handleChange("name")}
                                  className={classNames({
                                    "form-control": true,
                                    "is-invalid":
                                      this.state.showError &&
                                      this.state.errors[0].name,
                                  })}
                                />
                                {this.handleErrors("name")}
                              </div>
                              <div className="form-group">
                                <label htmlFor="address">
                                  Business Address
                                </label>
                                <input
                                  name="address"
                                  placeholder="Enter registered business address"
                                  value={this.state.address}
                                  onChange={this.handleChange("address")}
                                  className={classNames({
                                    "form-control": true,
                                    "is-invalid":
                                      this.state.showError &&
                                      this.state.errors[0].address,
                                  })}
                                />
                                {this.handleErrors("address")}
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="address">Country</label>
                                    <br />
                                    <CountryDropdown
                                      value={this.state.country}
                                      showDefaultOption={false}
                                      onChange={(val) =>
                                        this.selectCountry(val)
                                      }
                                      className={classNames({
                                        "form-input": true,
                                        "color-w": true,
                                        "is-invalid":
                                          this.state.showError &&
                                          this.state.errors[0].country,
                                      })}
                                    />
                                    {this.handleErrors("country")}
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="address">
                                      State/Province
                                    </label>
                                    <br />
                                    <RegionDropdown
                                      country={this.state.country}
                                      value={this.state.state}
                                      onChange={(val) => this.selectRegion(val)}
                                      className={classNames({
                                        "form-input": true,
                                        "color-w": true,
                                        "is-invalid":
                                          this.state.showError &&
                                          this.state.errors[0].state,
                                      })}
                                      showDefaultOption={false}
                                    />
                                    {this.handleErrors("state")}
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="address">
                                      Zip/Postal Code
                                    </label>
                                    <input
                                      name="address"
                                      placeholder="Enter ZipCode"
                                      value={this.state.zip}
                                      onChange={this.handleChange("zip")}
                                      className={classNames({
                                        "form-control": true,
                                        "is-invalid":
                                          this.state.showError &&
                                          this.state.errors[0].zip,
                                      })}
                                    />
                                    {this.handleErrors("zip")}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="phone">Phone number</label>
                                    <PhoneInput
                                      flags={flags}
                                      placeholder="Phone number"
                                      value={this.state.phone}
                                      onChange={this.handlePhone}
                                      className={classNames({
                                        "form-control": true,
                                        "is-invalid":
                                          this.state.showError &&
                                          this.state.errors[0].phone,
                                      })}
                                    />
                                    {this.handleErrors("phone")}
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="phone">
                                      Business Industry
                                    </label>
                                    <br />
                                    <select
                                      className="form-input color-w"
                                      onChange={this.handleChange("industry")}
                                      placeholder="Country"
                                      value={this.state.industry}
                                      className={classNames({
                                        "form-input": true,
                                        "color-w": true,
                                        "is-invalid":
                                          this.state.showError &&
                                          this.state.errors[0].industry,
                                      })}
                                    >
                                     {this.returnLinkedin()}
                                    </select>
                                    {this.handleErrors("industry")}
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="address">
                                      {" "}
                                      Employee strength
                                    </label>
                                    <input
                                      name="strength"
                                      placeholder="Enter employee strength"
                                      value={this.state.strength}
                                      onChange={this.handleChange("strength")}
                                      className={classNames({
                                        "form-control": true,
                                        "is-invalid":
                                          this.state.showError &&
                                          
                                            this.checkNumber(),
                                      })}
                                    />
                                   
                                    {this.handleNumber()}
                                  </div>
                                </div>
                              </div>
                              

                              <br />
                              <button
                                type="button"
                                className="next action-button "
                                onClick={this.handleSubmit1}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                        <Modal
                          isOpen={this.state.viewableModal}
                          toggle={() =>
                            this.setState({
                              viewableModal: !this.state.viewableModal,
                            })
                          }
                        >
                          {this.dropIt()}
                        </Modal>
                        <div className="tab-pane fadeIn " id="profile-working">
                          <div className="profile-wrapper p-t-20 updateprof">
                            <div>
                             

                            {this.categoryHandle()}

                              <button
                                type="button"
                                className={classNames({
                                  next: true,
                                  "action-button": true,
                                  "down-bot": this.state.services.length === 0,
                                  "down-bot-2":
                                    this.state.services.length === 1,
                                  "down-bot-3":
                                    this.state.services.length === 2,
                                })}
                                onClick={this.handleSubmit2}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fadeIn " id="profile-time">
                          <div className="profile-wrapper p-t-20 updateprof">
                            
                            {this.mapTime()}
                            <button
                              type="button"
                              className={classNames({
                                next: true,
                                "action-button": true,
                              })}
                              onClick={this.handleSubmit3}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                        <div className="tab-pane fadeIn " id="profile-social">
                          <div className="profile-wrapper p-t-20 updateprof">
                            
                            <div className="form-group">
                              <label htmlFor="fb">Facebook</label>
                              <input
                                type="text"
                                name="fb"
                                className="form-control"
                                placeholder="Facebook link"
                                value={this.state.fb}
                                onChange={this.handleChange("fb")}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="needs">Instagram</label>
                              <input
                                type="text"
                                name="insta"
                                placeholder="Instagram Link"
                                className="form-control"
                                value={this.state.insta}
                                onChange={this.handleChange("insta")}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="needs">Twitter</label>
                              <input
                                type="text"
                                name="twitter"
                                placeholder="Twitter"
                                className="form-control"
                                value={this.state.twitter}
                                onChange={this.handleChange("twitter")}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="needs">LinkedIn</label>
                              <input
                                type="text"
                                name="linkedin"
                                placeholder="LinkedIn"
                                className="form-control"
                                value={this.state.linkedin}
                                onChange={this.handleChange("linkedin")}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="website">Website</label>
                              <input
                                type="text"
                                name="website"
                                className="form-control"
                                placeholder="url"
                                value={this.state.website}
                                onChange={this.handleChange("website")}
                              />
                            </div>
                            <button
                              type="button"
                              className={classNames({
                                next: true,
                                "action-button": true,
                              })}
                              onClick={this.handleSubmit4}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                        <div className="tab-pane fadeIn " id="profile-pass">
                          <div className="profile-wrapper p-t-20 updateprof">
                            <ChangePass />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
export default connect(mapStateToProps, { getuserDetails })(ProfileUpdate);
