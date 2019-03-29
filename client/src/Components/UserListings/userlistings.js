import React, { Component } from 'react'
import axios from 'axios';
import { UPDATEPROFILE } from '../../Redux/actions/index';
import { Card, CardGroup, ListGroup, ListGroupItem, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import './userlistings.css';

const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo))
    };
  };

  const mapStateToProps = (state) => {
    return { user: state.user};
  };


class UserListingsComponent extends Component { 
    constructor(props){
        super(props);
        this.state = {
            panel: 1,
            card: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.mapJobsAsPanels = this.mapJobsAsPanels.bind(this)
        this.switchToCard = this.switchToCard.bind(this)
        this.switchToPanel = this.switchToPanel.bind(this)
        this.formatDate = this.formatDate.bind(this)

    }

    componentDidMount() {
            const username = this.props.user.username
            console.log(username)
            axios.get(`/api/job/myPosts/${username}`
            ).then(res => {
                console.log(res.data)
                this.setState({
                    userListings: res.data
                })
            }
                ).catch(
                    err => console.log(err)
                )
    }


    addBookmark(jobId) {
        console.log(this.props.user.username)
        axios({
            method: 'put',
            url: `/api/user/addbookmark/${jobId}`,
        }).then(res => {
            if(res.code == 200){
                console.log("Bookmarked")
            }
        }).catch(
            err => console.log(err)
        )
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
    
        this.setState({
        [name]: value
        }, () => { console.log(this.state)});
    }

    formatDate(date) {
        var formattedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT)
        return formattedDate
    }

    mapJobsAsPanels() {
        const myListings = this.state.userListings
        return (
            myListings.map((bookmark, i) => 
            <div className="jobs-panel" key={i}>
                <span className='format-date'>{this.formatDate(bookmark.createdAt)}</span>
                <a href={'/listing/' + bookmark.id}>{bookmark.title}</a>
            </div>
            )
        )
    }


    switchToCard() {
        this.setState({
            panel: 0,
            card: 1
        }, () => console.log(this.state))
    }

    switchToPanel() {
        this.setState({
            panel: 1,
            card: 0
        }, () => console.log(this.state))
    }

    render(){
        return(
            <div className='jobs-container'>
                <div className='jobs-component'>
                    <div className='jobs-label'>
                        <h3 className='jobs-header'>My Listings</h3>
                    </div>
                        {this.state.userListings && this.state.panel == true && this.mapJobsAsPanels()}
                        {!this.state.userListings && <div>Loading Jobs</div>}

                </div>
            </div>
        )
    }
}

export const UserListings =  connect(mapStateToProps, mapDispatchToProps)(UserListingsComponent)