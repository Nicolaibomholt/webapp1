import React, {Component, useState} from 'react';
import * as firebase from 'firebase';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Collapse, Button, CardBody, Card, CardText } from 'reactstrap';
import {Link } from 'react-router-dom';

let tempArray = [];

 
const List = (props) => {


    return (
        <ul>
        { props.messages.map( (item,i) => { 

         return (
            <ListGroupItem className="justify-content-between">{item.message}</ListGroupItem>    
         )

        })}
        </ul>
    )
}

const Toggle1 = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem' }}>Nedlægning</Button>
        <Collapse isOpen={isOpen}>
            <ListGroup>
                <List messages = {props.messages}></List>
            </ListGroup>
        </Collapse>
      </div>
    );
}

const Toggle2 = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem' }}>Den gode ide</Button>
        <Collapse isOpen={isOpen}>
            <ListGroup>
                <List messages = {props.messages}></List>
            </ListGroup>
        </Collapse>
      </div>
    );
}
  

let messageArray =[];
export default class OppinionOverview extends Component {

    
    constructor(props) {
        super(props);
        this.rootRef = firebase.database().ref().child('Users');

        this.state = {
            messages: [],
            newMessage: ''
        };
    }

  
    componentWillMount(){
        
        this.rootRef.child("10221938448231237/messages").once('value', snap=>{
            snap.forEach(function(childNode){   
              var values = childNode.val()
                tempArray.push(values);
              });
            
             this.setState({messages: tempArray, newMessage: tempArray[tempArray.lengt-1]});
             try {
                this.retrieveData(); 
             } catch (error) {
                console.log("fejl1");
                console.log(error);
                 
             }
             
        }); 
        
        console.log(this.state.newMessage);
        
    }

    componentDidMount() {
        try {
            this.retrieveData()
          }
          catch (error) {
            console.log("fejl2");
            console.log(error);
          }
        //this.setState({newMessage: this.state.messages[this.state.messages.length -1]})
        //console.log(this.state.newMessage);
        
    }

    //her den fucker lidt
    retrieveData = () => {
        let testval = this.state.messages[this.state.messages.length -1];
        this.setState({newMessage: testval.message})
        //let value = tempArray[tempArray.length - 1];
        console.log(testval);
     }


    render() {  
             
                return (
                    <div className="OppinionOverview">      
                        <div className="Intro">
                             <h2>Kommentar overblik</h2>
                        </div> 
                        <div>
                            <br/>
                            <h5>Din kommentar:</h5>
                            <br/>
                            <Card>
                                <CardText>
                                    {this.state.newMessage}
                                </CardText>    
                            </Card>                          

                        </div>
                        <div>
                            <h5>Temaer</h5>
                            <Toggle1 messages = {this.state.messages}></Toggle1>
                            <Toggle2 messages = {this.state.messages}></Toggle2>
                        </div>
                        <Link to="/foelseskort">
                            <button className="continue">
                                Gå til overblik
                            </button>
                        </Link>
                           
                    </div> )          
    }
}