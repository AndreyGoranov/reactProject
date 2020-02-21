import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import pic from 'C:/Users/admin070318/learningreact/src/pictures/1_zWKfD5AwlRW7FRzTbDPQig.jpeg'
import buttonStyle from 'C:/Users/admin070318/learningreact/src/styles/button.module.css'

export default function WelcomePage() {
    const someLogo = 'SOME LOGO HERE'
    const header = "Your\n  Daily\n   Goal\n    Manager";

    function getStarted() {
        window.location.replace('/Login')
    }

    const randomQuotes = () => {
        let quotes = ['Discipline: the one thing necessary to achieve any goal worth having','If you want something you never had, You have to do something you’ve never done','Be in the now','Be stubborn about your goals but flexible about your methods','Life takes on meaning when you become motivated, set goals and charge after them in an unstoppable manner'];
        let quote = quotes[Math.floor(Math.random()*quotes.length)];
        return quote;
    }
    return (
        <Container fluid style={{backgroundImage: `url(${pic})`, minHeight: '100vh', borde: '1px solid black'}}>
            
            <Row className='flex-column'>
                <Col>
                    <h1 style={{whiteSpace: 'pre'}}>{header}</h1>
                </Col>
                <Col className="text-center">
                    {someLogo}
                </Col>
            </Row>
                <Row className="flex-column text-center mt-5">
                    <Col><p>Your goals are the stairs you need to climb on the way to your Dreams</p></Col>
                    <Col><h3>Follow your dreams</h3></Col>
                    <Col><p>{randomQuotes()}</p></Col>
                    <Col><button className={buttonStyle.getStarted} onClick={getStarted}>Get started</button></Col>
                </Row>
            
        </Container>
    )
}
