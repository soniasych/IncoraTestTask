import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Users } from './Components/Users/Users';
import { Posts } from './Components/Posts/Posts';
import { Post } from './Components/PostDetails/PostDetails';
import { NewPost } from './Components/NewPost/NewPost';

export default class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Users} />
        <Route exact path='/posts/:userId' component={Posts} />
        <Route exact path='/posts/:userId/:id' component={Post} />
        
      </BrowserRouter>
    );
  }
}
