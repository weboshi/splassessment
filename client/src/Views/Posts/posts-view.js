import React, { Component } from 'react';
import { Posts } from '../../Components/Posts/posts';
import './posts-view.css';


export class PostsPage extends Component {
    render(){
        return(
            <div className='jobs-container'>
                <div className='jobs-form'>
                    <Posts/>
                </div>
            </div>
        )
    }
}
