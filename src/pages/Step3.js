import React, { Fragment } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { socket } from "../App";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getuserDetails } from "../actions";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";


class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Imgsrc: props.logo,
      upload: props.upload,
      file: props.file,
      cropped: null,
      filled:false
    };
    this.cropper = React.createRef(null);
  }
  _crop = () => {
    this.setState({
      cropped: this.cropper.current.getCroppedCanvas().toDataURL(),
    });
  };

  handleDrop = (accepted) => {
    const { handleLogo } = this.props;
    console.log(accepted);
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
    handleLogo(this.state.Imgsrc);
  };
  handleUpload = async (e) => {
    e.preventDefault();

    console.log(this.props.currentUser.id,"id here");
    const Imgsrc = this.state.cropped;
    socket.emit("image", { Imgsrc,id:this.props.currentUser.id });
    socket.on("error", () => {
      alert("error");
    });
    socket.on("success", () => {
      this.setState({ upload: true });
      this.props.handleUpload();
    });
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // }
    // const response=await axios.post(`/api/users/logo`,{Imgsrc});
    // if(response.data.err)
    // alert("error");
    // else{

    // }
  };
  handleDelete = async (e) => {
    e.preventDefault();
    this.setState({ file: null, Imgsrc: null });
    this.props.handleFile(null);
    this.props.handleLogo(null);
  };
  continue = (e) => {
    e.preventDefault();
    this.props.handleSubmit();
  };
  back = (e) => {
    e.preventDefault();
    const { Imgsrc, file } = this.state;
    if (Imgsrc !== null) this.props.handleLogo(Imgsrc);
    if (file !== null) this.props.handleFile(file);
    this.props.prevStep();
  };

  dropIt = () => {
    if (this.state.Imgsrc === null) {
      return (
        <Dropzone onDrop={this.handleDrop} accept="image/*">
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section className="card" style={{ border: "1px dashed black" }}>
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
    } else if (!this.state.upload) {
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
        </div>
      );
    } else {
      return (
        <div className="card" style={{ width: "18rem;" }}>
          <img
            className="card-img-top"
            src={this.state.cropped?this.state.cropped:this.state.Imgsrc}
            alt="Card image cap"
            id="logo"
          />
          <div className="card-body">
            <div className="content">Your logo is successfully Updated</div>
          </div>
        </div>
      );
    }
  };

  render() {
    console.log('filled',this.state.filled)
    const { handleChange, fb, insta, twitter, website,linkedin } = this.props;
    const getClassName = (className, isActive) => {
      if (!isActive) return className;
      return `${className} ${className}-active`;
    };
    const { Imgsrc } = this.state;

    return (
      <fieldset>
        <div className="ms-form-contents">
        {this.filled?<Redirect to="/dashboard"></Redirect>:""}
        <p style={{textAlign:"left"}}>Please enter social profiles for your business</p>
        <label htmlFor="fb">Facebook</label>
        <input
          type="text"
          name="fb"
          placeholder="Facebook link"
          value={fb}
          onChange={handleChange("fb")}
        />
        <label htmlFor="needs">Instagram</label>
        <input
          type="text"
          name="insta"
          placeholder="Instagram Link"
          value={insta}
          onChange={handleChange("insta")}
        />
        <label htmlFor="needs">Twitter</label>
        <input
          type="text"
          name="twitter"
          placeholder="Twitter"
          value={twitter}
          onChange={handleChange("twitter")}
        />
         <label htmlFor="needs">LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          value={linkedin}
          onChange={handleChange("linkedin")}
        />
        <label htmlFor="website">Website</label>
        <input
          type="text"
          name="website"
          placeholder="url"
          value={website}
          onChange={handleChange("website")}
        />
        {/* <label htmlFor="logo">upload logo</label>

        {this.dropIt()} */}

        <input
          type="button"
          name="previous"
          className="previous action-button-previous align-left"
          defaultValue="Previous"
          onClick={this.back}
        />
        <input
          type="button"
          name="submit"
          className="next action-button align-right"
          defaultValue="Done"
          onClick={this.continue}
        />
        </div>
      </fieldset>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  registered: auth.registered,
  currentUser: auth.currentUser,
  
});

export default connect(mapStateToProps, { getuserDetails })(Step3);
