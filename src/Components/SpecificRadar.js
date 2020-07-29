import React, { Component } from 'react';
import Chart from "react-apexcharts";
import '../Style/index.scss';
import * as firebase from 'firebase';
import * as R from 'ramda';
import EmotionResult from '../Views/EmotionResult';

const emoji = require("emoji-dictionary");
var emoji0 = emoji.getUnicode("sunglasses");
var emoji1 = emoji.getUnicode("cry");
var emoji2 = emoji.getUnicode("nauseated_face");
var emoji3 = emoji.getUnicode("heart_eyes");
var emoji4 = emoji.getUnicode("money_mouth_face");
var emoji5 = emoji.getUnicode("no_mouth");
var emoji6 = emoji.getUnicode("slightly_smiling_face");
var emoji7 = emoji.getUnicode("astonished");
var emoji8 = emoji.getUnicode("thinking");
var emoji9 = emoji.getUnicode("frowning");
var emoji10 = emoji.getUnicode("zany");
var emoji12 = emoji.getUnicode("angry");

let temparr = [];
const countFreq = R.compose(
  R.map(R.length),
  R.groupBy(R.identity)
  )


class SpecificRadar extends Component {
  

  constructor(props) {
    super(props);
    this.rootRef = firebase.database().ref().child('Users');

    this.state = {

      something: 'hej',
      location: this.props.location,
      

      emotions: {  
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
      },

      series: [{
        name: 'Series 1',
        data: [0, 0, 0, 0, 0, 0]
      }],
      options: {
        chart: {
          width: '100%',
          height: '100%',
          type: 'radar',
        },
        markers: {
          size: 0,
          hover: {
            size: 10
          }
        },
        plotOptions: {
          radar: {
            width: '100%',
            polygons: {
              strokeColor: '#e8e8e8',
              fill: {
                  colors: ['#f8f8f8', '#fff']
              }
            }
          }
        },
        xaxis: {
          categories: [emoji3, emoji0, emoji6, emoji8, emoji9, emoji12],
          labels: {
            show: true,
            hideOverlappingLabels: true,
            showDuplicates: false,
            position: 'bottom',
            offsetY: 3,    
            style: {
              colors: [],
              fontSize: '15px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
          },
          yaxis:{
            show: false,
            labels:{
              show: false,
              hideOverlappingLabels: true,
            showDuplicates: false,
            }
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 10,
            width: '100%',
            offsetX: 10,
            offsetY: 0
          },
          tooltip: {
            enabled: false,
            
          },
          }
        }
      },
    
    
    };
  }

  componentDidMount() {

    console.log("LocationRadar: " + this.props.location)
    let newTempArray = [];
    let newSeries = [];
    const countFreq = R.compose(
      R.map(R.length),
      R.groupBy(R.identity)
      )




let loc = this.state.location;
    this.rootRef.on('value', snap=>{
      snap.forEach(function(childNode){
        childNode.child('tags').forEach(function (tagNode) {
          if(tagNode.child('location').val() === loc) {
            var values = tagNode.val()
            temparr.push(values.value.value)
          }
        })
      });
      for (let index = 0; index < 6; index++) {
        console.log("index: " + index);
        console.log("freq: " + countFreq(temparr)[index]);
        newTempArray.push(countFreq(temparr)[index]);
      }
      newSeries.push({data: newTempArray, name: 'series1'});
      this.setState({
        series: newSeries
      });
    });


    /*
    this.rootRef.child("10157170767336984/tags").on('value', snap=>{
        snap.forEach(function(childNode){   
          var values = childNode.val()
            temparr.push(values.value.value)
          });
          for (let index = 0; index < 6; index++) {
            newTempArray.push(countFreq(temparr)[index]);
          }
          newSeries.push({data: newTempArray, name: 'series1'});
          this.setState({
            series: newSeries
          });
    }); 
   */
  }

 /*  arrayUpdate(){
    let newTempArray = [];
    let newSeries = [];
    const countFreq = R.compose(
      R.map(R.length),
      R.groupBy(R.identity)
      )

      for (let index = 0; index < 11; index++) {
        newTempArray.push(countFreq(temparr)[index]);
      }

      newSeries.push({data: newTempArray, name: 'series1'});

      this.setState({
        series: newSeries
      });

  } */

    render() {
      
        return (
            <div className="EmotionResult" >
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="radar"
                  width="100%"
                />          
                
              </div>
        );
    }
  }
  export default SpecificRadar;