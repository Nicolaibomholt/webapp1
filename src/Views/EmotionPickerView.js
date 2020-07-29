import React, { Component } from 'react';
import EmojiPicker from '../Components/EmojiPicker';
import Facebook from '../Components/Facebook';
import Smiley from '../Images/undraw_smiley_face_lmgm.png'
import * as firebase from 'firebase';
import {
    BrowserRouter as Router,
    useHistory,
    useLocation,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Gauge from '../Components/Gauge';

let location = '';

class EmotionPickerView extends Component {

    constructor(props) {
    super(props);
    this.rootRef = firebase.database().ref().child('Users');
    this.state = {
        userName: '',
        userID: '',
        pickedValues: [],
        img: '',
        location: this.getUrlParameter('location')
    }

}

componentDidMount() {
    console.log(this.state.location);
}

    getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };


    routeChange=()=> {
    let path = `/resultat`;
    let history = useHistory();
    history.push(path);
  }

faceBookDataMethod = (value, value2, value3, value4) => {
    console.log("called" + value + " " +value2);
    this.setState({
        userID: value,
        userName: value2,
        auth: value3,
        img: value4
    })   
}

emojiPickerDataMethod = (value) => {
    console.log("picker val" + value);
    this.setState({
        pickedValues: value
    })
}

postFirebase = (userId, userName, value) => {
    var pushRef = this.rootRef.child(userId).child('tags').push();

    //this.rootRef.child(userId).child('userName').set(userName);
   
    pushRef.set({
        value: value,
        location: this.state.location,
        date: new Date().toDateString()
});

}
  render() {
        if (this.state.auth) {
            return (
            <div>
                <div className="Intro">
                    <h2>Angiv dine føelser <br/>{this.state.userName}</h2>
                </div>                
                <EmojiPicker emojiPickerDataMethod =  {this.emojiPickerDataMethod} />
                <div className="content">    
                    <Link to= {{pathname: '/resultat' , state:  {location: this.state.location}}}>
                        <button onClick= { () =>this.postFirebase(this.state.userID, this.state.userName, this.state.pickedValues) }>
                            Angiv dine følelser
                        </button>      
                  </Link>
            
                </div>
            </div>
            );
        } else {
            return (
                <div className="EmotionPickerView" >   
                <br/>
                <h3>Du har tjekket ind ved {this.state.location}</h3>
                <img src={Smiley} style={{width:'100%'}} ></img>
                      <Facebook faceBookDataMethod = {this.faceBookDataMethod}></Facebook>   
                </div>
            );
        }
  }
}
export default EmotionPickerView;