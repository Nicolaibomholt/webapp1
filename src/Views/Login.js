import React, { Component } from 'react';
import Facebook from '../Components/Facebook';


class Login extends Component {


  render() {
      return (
          <div className="login" >
              <p>Facebook authenticantion</p>
              <Facebook></Facebook>
          </div>
          
      );
  }
}
export default Login;