import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../NewPost/NewPost.css';
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
                        <input name="title" type="text" value={this.state.title} onChange={this.onTextChangeTitle} placeholder="Add description..."/>
                    </div>
                    <div>
                        <textarea name="body" type="text" className="NewPost-body" value={this.state.body} onChange={this.onTextChangeBody} placeholder="Add body..."/>
                    </div>
                    <button onClick={this.postDataHandler}>
                        Post
                    </button>
                    <button onClick={this.props.close}>
                        Close
                    </button>

                </div>
            </ModalBody>
        </Modal>
            
        );
    }
}