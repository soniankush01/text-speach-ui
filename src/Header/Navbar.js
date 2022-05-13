import React, { useState, Fragment } from 'react'
import { FaBars } from 'react-icons/fa';
import {
    Nav,
    NavContainer,
    NavLogo,
    NavItem,
    NavLinks,
    NavMenu,
    MobileIcon,
} from './NavbarStyles';
import '../App.css';
import  logo from '../logo.png'
const Navbar = () => {

    return (
        <Fragment>
            <Nav className="navbar">
                <NavContainer>
                    <NavLogo href="/"><img src={logo} width="100" height="80" /></NavLogo>
                    <MobileIcon>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks href="/editProfile"><div className="top-menu">Manage Account</div></NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks href="/addDetails"><div className="top-menu">Add Voice Print</div></NavLinks>
                        </NavItem>
                        <NavItem>
                            <button onClick={logout} className="logout-button">Logout</button>
                        </NavItem>
                    </NavMenu>
                </NavContainer>
            </Nav>
        </Fragment>
    )
}

function logout(){
    document.cookie = 'isAuth' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location = "/";
}

export default Navbar;
