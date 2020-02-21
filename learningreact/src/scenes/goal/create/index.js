import React, {useContext, useState} from 'react'
import  MyContext  from '../../../components/AppContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import createGoalsStyle from 'C:/Users/admin070318/learningreact/src/styles/createGoalsStyle.module.css'
import Modal from 'react-bootstrap/Modal'

export default function ToDoForm() {
    const value = useContext(MyContext);
    const [goalData, setGoalData] = useState({
        type: 'Choose goal type',
        value: '',
        name: '',
        description: ''
    })

    const [showModal, setShowModal] = useState(false)

    const onChangeHandler = (event) => {
        const n = event.target.name
        const v = event.target.value
        setGoalData(prevGoalData => ({
            ...prevGoalData,
            [n]: v
        }))
    }

    const  validateGoalInput = () => {
        if (goalData) {
            if (!goalData.type || !goalData.name) {
            return false;
        }
        if (value.userGoals[goalData.type]) {
             for (let goal of value.userGoals[goalData.type]) {
                if (goal.includes(goalData.name)) {
                    return false;
                }
            }
        }
       

        } else {
            return false;
        }
        
        return true;
    }

    const saveGoalInput = (fields) => {
        let isValid = validateGoalInput();
        if (isValid) {
            value.takeUserGoals(goalData.value, [goalData.name, goalData.description]);
            function getDate() {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;
                return today;

            }
            value.saveTimersStartingTime([goalData.name,Date.now(),getDate()]);

            setShowModal(true);

            setGoalData({
                type: 'Choose goal type',
                name: '',
                description: ''
            })
        }

    } 
  
    return (
        <Container fluid  style={{backgroundColor: 'transperent', borderRadius: '6px', minHeight: '100vh'}}>
            <Row className="justify-content-center flex-column mt-5" >
                <Col style={{border:'1px solid grey', borderRadius: '5px', background:'rgba(255,255,255,0.2)'}} className='align-self-center mt-5' lg={3} md={8} sm={12} xs={12}>
                    <Row>
                        <Col className="text-center mt-5">
                        
                            <DropdownButton className={createGoalsStyle.dropdownBtnContainer} id='dropdownBtnContainer' drop = 'right' title={goalData.type}>
                                {value.categories ? value.categories.map(cat => 
                                <Dropdown.Item className={createGoalsStyle.dropdownBut} eventKey={cat.value} onSelect ={() => setGoalData({type: cat.name,
                                value: cat.value})}>
                                    {cat.name}
                                </Dropdown.Item>): null}
                            </DropdownButton>
                        </Col>    
                    </Row>
                        
                    
                <Col className="text-center mt-5" md='auto' xs='auto' lg = 'auto'>
                    <input className="form-control" style={{border: '1px inset #d9534f',backgroundColor: 'white',color: 'black', borderRadius: '3px' }}name='name' type='text' value={goalData.name} placeholder="What's the goal?" onChange={onChangeHandler}></input>
                </Col>
                <Col className="text-center mt-5" md='auto' xs='auto' lg = 'auto'>
                    <textarea rows='3' className="form-control" style={{border: '1px inset #d9534f', backgroundColor: 'white',color: 'black', borderRadius: '3px' }} name= 'description' value={goalData.description} placeholder='Describe it.' onChange={onChangeHandler}></textarea>
                </Col>
                <Row className='justify-content-center mt-5 mb-5'><Button style={{backgroundColor: '#269900', border: 'none' }} onClick={saveGoalInput}>Create</Button></Row>
            </Col></Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body>Goal created successfully</Modal.Body>
                <Button variant="secondary" onClick={()=> setShowModal(false)}>
                    Great
                </Button>
            </Modal>     
    </Container>
            )
}


// class ToDoForm extends React.Component {
//     static contextType = MyContext;
//    constructor(props) {
//        super(props)
//    }

//    onChangeInput = (event) => {
//         this.setState({
//             [event.target.name]: event.target.value
//         })
//     }

//     validateGoalInput = () => {
//         if (this.state) {
//             if (!this.state.goalType || !this.state.goalName) {
//             return false;
//         }
//         } else {
//             return false;
//         }
        
//         return true;
//     }

//     saveGoalInput = () => {
//         let isValid = this.validateGoalInput();
//         if (isValid) {
//             this.context.takeUserGoals(this.state.goalType,[this.state.goalName, this.state.goalDescr]); 
//         }

//     }

//    render() {
//     const categories = this.context.categories;
//     const addGoalForm =   
//     <>
//     <select name='goalType' onChange={this.onChangeInput}>
//         <option selected disabled hidden>Choose goal category</option>
//         {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.name}</option>)}
//     </select>
//     <input name='goalName' type='text' placeholder='Goal name' onChange={this.onChangeInput}></input>
//     <textarea name= 'goalDescr' placeholder='Goal description' onChange={this.onChangeInput}></textarea>
//     <button onClick={this.saveGoalInput}>Save</button>
//     </>

//        return(
//            <div>
//                {addGoalForm}  
//            </div>
           
//        )
//    }
// }

// export default ToDoForm

    
