import React, { Component } from 'react'
import { Card, Button, Dropdown, DropdownButton, DropdownItem, Alert } from 'react-bootstrap';
import './dist/styles/Panels.css'
import axios from 'axios'
// import CustomMessage from './messages'
class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            DropDownTitle: 'Select Role',
            Error: false,
            ErrorMessage: ""
        }
    }

    SubmitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:2020/user/login", {
            email: this.state.email,
            pass: this.state.pass,
            role: this.state.DropDownTitle
        })
            .then(result => {
                if (result.data.message === "User Found!") {
                    this.props.history.push({
                        pathname:'/home',
                        state:{
                            details:result.data
                        }
                    })
                }
            });
    }
    // input handlers
    EmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    PasswordHandler = (event) => {
        this.setState({ pass: event.target.value });
    }

    render() {
        return (
            <div className="bg">
                <form onSubmit={this.SubmitHandler} method="POST">
                    <center>
                        <Card style={{ width: '20rem' }} className="PanelCard">
                            <Card.Body>
                                <Card.Title>Team Login</Card.Title>
                                <Dropdown>
                                    <DropdownButton title={this.state.DropDownTitle}>
                                        <DropdownItem onSelect={() => this.setState({ DropDownTitle: "Super-Admin" })}>Super-Admin</DropdownItem>
                                        <DropdownItem onSelect={() => this.setState({ DropDownTitle: "Admin" })}>Admin</DropdownItem>
                                        <DropdownItem onSelect={() => this.setState({ DropDownTitle: "Executive" })}>Executive</DropdownItem>
                                        <DropdownItem onSelect={() => this.setState({ DropDownTitle: "Developer" })}>Developer</DropdownItem>
                                    </DropdownButton>
                                </Dropdown>
                                {
                                    this.state.Error ?
                                        <Alert variant="danger">
                                            This is a alert—check it out!
                                        </Alert>
                                        :
                                        null
                                }
                                <Card.Text>
                                    <input type="email" className="form-control Panelinput" id="email" name="txtemail" placeholder="email@example.com" onChange={this.EmailHandler} />
                                    <input type="password" className="form-control Panelinput" id="pass" name="txtpassword" placeholder="Password" onChange={this.PasswordHandler} />
                                </Card.Text>
                                <Button variant="primary" className="Panelbutton" type="submit">Log In</Button>
                            </Card.Body>
                        </Card>
                    </center>
                </form>
            </div >
        )
    }
}



export default LoginPanel

