import React from 'react';
import './tweet.css';

export const Tweet = (props) => {
    return (
    <div className="tweet-panel">
        <span className='format-date'>{props.formatDate()}</span>
        <a href={'/listing/' + props.id}>{props.posting}</a>
    </div>
    )
}