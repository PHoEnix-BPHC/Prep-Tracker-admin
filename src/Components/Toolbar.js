import React from "react"
import { Navbar, NavItem, Nav, Collapse, NavbarBrand, NavbarToggler, NavLink } from "reactstrap"
import Logo from "../Assets/Logo.png"

class Toolbar extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }
    render() {
        return (
            <div>
                <Navbar color="danger" expand="md" dark>
                    <NavbarBrand href="/">
                        <img src={Logo} style={{ width: "40px" }} alt="logo" />
                        PREPTRACKER
                    </NavbarBrand>
                    <NavbarToggler onClick={() => { this.setState({ visible: !this.state.visible }) }} />
                    <Collapse isOpen={this.state.visible} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/users">
                                    Users
                                </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="/topics">
                                    Topics
                                </NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink href="/usage">
                                    Usage
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/job">
                                    Jobs
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavLink to="/signup" onClick={() => { window.location.reload(); localStorage.removeItem("IDNumber") }} style={{ color: "whitesmoke", cursor: "pointer", margin: "0px" }}>
                            <i className="fa fa-power-off" style={{ marginRight: "5px" }}></i>
                            LOGOUT
                        </NavLink>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}

export default Toolbar