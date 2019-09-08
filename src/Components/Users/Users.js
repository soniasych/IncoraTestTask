import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export class Users extends Component {
    static displayName = Users.name;
    constructor(props) {
        super(props);

        console.log('props', props)
        this.state = {
            users: [],
            isUserSelected: false,
            selectedUser: {},
            selectedUserId: -1
            
        };
    }

    componentDidMount() {
        this.getPostUsers();
    }

    onRowClick(userId, user) {
        if (userId === this.state.selectedUser.id) {
            this.setState({
                isUserSelected: false,
                selectedUser: {},
                selectedUserId: -1
            });
        }
        else {
            this.setState({
                isUserSelected: true,
                selectedUser: user,
                selectedUserId: userId
            });
        }
    }

    render() {
        
        return (
        <div>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Posts</th>
                        {/* <th>Posts</th> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(user => (
                        <tr key={user.id}>
                            {/* onClick={() => { this.onRowClick(user.id, user) }}
                            className={user.id === this.state.selectedUserId ? "selectedRow" : null}> */}
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td><Button variant="primary"><Link to={`/posts/${user.id}`}>Posts</Link></Button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <br />
            
        </div>);
    }

    async getPostUsers() {
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/users/`);
        const data = await response.data;
        this.setState({users: data});
        console.log(data);
        console.log(this.state.users);
    }

}