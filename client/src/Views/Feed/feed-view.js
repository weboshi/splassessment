import React, { Component } from 'react';
import './feed-view.css';
import { WelcomeMessage } from '../../Components/WelcomeMessage/welcomemessage'
import { MyFeed } from '../../Components/MyFeed/myfeed'



export class MyFeedPage extends Component {
    render(){
        return(
            <div className="myfeed-container">
            <MyFeed/>
            </div>
        )
    }
}
