import React, {PureComponent} from 'react';
import {Marker} from 'react-map-gl';
import Gauge from "./Gauge";
import * as firebase from "firebase";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

let percent = 0;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {
    constructor(props) {
        super(props);
        this.rootRef = firebase.database().ref().child('Users');
        this.state = {
            percentage: 0,
            color: '#ffffff',
            location: this.props.city
        }
    }

    componentDidMount() {
        let colorArray = [];
        const {data} = this.props;
        for ( const city of data) {
            //console.log(city.city);
            this.rootRef.on('value', snap => {
                let count = 0;
                let sum = 0;
                snap.forEach(function (childNode) {
                    childNode.child('tags').forEach(function (tagNode) {
                        if(tagNode.child('location').val() === city.city) {
                            sum += tagNode.child('value').child('value').val();
                            //console.log("value: " + sum);
                            count += 1;
                        }
                    })
                })
                //console.log("Sum: " + sum);
                //console.log("Count: " + count);
                console.log("average: " + (100 - ((sum / count) / 5 * 100)) + "%");
                percent = (1 - (sum / count) / 5);
                colorArray[city.city] = (this.getColorForPercentage(percent))


            })
        }
        console.log(colorArray);
        this.setState({
            percentage: percent,
            color: colorArray
        });

    }

    getColorForPercentage(percentage) {
        let red = 240;
        let green = 220;
        if (percentage >= 0 && percentage <= 0.5) {
            green = 460 * percentage;
        } else if (percentage > 0.5 && percentage <= 1) {
            red = -460 * percentage + 460;
        }

        return 'rgb(' + [red, green, 50].join(',') + ')';
    }

    render() {
        console.log(this.state.color.Domkirken);
        const {data, onClick} = this.props;
        //console.log("PinCity: " + data);

        return data.map((city, index) => (
            <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
                <svg
                    height={SIZE}
                    viewBox="0 0 24 24"
                    style={{
                        cursor: 'pointer',
                        fill: this.state.color[city.city],
                        stroke: '#000000',
                        strokeWidth: '2px',
                        transform: `translate(${-SIZE / 1.2}px,${-SIZE}px)`
                    }}
                    onClick={() => onClick(city)}
                >
                    <path d={ICON} />
                </svg>
            </Marker>
        ));
    }
}
