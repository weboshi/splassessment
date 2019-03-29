import React, { Component } from 'react';
import { Users } from '../../Components/Users/users'

export class UsersPage extends Component {
    render(){
        return(
            <div className="bookmarks-container">
                <Users/>
            </div>
        )
    }
}