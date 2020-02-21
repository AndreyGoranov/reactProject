import React, { useState, useContext } from 'react'
import formStyle from 'C:/Users/admin070318/learningreact/src/styles/formStyling.module.css'
import buttonStyle from 'C:/Users/admin070318/learningreact/src/styles/button.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import  MyContext  from '../../../components/AppContext'
import {Container, Row, Col} from 'react-bootstrap'
import pic from 'C:/Users/admin070318/learningreact/src/pictures/1234.jpg'

const avatar = <FontAwesomeIcon icon={faUserCircle} size='3x' />
let userData = [];

export default function RegForm(props) {
    const value = useContext(MyContext);
   const [user, setUser] = useState({
       username: '',
       password: '',
       email: '',
       id: new Date()
   })
   const [error, setError] = useState({
       nameError: '',
       passError: '',
       emailError: ''
   })

   let validate = () => {
        let nameError = '';
        let passError = '';
        let emailError = '';

        if (!user.email || !user.email.includes('@')) {
            emailError = "Invalid email"
        }
        if (!user.username || user.username.length < 2) {
            nameError = "Username too short"
        }
        if (!user.password || user.password.length < 4) {
            passError = "Password too short"
        }
        
        if (passError || nameError || emailError) {
            setError({
                passError,nameError,emailError
            })
            return false;
        }

        return true;
    }
    

    let onChangeHandler = event => {
        let name = event.target.name;
        let value = event.target.value;
        event.preventDefault();
        setUser(prevState => ( 
                 {
                    ...prevState,
                    [name]: value
                })
            )
        }   

    let onSubmitHandler = () => {
        const isValid = validate();
        
        if (isValid) {  
            userData.push(user);
            
            //this.props.func()
            //this.props.regMsg()
        }
    }
        
    let sendUserData = () => {
        const sendData = value.takeUsersData;
        if (userData.length > 0) {
           sendData(userData);
           userData = [];
           props.history.push('/Login');
        }
    }

    let onClickHandleData = (event) => {
        event.preventDefault();
        onSubmitHandler();
        sendUserData();
        
    }

    return (
        <Container fluid className='justify-content-center' style={{backgroundImage: `url(${pic})`,backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minHeight: '100vh'}}>
            <Row className='justify-content-center'>
            
                <Col lg={3} md={6} sm={12} xs={12} className='mt-5 text-start' style={{border: '1px solid silver', borderRadius: '5px', background:'rgba(0,0,0, 0.2)', color: 'white'}}><form>
                <Row className='justify-content-center'><i style={{color:'silver'}}>{avatar}</i></Row>
                    <h1 className="mt-3 mb-4" style={{fontSize:'28px'}}>Create account</h1>
                    <p style={{fontWeight: "bold"}}>Your name</p>
                    {!user.username || user.username.length < 2 ? <p style={ {color:'red'} }> {error.nameError} </p> : null }
                    <input className="form-control mb-3" type='text' placeholder="Username" name="username" onChange={onChangeHandler}/>
                    <p style={{fontWeight: "bold"}}>Password</p>
                    <p style={ {color:'red'} }>{!user.password || user.password.length < 4 ? error.passError : null }</p>
                    <input className="form-control mb-3" type='password' placeholder="Password" name="password" onChange={onChangeHandler} />
                    <p style={{fontWeight: "bold"}}>Email</p>
                    {!user.email || !user.email.includes('@') ? <p style={ {color:'red'} }>{error.emailError}</p> : null }
                    <input className="form-control mb-3" type='email' placeholder="Email address" name="email" onChange={onChangeHandler} />
                    <Row className="justify-content-center mt-5 mb-3"><input style={{backgroundColor: 'silver', borderRadius: '7px'}}  type="button" value="Register" onClick={onClickHandleData} /></Row>
                </form></Col>
            
            </Row>
        </Container>
    )
}


// class RegForm extends React.Component { 
//     constructor(props){
//         super(props)
//         this.state = {
//             username: '',
//             password: '',
//             email: '',
//             id: new Date(),
//             nameError: '',
//             passError: '',
//             emailError: ''
//         }
        
//     }
    
//     validate = () => {
//         let nameError = '';
//         let passError = '';
//         let emailError = '';

//         if (!this.state.email.includes('@')) {
//             emailError = "Invalid email"
//         }
//         if (emailError) {
//             this.setState( {emailError} );
//         }

//         if (this.state.username.length < 2) {
//             nameError = "Username too short"
//         }
//         if (nameError) {
//             this.setState( {nameError} )
//         }

//         if (this.state.password.length < 4) {
//             passError = "Password too short"
//         }
//         if (passError) {
//             this.setState( {passError} )
//         }
        
//         if(emailError || nameError || passError) {
//             this.setState( {emailError, nameError, passError} );
//             return false;
//         }

//         return true;
//     }
//     onClickHandleData = (event) => {
//         this.onSubmitHandler()
//         this.sendUserData()
//         console.log("clicked Register")
        
//     }

//     onChangeHandler = event => {
//         event.preventDefault();
//         this.setState({
//             [event.target.name]: event.target.value
//         })
//     }   

//     onSubmitHandler = event => {
//         const isValid = this.validate();
//         if (isValid) {  
//             users.push(this.state);
//             console.log(users);
//             this.props.func()
//             this.props.regMsg()
//         }
//     }
        
//     sendUserData = () => {
//         this.props.takeUserData(
//             users
//         )
//         console.log('userData sended')
//     }

//     render() {
//         let {username} = this.state;
//         let {password} = this.state;
//         return(
//             <div>
//                 <form className={formStyle.regForm}>
//                     <i className={formStyle.avatar}>{avatar}</i>
//                     <h1 style={{fontSize:'28px'}}>Create account</h1>
//                     <p style={{fontWeight: "bold"}}>Your name</p>
//                     {username.length < 2 ? <p style={ {color:'red'} }>{this.state.nameError}</p> : null}
//                     <input type='text' placeholder="Username" name="username" onChange={this.onChangeHandler}/>
//                     <p style={{fontWeight: "bold"}}>Password</p>
//                     {password.length < 4 ? <p style={ {color:'red'} }>{this.state.passError}</p> : null}
//                     <input type='password' placeholder="Password" name="password" onChange={this.onChangeHandler} />
//                     <p style={{fontWeight: "bold"}}>Email</p>
//                     {!this.state.email.includes('@') ? <p style={ {color:'red'} }>{this.state.emailError}</p> : null}
//                     <input type='email' placeholder="Email address" name="email" onChange={this.onChangeHandler} />
//                     <input className={buttonStyle.submitData} type="button" value="Register" onClick={this.onClickHandleData} />
//                 </form>
//             </div>
//         )
//     }

// }

// export default RegForm;


