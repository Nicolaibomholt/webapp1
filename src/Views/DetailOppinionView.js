import React, {Component} from 'react';
import DetailedOppinion from '../Components/detailedOppinion';
import { useHistory, Link} from 'react-router-dom';

export default class DetailedOppinionView extends Component {

    constructor(){
        super();
        this.state = {
            wantDetailed: false
        }
    
    }

    buttonHandler = (state) => {
        this.setState({
              wantDetailed: state
          });
    }

    render() {

            return (
            <div className="Describe">
                <DetailedOppinion/> 
            </div>
            );
        }
    }
