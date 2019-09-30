import React, { Component } from 'react'
import { Card, Button, DropdownItem, DropdownButton, Dropdown } from 'react-bootstrap'
import './dist/styles/Panels.css'

class Login extends Component {
    render() {
        return (
            <div className="bg">
                <form onSubmit={this.SubmitHandler} method="POST">
                    <center>
                        <Card style={{ width: '20rem' }} className="PanelCard">
                            <Card.Body>
                                <Card.Title>Team Login</Card.Title>
                                <Dropdown>
                                    <DropdownButton title="Select Role">
                                        <DropdownItem>Super-Admin</DropdownItem>
                                        <DropdownItem>Admin</DropdownItem>
                                        <DropdownItem>Executive</DropdownItem>
                                    </DropdownButton>
                                </Dropdown>

                                {/* <CustomMessage message={this.props.location.state === undefined ? "" : this.props.location.state.message} /> */}
                                <Card.Text>
                                    <input type="email" className="form-control Panelinput" id="email" name="txtemail" placeholder="email@example.com" onChange={this.EmailHandler} />
                                    <input type="password" className="form-control Panelinput" id="pass" name="txtpassword" placeholder="Password" onChange={this.PasswordHandler} />
                                </Card.Text>
                                <Button variant="primary" className="Panelbutton" type="submit">Login</Button>
                                <a href="#" className="TeamForgotPassword">Forgot Password?</a>
                                {/* <Button variant="outline-secondary" type="button" className="NextPanel Panelbutton" onClick={() => { this.props.history.push('/') }}>Sign In</Button> */}
                            </Card.Body>
                        </Card>
                    </center>
                </form>
            </div >
        )
    }
}

export default Login