import React from 'react'
import {useSelector} from 'react-redux'
import {NavLink, Link, useRouteMatch } from "react-router-dom"
import {Navbar, Nav, Container, Form} from 'react-bootstrap'
import SearchInput from '../component/SearchInput'
import './Header.css'

export default function Header() {
    const hideHeder = useRouteMatch("/signIn")
    const email = useSelector(state => state.user.email)
    if (hideHeder) return null
    const menus = [
        {path: '/', label: 'Home', category:'home'},
        {path: '/section/world', label: 'World', category:'world'},
        {path: '/section/science', label: 'Science', category:'science'},
    ]
    
    const routs = menus.map(menu => <NavLink 
        key={menu.path}
        exact={true}
        className='nav-link'
        to={menu.path}>
            {menu.label}
        </NavLink>
    )
    return (
        <Container>
            <Navbar bg="light" expand="md" className="bg-light">
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        {routs}
                    </Nav>
                    <Form inline>
                        <SearchInput className='mr-2'/>
                    </Form>
                </Navbar.Collapse>

                {!email && 
                    <Link to='/signIn' className="ml-md-2">Login</Link>
                }
                {email && <span className="user-text ml-1">{email}</span>}
            </Navbar>
        </Container>
    )
}


