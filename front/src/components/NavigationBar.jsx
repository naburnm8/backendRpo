import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faUser} from '@fortawesome/free-solid-svg-icons'
import {useNavigate, Link} from "react-router-dom";
import Utils from "../utils/Utils";
import BackendService from "../services/BackendService";
import {connect} from "react-redux";
import {userActions} from "../utils/Rdx";

class NavigationBarClass extends React.Component {

    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
    }

    goHome() {
        this.props.navigate('Home');
    }

    render() {
        let username = Utils.getUserName();
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><FontAwesomeIcon icon={faHome} />{' '}SD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link onClick={this.goHome}>Home Through goHome</Nav.Link>
                        <Nav.Link onClick={() =>{ this.props.navigate("\home")}}>Home Through Lambda</Nav.Link>
                        <Nav.Link onClick={() => {this.props.navigate("\login")}}>Login Page</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>{this.props.user && this.props.user.user.login}</Navbar.Text>
                { this.props.user &&
                    <Nav.Link onClick={this.logout}><FontAwesomeIcon icon={faUser} fixedWidth />{' '}Logout</Nav.Link>
                }
                { !this.props.user &&
                    <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faUser} fixedWidth />{' '}Login</Nav.Link>
                }
            </Navbar>
        );
    }
    logout() {
        BackendService.logout()
            .then(() => {
                Utils.removeUser();
                this.props.dispatch(userActions.logout())
                this.props.navigate('Login');
            })
    }
}

const NavigationBar = props => {
    const navigate = useNavigate()

    return <NavigationBarClass navigate={navigate} {...props} />
}

const mapStateToProps = state => {
    const { user } = state.authentication;
    return { user };
}

export default  connect(mapStateToProps)(NavigationBar);