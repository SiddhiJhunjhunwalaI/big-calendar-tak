import React from "react";
import ReactDom from "react-dom";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import classNames from "classnames";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

// import TimezonePicker from "react-timezone";

class Step2 extends React.Component {
  state = [];
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.setState({ phone: this.props.phone });
  };
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  handlePhone = (phone) => {
    const { handlePhone } = this.props;
    this.setState({ phone });
    handlePhone(phone);
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
  render() {
    const {
      handleChange,
      phone,
      address,
      name,
      timezone,
      state,
      country,
      zip,
      strength,
      industry,
      handleTimeZone,
      showError,
      errors,
    } = this.props;

    return (
      <fieldset>
        <div className="ms-form-contents">
        <p>Please enter your business details</p>
          <label htmlFor="name">Business Name</label>
         
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter registered business name"
              value={name}
              onChange={handleChange("name")}
              className={classNames({
                "form-control": true,
                "is-invalid": showError && errors.name,
              })}
            />
            {this.props.handleErrors("name")}
          </div>
          <div classNames="form-group">
            <label htmlFor="address">Business Address</label>
            <input
              name="address"
              placeholder="Enter registered business address"
              value={address}
              onChange={handleChange("address")}
              className={classNames({
                "form-control": true,
                "is-invalid": showError && errors.address,
              })}
            />
            {this.props.handleErrors("address")}
          </div>
          <div className="row">
            <div className="col-md-6">
              <div classNames="form-group">
                <label htmlFor="address">Country</label>
                <CountryDropdown
                  value={country}
                  showDefaultOption={false}
                  onChange={(val) => this.props.selectCountry(val)}
                  
                  className={classNames({
                    "form-input": true,
                    "color-w": true,
                    "is-invalid": showError && errors.country,
                  })}
                />
                {this.props.handleErrors("country")}
              </div>
            </div>
            <div className="col-md-6">
              <div classNames="form-group">
                <label htmlFor="address">State/Province</label>
                <RegionDropdown
                  country={country}
                  value={state}
                  onChange={(val) => this.props.selectRegion(val)}
                  className={classNames({
                    "form-input": true,
                    "color-w": true,
                    "is-invalid": showError && errors.state,
                  })}
                  showDefaultOption={false}
                />
                {this.props.handleErrors("state")}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div classNames="form-group">
                <label htmlFor="address">Zip/Postal Code</label>
                <input
                  name="address"
                  placeholder="Enter ZipCode"
                  value={zip}
                  onChange={handleChange("zip")}
                  className={classNames({
                    "form-control": true,
                    "is-invalid": showError && errors.zip,
                  })}
                />
                {this.props.handleErrors("zip")}
              </div>
            </div>
            <div className="col-md-6">
              <div classNames="form-group">
                <label htmlFor="phone">Phone number</label>
                <PhoneInput
                  flags={flags}
                  name="phone"
                  placeholder="Phone number"
                  value={this.state.phone}
                  onChange={this.handlePhone}
                  className={classNames({
                    "form-control": true,
                    "is-invalid": showError && errors.phone,
                  })}
                />
                {this.props.handleErrors("phone")}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div classNames="form-group">
                <label htmlFor="phone">Business Industry</label>
                <select
                  className="form-input color-w"
                  onChange={handleChange("industry")}
                  placeholder="Country"
                  value={industry}
                  className={classNames({
                    "form-input": true,
                    "color-w": true,
                    "is-invalid": showError && errors.industry,
                  })}
                >
                  {this.returnLinkedin()}
                </select>
                {this.props.handleErrors("industry")}
              </div>
            </div>
            <div className="col-md-6">
              <div classNames="form-group">
                <label htmlFor="address"> Employee strength</label>
                <input
                  name="strength"
                  placeholder="Enter employee strength"
                  value={strength}
                  onChange={handleChange("strength")}
                  className={classNames({
                    "form-control": true,
                    "is-invalid": showError && this.props.checkNumber(),
                  })}
                />

                {this.props.handleStrength()}
              </div>
            </div>
          </div>

          <br />
          <button
            type="button"
            className="next action-button align-right"
            onClick={this.continue}
          >
            Next
          </button>
        </div>
      </fieldset>
    );
  }
}

export default Step2;
