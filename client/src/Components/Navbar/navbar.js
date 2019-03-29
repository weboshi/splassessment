import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Navbar, MenuItem, NavItem, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LOGIN } from '../../Redux/actions/index'
import { connect } from 'react-redux';
import './navbar.css'

const mapStateToProps = (state) => {
    return { user: state.user};
  };

  const mapDispatchToProps = dispatch => {
    return {
      LOGIN: userInfo => dispatch(LOGIN(userInfo))
    };
  };


class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
        };
        this.logOut = this.logOut.bind(this)
    }

    componentWillMount(){
       if(localStorage.getItem('auth') === null){
            this.setState({
                loggedIn: false
            })
            console.log("Not Authenticated")
        }
        else {

            const userInfo = JSON.parse(localStorage.getItem('auth'))
            this.props.LOGIN(userInfo)
            this.setState({
                loggedIn: true
            })
            console.log("Authenticated")
        }
    }

    logOut() {
        localStorage.removeItem('auth')
        this.props.history.push('/login')
        window.location.reload(true);

    }

    render() {
        if (this.state.loggedIn === false) {
            return (
                <div className="navbar-container">
                <Navbar bg="primary" variant="dark" className="justify-content-around">
                    <Navbar.Brand href="/">
                        <i class="fab fa-twitter"></i>
                        <span> FakeTwitter</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav>
                            <Nav.Link><Link className='navlink' to="">Home</Link></Nav.Link>
                            <Nav.Link><Link className='navlink' to="/register">Register</Link></Nav.Link>
                            <Nav.Link><Link className='navlink' to="/login">Login</Link></Nav.Link>
                        </Nav>
    
                    </Navbar>
                </div>
        )
    }
    else {
        console.log(this.props)
        console.log(this.state)
        const email = this.props.user.email
        const username = this.props.user.username

        return(
            <div className="navbar-container">
            <Navbar bg="primary" variant="dark" expand="lg" className="justify-content-around">
                <Navbar.Brand href="/">
                    <i class="fab fa-twitter"></i>
                    <span> FakeTwitter</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav>
                        <Nav.Link><Link className='navlink' to="/">Home</Link></Nav.Link>
                        <Nav.Link><Link className='navlink' to="/listings">All Posts</Link></Nav.Link>
                        <Nav.Link><Link className='navlink' to="/myfeed">My Feed</Link></Nav.Link>
                        <Nav.Link><Link className='navlink' to="/postlisting">Make Post</Link></Nav.Link>
                        <Nav.Link><Link className='navlink' to="/users">Users</Link></Nav.Link>
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item><Link className='navlink-dd' to="/profile">Profile</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link className='navlink-dd' to="/userlistings">My Posts</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link className='navlink-dd' to="/bookmarks">Following</Link></NavDropdown.Item>
                            <NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar>
            </div>
         )
    }
    }
}

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar));



