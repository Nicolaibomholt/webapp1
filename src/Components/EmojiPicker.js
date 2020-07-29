import React, { Component } from 'react';
import ImagePicker from 'react-image-picker';
import * as firebase from 'firebase';

import 'react-image-picker/dist/index.css'
import img1 from '../Images/Emoji/Cool.png'
import img2 from '../Images/Emoji/Crying.png'
import img3 from '../Images/Emoji/Ill.png'
import img4 from '../Images/Emoji/Love.png'
import img5 from '../Images/Emoji/Money.png'
import img6 from '../Images/Emoji/NoSmile.png'
import img7 from '../Images/Emoji/SmallSmile.png'
import img8 from '../Images/Emoji/Surprised.png'
import img9 from '../Images/Emoji/Thinking.png'
import img10 from '../Images/Emoji/VerySad.png'
import img11 from '../Images/Emoji/Crazy.png'
import img12 from '../Images/Emoji/Angry.png'
import { Container , Row, Col} from 'reactstrap';



const testImgList = [img4, img1, img7, img9, img10, img12]

export default class EmojiPicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: null,
            images1: [],
        imagesValue: []


        }
    }

    onPick(image) {
        this.setState({image})
    }

    onPickImages1(images1) {
        let tempArray = [];
        this.setState({images1})

        console.log(images1);

        this.setState({imagesValue:tempArray});this.props.emojiPickerDataMethod(images1);//console.log(tempArray);


        
      }


    render() {
          return(
              <div className= "ImagePicker">
                    <Container className="themed-container">
                        <Row>
                            <Col>
                                <ImagePicker
                                images={testImgList.map((image, i) => ({src: image, value: i}))}
                                onPick={this.onPickImages1.bind(this)}

                                />
                            </Col>
                        </Row>

                    </Container>



              </div>
          )
    }
}