import React, { Component } from 'react';
import { ViewListing } from '../../Components/ViewListing/viewlisting'

export class ViewListingPage extends Component {
    render(){
        return(
            <div className="viewlisting-container">
                <ViewListing/>
            </div>
        )
    }
}