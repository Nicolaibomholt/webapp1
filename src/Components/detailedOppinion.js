import React, {Component} from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {
	withRouter
} from 'react-router-dom';


class detailedOppinion extends Component {
    constructor(props) {
        super(props);
        this.rootRef = firebase.database().ref().child('Users');

        this.state = {
            inputVal: ''
        };
    }

    updateInputValue(evt) {
        this.setState({
            inputVal: evt.target.value
        });
        
    }

    click() {
        console.log(this.state.inputVal); 
    }
    

    postFirebase = (e) => {
        e.preventDefault();


        var pushRef = this.rootRef.child('10221938448231237/messages').push();
    
        //this.rootRef.child(userId).child('userName').set(userName);
       
        pushRef.set({
            message: this.state.inputVal 
    });

    this.props.history.push('/beskeder');


    }


    

    render() {
       

        return (
            <div className="DetailedOppinion">
                <h2>Uddyb dine føleser</h2>
                <form onSubmit = {this.postFirebase.bind(this)}>
                <textarea type="text" value={this.state.inputVal} onChange = {evt => this.updateInputValue(evt)}></textarea>
                    <div className="content">
                        
                        <button>Send</button>
                                                         
                    </div>
                </form>
                
            </div>
        );
    }
}
export default withRouter(detailedOppinion)