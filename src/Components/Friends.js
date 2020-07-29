import React, { Component } from 'react';
import img1 from '../Images/Emoji/Cool.png'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';




export default class Friends extends Component {

    render() {
        return (
            <div className="Friends" >
                <ListGroup>
                    <ListGroupItem active >Venner der også har stemt</ListGroupItem>

                    <ListGroupItem className="justify-content-between">Frederik Kold Kundsen   <Badge pill>14</Badge> <img src={"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10218934157418490&height=50&width=50&ext=1586611803&hash=AeSKwhirmR6hPxaV"} style={{width:'25px', float:'right'}}></img></ListGroupItem>
                    <ListGroupItem className="justify-content-between">Frederik Kold Kundsen   <Badge pill>14</Badge> <img src={"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10218934157418490&height=50&width=50&ext=1586611803&hash=AeSKwhirmR6hPxaV"} style={{width:'25px', float:'right'}}></img></ListGroupItem>
                    <ListGroupItem className="justify-content-between">Frederik Kold Kundsen   <Badge pill>14</Badge> <img src={"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10218934157418490&height=50&width=50&ext=1586611803&hash=AeSKwhirmR6hPxaV"} style={{width:'25px', float:'right'}}></img></ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}