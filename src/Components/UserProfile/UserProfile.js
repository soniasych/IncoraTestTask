import React, { Component } from 'react';
import UserInfo from '../Posts/Posts';
import Axios from 'axios';

export class UserProfile extends Component {
    static displayName = UserProfile.name;
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            post: {}
        }
    }

    componentDidMount() {
        this.getPostUsers();
    }

    async getPostUsers() {
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/users/`);
        const data = await response.data;
        this.setState({users: data});
        console.log(data);
        console.log(this.state.users);
    }

        render() {
            return (
                
                        <UserInfo
                            user={this.state.users}
                            name={this.state.users.name}
                            username={this.state.users.username}
                            email={this.state.users.email}
                            address={this.state.users.address}
                            street={this.state.users.address.street}
                        /> 
            );
        }

}
