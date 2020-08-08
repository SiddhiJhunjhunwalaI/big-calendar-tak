import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios'

export default class CheckProfile extends React.Component {
  state={
  
  }
  async componentDidMount() {
    await axios.get('/api/users/profile/check').then((res)=>this.setState({email:true})).catch((err)=>this.setState({email:false}))
  }
 
  render() {
    if(this.state.email===false||this.state.email===undefined)
    {console.log("im here no redirect")
    return (
     ''
    );}
    else 
    { console.log('redirect not happening why')
      return <Redirect to='/dashboard'></Redirect>
    }
  }
}