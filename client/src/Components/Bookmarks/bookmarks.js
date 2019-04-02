import React, { Component } from 'react'
import axios from 'axios';
import { UPDATEPROFILE } from '../../Redux/actions/index';
import { Card, CardGroup, ListGroup, ListGroupItem, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import './bookmarks.css';

const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo))
    };
  };

  const mapStateToProps = (state) => {
    return { user: state.user};
  };


class BookmarksComponent extends Component { 
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
        axios({
            method: 'get',
            url: `api/user/profile/${this.props.user.username}`,
        }).then(res => {
                console.log(res.data.following)
                this.setState({
                    following: res.data.following
                })
            }).catch(err => console.log(err))
    }

    addBookmark(userId) {
        let username = this.props.user.username
        axios({
            data: {
                bookmark: userId,
            },
            method: 'put',
            url: `/api/user/addbookmark/${username}`,
        }).then(res => {
            if(res.code == 200){
                console.log("Followed")
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
        const myListings = this.state.following.split(",")
        return (
            myListings.map((user, i) => 
            <div className="jobs-panel" key={i}>
                      {user}
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
                        <h3 className='jobs-header'>Following</h3>
                        <span>Users you are following.</span>
                    </div>
                        {this.state.following && this.state.panel == true && this.mapJobsAsPanels()}
                    <div className="loading">
                        {!this.state.following && <div className="loading-icon"><i className="fas fa-spinner fa-spin"></i></div>}
                    </div>
                </div>
            </div>
        )
    }
}

export const Bookmarks =  connect(mapStateToProps, mapDispatchToProps)(BookmarksComponent)