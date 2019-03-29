import React, { Component } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import { UPDATEPROFILE } from '../../Redux/actions/index';
import { Card, CardGroup, ListGroup, ListGroupItem, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import './viewlisting.css';
import { withRouter } from 'react-router';
import { DateTime } from "luxon";


const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo)),
    };
  };

  const mapStateToProps = (state, ownProps) => {
    return { user: state.user, id: ownProps.filter };
  };


class ViewListingComponent extends Component { 
    constructor(props){
        super(props);
        this.state = {

        }
        this.handleChange = this.handleChange.bind(this)
        this.makeListing = this.makeListing.bind(this)

    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios({
            method: 'get',
            url: `/api/job/listing/${id}`,})
        .then(res => {
            let dt = (DateTime.fromISO(res.data.createdAt));
            let local = DateTime.local();
            let posted = local.diff(dt, ['months', 'days', 'hours', 'minutes']).toObject()

            let months = Math.round(posted.months)
            let days = Math.round(posted.days)
            let hours = Math.round(posted.hours)
            let minutes = Math.round(posted.minutes)

            if (posted.months) {
                res.data.posted = `${months} months and ${days} days`
            }
            else if (!posted.months && posted.days && posted.hours && posted.minutes) {
                res.data.posted = `${days} days`
            }
            else if (!posted.months && !posted.days) {
                res.data.posted = `${hours} hours and ${minutes} minutes`
            }
            else if (!posted.months && !posted.days && !posted.hours) {
                res.data.posted = `${minutes} minutes`
            }

            this.setState({
                listing: res.data
            })
        })
        .catch(err => console.log(err)
        )
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
    
        this.setState({
        [name]: value
        }, () => { console.log(this.state)});
    }

    makeListing() {
        let listing = this.state.listing
        return(
            <div className="viewlisting-panel">
                <span className="listing-label"><h3>{listing.title}</h3></span>
                <div className="viewlisting-information">
                    <div>Author: {listing.username}</div>
                    <div>Posted: {listing.posted} ago</div>
                </div>
                <div className="viewlisting-panel-body">
                    {listing.posting}
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className='viewlisting-container'>
                <div className='viewlisting-component'>
                    {!this.state.listing && 'Loading..'}
                    {this.state.listing && this.makeListing()}
                </div>
            </div>
        )
    }
}

export const ViewListing =  withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewListingComponent))

