import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../NewPost/NewPost.css';
import { Button } from 'react-bootstrap';
import {
    Modal
    , ModalBody
    , ModalFooter
  } from 'reactstrap';


export class NewPost extends Component{
    static displayName = NewPost.name;
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: ""        
        };

        this.onTextChangeTitle = this.onTextChangeTitle.bind(this);
        this.onTextChangeBody = this.onTextChangeBody.bind(this);
        this.postDataHandler = this.postDataHandler.bind(this);
    }

    onTextChangeTitle = event => {
        this.setState({title: event.target.value});
    }

    onTextChangeBody = event => {
        this.setState({body: event.target.value});
    }

    postDataHandler = () => {
        const data = {
            userId: this.props.userId,
            title: this.state.title,
            body: this.state.body
        };
        Axios.post('https://jsonplaceholder.typicode.com/posts/', data);
        console.log(data);        
    }


    render() {
        return(
        <Modal isOpen={this.props.visible}
            className="my-modal">
            <ModalBody>
                <div className="NewPost">
                    <div>
                        <label>Title</label>
                        <input name="title" type="text" value={this.state.title} onChange={this.onTextChangeTitle} placeholder="Add title..."/>
                    </div>
                    <div>
                    <   label>Body</label>
                        <textarea name="body" type="text" value={this.state.body} onChange={this.onTextChangeBody} placeholder="Add body..."/>
                    </div>
                    <div className="new-post-buttons">
                    <Button variant="primary" onClick={this.postDataHandler}>
                        Post
                    </Button>
                    <Button variant="primary" onClick={this.props.close}>
                        Close
                    </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
            
        );
    }
}