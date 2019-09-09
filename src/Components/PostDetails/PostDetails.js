import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button } from 'react-bootstrap';
import './PostDetails.css';
/* import { Container } from 'reactstrap'; */


export class Post extends Component {
    static displayName = Post.name;
    constructor(props) {
        super(props);

        console.log('props', props)
        this.state = {
            postInfo: {},
            comments: [],
            title: '',
            body: ''   
            
        };
        this.onTextChangeTitle = this.onTextChangeTitle.bind(this);
        this.onTextChangeBody = this.onTextChangeBody.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.DeletePost = this.DeletePost.bind(this);
        this.EditPost = this.EditPost.bind(this);
    }

    onTextChangeTitle = event => {
        console.log( event.target.value);
        this.setState({title: event.target.value});
        
    }

    onTextChangeBody = event => {
        console.log( event.target.value);
        this.setState({body: event.target.value});
    }

    // handleInputChange(e) {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    componentDidMount() {
        this.getPostInfo();
        this.getComments();
    }    

    render() {        
        return (
        <div>
            <Card>
                <Card.Header>Post</Card.Header>
                <Card.Body className="post-details">
                    <Card.Title>
                        <label>Title</label>
                        <input name="title" 
                        type="text" 
                        defaultValue={this.state.postInfo.title}
                        onChange={this.onTextChangeTitle}></input>
                    </Card.Title>
                    <Card.Text>
                        <label>Body</label>
                        <textarea 
                        name="body"
                        value={`${this.state.body}`}
                        onChange={(event) => this.onTextChangeBody(event)}/>
                    </Card.Text>
                        <div className="post-buttons">
                        <Button variant="primary" onClick={this.EditPost}>Edit</Button>
                        <Button variant="primary" onClick={this.DeletePost}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.comments.map(comment => (
                        <tr key={comment.id}>
                            <td>{comment.name} {comment.email}</td>
                            <td>{comment.body}</td>
                        </tr>
                     ))
                    }
                </tbody>
            </table>
            <br />
            
        </div>);
    }

    async getPostInfo() {
        const id = this.props.match.params.id;
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const postData = await response.data;
        this.setState({postInfo: postData, body: postData.body});
        console.log(this.state.postInfo);
    }

    async getComments() {
        const postId = this.props.match.params.id;
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const data = await response.data;
        this.setState({comments: data});
        console.log(data);
        console.log(this.state.comments);
    }

    async DeletePost(){
        const postId = this.props.match.params.id;
        Axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                    .then(response => {
                        console.log(response);
                    });
    }

    async EditPost(){
        const postId = this.props.match.params.id;
        //const postId = this.props.postId;
         const data = {
            postId: postId,
            title: this.state.postInfo.title,
            body: this.state.postInfo.body
        };
        Axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, data);
        console.log(data);        
    }

}