import React, {useContext, useState} from 'react'
import formStyle from 'C:/Users/admin070318/learningreact/src/styles/formStyling.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import  MyContext  from '../../../components/AppContext'
import {Container, Row, Col} from 'react-bootstrap'
import pic from 'C:/Users/admin070318/learningreact/src/pictures/1234.jpg'

const avatar = <FontAwesomeIcon icon={faUserCircle} size='3x' />

export default function Login(props) {
    const value = useContext(MyContext);
    const {usersData} = value; 

    const [user, setUser] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState({
        nameError: '',
        passError: '',
    })

    let allUsersNames = [];
    let allUsersPasswords = [];

    function allUsernamesAndPasswords () {
        usersData.forEach(element => {
            allUsersNames.push(element[0].username);
            allUsersPasswords.push(element[0].password);
        });
    }
 
    const validate = () => {
        allUsernamesAndPasswords();
        let nameError = '';
        let passError = '';

        if (!allUsersNames.includes(user.username) || user.username === '') {
            nameError = "Incorrect username"; 
        }
    
        if (!allUsersPasswords.includes(user.password) || user.password === '') {
            passError = "Incorrect password";  
        }
       
        if (nameError || passError) {
            setError( {nameError, passError})
            return false;
        }
        return true;
    }

    const onChangeHandler = event => {
        let name = event.target.name;
        let value = event.target.value;
        event.preventDefault();
        setUser(prevSet => ({
            ...prevSet,
            [name]: value
        })
            
        )
    }   

	const handleClick = () => {
        const logIsValid = validate();
        if (logIsValid) {
            props.history.push('/goalslist');
        } 
    }


    return (
        <Container fluid className='justify-content-center' style={{backgroundImage: `url(${pic})`,backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minHeight: '100vh'}}>
                <Row className='justify-content-center'>
                    <Col lg={3} md={6} sm={12} xs={12} className='mt-5 text-start' style={{border: '1px solid silver', borderRadius: '5px', background:'rgba(0,0,0, 0.2)', color: 'white'}}><form>
                        <Row className="justify-content-center mt-3"><i style={{color: 'silver'}}>{avatar}</i></Row>
                        <h1 className='mt-3 mb-4'>Login</h1>
                        <p style={{fontWeight: 'bold'}}>Your name</p>
                        <input className="form-control mb-3" type='text' placeholder="Username" name="username" onChange={onChangeHandler}/>
                        <p style={{color:'red'}}>{!allUsersNames.includes(user.username) ? error.nameError : null}</p>
                        <p style={{fontWeight: 'bold'}}>Password</p>
                        <input className="form-control mb-3" type='password' placeholder="Password" name="password" onChange={onChangeHandler}/>
                        {!allUsersPasswords.includes(user.password) ? <p style={{color:'red'}}>{error.passError}</p> : null}
                        <Row className="justify-content-center mt-5 mb-3"><input style={{backgroundColor: 'silver', borderRadius: '7px'}} type='button' value="Login" onClick={ () => handleClick() }/></Row>

                        <p>No account? <Link style={{color: '#008ae6'}} to={'/Register'}>Create one!</Link></p>
                    </form></Col>
              </Row>
        </Container>
    )
}


// class LogForm extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             username: '',
//             password: '',
//             usernameError: '',
//             passwordError: '',
//             errMsgShown: true
//         }
//     }

//     validate = (nam, pas) => {  
//         let usernameError = '';
//         let passwordError = '';

//         if (this.state.username !== nam || this.state.username === '') {
//             usernameError = "Incorrect username"; 
//         }
    
//         if (this.state.password !== pas || this.state.password === '') {
//             passwordError = "Incorrect password";  
//         }
       
//         if (usernameError || passwordError) {
//             this.setState( {usernameError, passwordError})
//             return false;
//         }
//         return true;
//     }

//     onChangeHandler = event => {
//         event.preventDefault();
//         this.setState({
//             [event.target.name]: event.target.value
//         })
//     }   

// 	handleClick = (name, password) => {
//         const logIsValid = this.validate(name, password);
//         console.log('log but clicked');
//         console.log(logIsValid);
//         if (logIsValid) {
//             console.log('valid info');
//             this.props.history.push('/ToDoPrototype')
//         } else {
//             this.hideErrMsg()
//         }
        
//     }

//     hideErrMsg = () => {
//         setTimeout(
//             function() {
//                 this.setState({errMsgShown: false})
//             }
//             .bind(this),
//             2000
//         );
//         this.setState({errMsgShown: true})
//     }
    
//     render() {
//         if (this.props.isDataPassed) {
//             let userDataList = Object.values(this.props.userList[0][0]);
//             currUsername = userDataList[0];
//             currPassword = userDataList[1];
//         }

//         let {username} = this.state;
//         let {password} = this.state;
        
//         return(
//             <div>
//                 {console.log(this.props.isDataPassed)}
//                 {console.log(this.props.userList)}
//                 {console.log(currUsername, currPassword)}
//                 <form className={formStyle.regForm}>
//                     <i className={formStyle.avatar}>{avatar}</i>
//                     <h1>Login</h1>
//                     <p>Your name</p>
//                     <input type='text' placeholder="Username" name="username" onChange={this.onChangeHandler}/>
//                     {this.state.errMsgShown ? <p style={{color:'red'}}>{this.state.usernameError}</p> : null}
//                     <p>Password</p>
//                     <input type='password' placeholder="Password" name="password" onChange={this.onChangeHandler}/>
//                     {this.state.errMsgShown ? <p style={{color:'red'}}>{this.state.passwordError}</p> : null}
//                     <input type='button' value="Login" onClick={ () => this.handleClick(currUsername, currPassword) }/>

//                     <p>No account? <Link to={'/Register'}>Create one!</Link></p>
//                 </form>

//             </div>
//         )
//     }
// }

// export default withRouter(LogForm)