import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import pic from 'C:/Users/admin070318/learningreact/src/pictures/new1.jpg';

const Layout = ({children}) => {
    const [shoudExpand, setShoudExpand] = useState(false)
        return ( 
            <>
                <Navbar collapseOnSelect  expand='lg' bg='primary' variant='dark' fixed='top' expanded={shoudExpand}>
                    <Navbar.Brand  href='/'>Logo</Navbar.Brand>
                    <Navbar.Toggle onClick={() => setShoudExpand(!shoudExpand)} aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">  
                        <Nav onClick={()=> setShoudExpand(false)}>
                            <Nav.Link as={Link} to='/goalslist'>Goals list</Nav.Link>
                            <Nav.Link as={Link} to='/creategoals'>Create goals</Nav.Link>
                            <Nav.Link as={Link} to='/history'>History</Nav.Link>
                            <Nav.Link as={Link} to='/progress'>Progress</Nav.Link>
                        </Nav>    
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid style={{backgroundImage: `url(${pic})`, backgroundSize: 'cover', minHeight: '100vh'}}>
                    {children}
                </Container>
            </>
            
        ) 
}   

export default Layout