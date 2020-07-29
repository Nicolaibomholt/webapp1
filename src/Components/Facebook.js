import React, { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';

export default class LoginFacebook extends Component {
    state = {
        auth: false,
        name: '',
        picture: ''
    }

    componentClicked = () => {
        console.log("Facebook clicked");
        
    }

    responseFacebook = (response) => {
        console.log(response);
        if (response.status !== 'unknown' ) {
            
            this.setState({
                auth: true,
                name: response.name,
                picture: response.picture.data.url,
                userId: response.id
            });
            this.props.faceBookDataMethod(this.state.userId, this.state.name, this.state.auth, this.state.picture);
        }
    }

    render() {
        let facebookData;

        this.state.auth ? 
            facebookData  = (
                <div>
                    <img src = {this.state.picture} alt ={this.state.name}></img>
                </div>
            ) : 
            facebookData = (
                <FacebookLoginBtn
                appId="579272202662113"
                textButton= 'Login med Facebook for at stemme'
                autoLoad={false}
                fields="name,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            );

        return(

            <>
                {facebookData}
            </>
        );
    }
}