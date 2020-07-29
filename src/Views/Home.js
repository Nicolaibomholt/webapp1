import React, { Component } from 'react';
import Facebook from '../Components/Facebook';
import  { Redirect,  } from 'react-router-dom'

class Home extends Component {

    constructor(){
        super();
        this.state={
            auth: false
        }
    }
    
    faceBookDataMethod = (value, value2, value3, value4) => {
        console.log("called" + value + " " +value2);
        this.setState({
            userID: value,
            userName: value2,
            auth: value3,
            pic: value4
        })           
    }

  render() {

    if (this.state.auth === true) {
        return <Redirect to={{ pathname: "/stem", state: { userName: this.state.userName} }}/>
      }

      return (
          <div className="Home" >
            <Facebook faceBookDataMethod = {this.faceBookDataMethod}></Facebook>
          </div>
      );
  }
}
export default Home;
