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
                            <NavLinks href="/"><div className="top-menu"><i className="fa fa-home" aria-hidden="true"></i></div></NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks href="/userLogin"><button className="ns-signin">Sign In</button></NavLinks>
                        </NavItem>
                    </NavMenu>
                </NavContainer>
            </Nav>
        </Fragment>
    )
}

export default Navbar;
