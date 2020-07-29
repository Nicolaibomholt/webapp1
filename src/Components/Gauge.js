import GaugeChart from 'react-gauge-chart'
import { IgrLinearGaugeModule } from 'igniteui-react-gauges';
import { IgrLinearGauge, IgrLinearGraphRange } from 'igniteui-react-gauges';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as R from 'ramda';
import { Container , Row, Col} from 'reactstrap';
const emoji = require("emoji-dictionary");
var emoji12 = emoji.getUnicode("angry");
var emoji3 = emoji.getUnicode("heart_eyes");

IgrLinearGaugeModule.register();

let percent = 0;

export default class Gauge extends Component {
    constructor(props) {
        super(props);
        this.rootRef = firebase.database().ref().child('Users');
        this.state = {
            percentage: 0,
            location: this.props.location
        }

    }

    componentDidMount() {
        console.log("location: " + this.state.location)
        let loc = this.state.location;
        this.rootRef.on('value', snap=>{
            let count = 0;
            let sum = 0;
            snap.forEach(function (childNode) {
                childNode.child('tags').forEach(function (tagNode) {
                    if(tagNode.child('location').val() === loc) {
                        sum += tagNode.child('value').child('value').val();
                        //console.log("value: " + sum);
                        count += 1;
                    }
                })
            })
            console.log("Sum: " + sum);
            console.log("Count: " + count);
            console.log("average: " + (100-((sum/count)/5 * 100)) + "%");
            percent = (1-(sum/count)/5);

            this.setState({
                percentage: percent
            });
        })


    }

    render() {

          return(
              <div className= "Gauge">
                    <Container className="themed-container">
                        <Row>
                            <Col>
                            <h5>Den generelle stemning</h5>
                            <GaugeChart id="gauge-chart3" 
                                nrOfLevels={6} 
                                colors={["#F06543", "#53A548"]} 
                                arcWidth={0.3} 
                                percent={this.state.percentage}
                                hideText={true}
                            ></GaugeChart>
                            <div className="faces">
                                <div className="face1">
                                    {emoji12}
                                </div>
                                <div className="face2">
                                    {emoji3}
                                </div>
                            </div>
                        
                            </Col>
                        </Row>
                        
                    </Container>

                 
                
              </div>
          )
    }

}
