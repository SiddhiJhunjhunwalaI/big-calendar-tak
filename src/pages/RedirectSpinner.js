import axios from "axios";
import React from "react";
import { connect } from 'react-redux'
import { getuserDetails } from "../actions";
import {Redirect} from 'react-router-dom'
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RedirectSpinner extends React.Component {
    state={}
    componentDidMount =async()=>
    {
        const params = new URLSearchParams(this.props.location.search);
        const code = params.get('code');
        if(code)
       { const response= await axios.post('/api/calendar/auth/token',{code,id:this.props.currentUser.id}).then(()=>window.close())
        console.log(response.data)
        this.setState({auth:response.data})
        }
        else
        {
         alert('failed to sync google account')
          this.setState({auth:"xD"})
        }
    
        
    }

    redirecter=()=>
    {   const {auth}=this.state
        return <Redirect to={{pathname:"/calendar/i",auth}}/>
    }

  render() {
    return (
        <div>
      <div className="preloader pl-xxl pls-primary">
        <svg className="pl-circular" viewBox="25 25 50 50">
          <circle className="plc-path" cx={50} cy={50} r={20} />
        </svg>
      </div>
      {this.state.auth?this.redirecter():""}
        </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
    registered: auth.registered,
    currentUser: auth.currentUser,
    
  });
  
  export default connect(mapStateToProps, { getuserDetails })(RedirectSpinner);