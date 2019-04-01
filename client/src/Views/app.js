import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import { RegistrationPage } from './Registration/registration-view';
import { LoginPage } from './Login/Login-view';
import { Navigation } from '../Components/Navbar/navbar';
import { ProfilePage } from './Profile/profile-view';
import { Footer } from '../Components/Footer/footer'
import { PostListingPage } from './PostListing/postlisting-view';
import { PostsPage } from './Posts/posts-view.js';
import { ViewListingPage } from './ViewListing/viewlisting-view';
import { BookmarksPage } from './Bookmarks/bookmarks-view';
import { UserListingsPage } from './UserListings/userlistings-view';
import { UsersPage } from './Users/Users-view';
import { MyFeedPage } from './Feed/feed-view';
import './app.scss'

export default props =>

<BrowserRouter>
  <div className="app">
    <Navigation/>
      <div className="app-main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegistrationPage}/>
          <Route exact path='/profile' component={ProfilePage}/>
          <Route path='/postlisting' component ={PostListingPage}/>
          <Route path="/listings" component={PostsPage}/>
          <Route path="/listing/:id"  component={ViewListingPage}/>
          <Route path="/bookmarks" component={BookmarksPage}/>
          <Route path="/userlistings" component={UserListingsPage}/>
          <Route path="/users" component={UsersPage}/>
          <Route path="/myfeed" component={MyFeedPage}/>
          <Route render={function () {
            return 
              <div className='PageNotFound'><h2>404 Page Not Found</h2></div>
          }} />
        </Switch>
      </div>
    <Footer/>
  </div>
</BrowserRouter>
