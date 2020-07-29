import React, { Component, useState } from 'react';
import Gauge from '../Components/Gauge';
import Toggle from '../Components/Toggle';
import Friends from '../Components/Friends';
import {Link, BrowserRouter, useLocation, withRouter} from 'react-router-dom';


class EmotionResult extends Component {
    
    constructor(props){
        super(props);
        this.state = {
           something: '',
            location: this.props.location.state.location
        };
      }



    render() {
        //console.log(this.state.location);
      return (
          <div className="EmotionResult" >
              <div className="Intro">
                    <h2>Overblik over {this.state.location}</h2>
                </div>  
                <Gauge location={this.state.location}></Gauge>
                <Toggle location={this.state.location}></Toggle>
                <Friends></Friends>
                <Link to="/indsend">
                    <button className="continue">
                            Uddyb dine følelser
                    </button>
                </Link>
                <Link to="/foelseskort">
                    <button className="continue1">
                            Se kort
                    </button>
                </Link>
          </div>
      );
  }

  
}
export default withRouter(EmotionResult);
