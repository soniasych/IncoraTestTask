import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Route, BrowserRouter } from 'react-router-dom';
import { NewPost } from '../NewPost/NewPost';

import '../PostDetails/PostDetails.css';


export class Posts extends Component {
    static displayName = Posts.name;
    constructor(props) {
        super(props);

        console.log('props', props)
        this.state = {
            posts: [],
            openingNewPostModalVisible: false
            
        };
        this.OpeningNewPostModalHandler = this.OpeningNewPostModalHandler.bind(NewPost);
    }

    componentDidMount() {
        this.getPosts();
    } 
    
    OpeningNewPostModalHandler = event => {
        if (this.state.openingNewPostModalVisible === false) {
            this.setState({ openingNewPostModalVisible: true });
        }
        else {
            this.setState({ openingNewPostModalVisible: false });
        }
    }
    

    render() {
        
        return (
        <div>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Post titles</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td><Button variant="primary"><Link to={`/posts/userId/${post.id}`}>Details</Link></Button></td>
                            {/* <td><Link to={`/posts/userId/${post.id}`}>{post.title}</Link></td> */}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <br />
            <div className="posts-button-add-new">
                <Button variant="primary" onClick={this.OpeningNewPostModalHandler}>Add new</Button>
            </div>
            <NewPost visible={this.state.openingNewPostModalVisible}
                    close={this.OpeningNewPostModalHandler}
                    userId={this.props.match.params.userId}
            />
            <BrowserRouter>
            <Route exact path='/posts/:userId/new-post' component={NewPost} />
            </BrowserRouter>
        </div>);
    }

    async getPosts() {
        const id = this.props.match.params.userId;
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const data = await response.data;
        this.setState({posts: data});
        console.log(data);
        console.log(this.state.posts);
    }

}