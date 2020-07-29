import React, { Component } from 'react';
import { CheckboxSVGMap } from "react-svg-map";
import Map from "../Images/index"
import "../Style/map.scss";


class MapOverview extends Component {


  render() {
      return (
          <div className="MapOverview" >
              <div className="Map">
                    <CheckboxSVGMap 
                        map={Map}  
                        onChange={this.handleOnChange} 
                    />
                </div>
          </div>
      );
  }
}
export default MapOverview;
