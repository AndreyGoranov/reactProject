import React, { useContext, useState } from 'react'
import {withRouter} from 'react-router-dom'
import CheckBox from 'C:/Users/admin070318/learningreact/src/components/CheckBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import  MyContext  from '../../../../components/AppContext';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import subGoalStyle from 'C:/Users/admin070318/learningreact/src/styles/descrAndTasks.module.css'
import pic from 'C:/Users/admin070318/learningreact/src/pictures/asd.jpg';
import Modal from 'react-bootstrap/Modal'

const deleteGoalIcon = <FontAwesomeIcon icon={faTrash} size="2x" />;
const completeGoalIcon = <FontAwesomeIcon icon={faCheckSquare} size="2x" style={{color: 'green'}} />;
const completeTaskIcon = <FontAwesomeIcon icon={faCheckCircle} size="1x" style={{color: 'green'}} />;
let currGoalIndexToShow = '';
let currShowGoalName = '';
let taskOwner = '';


function Map_And_Manipulate_Goals(props) {
    const value = useContext(MyContext);
    let activeCategory = value.activeCat;
    const [showDescr, setShowDescr] = useState('');
    let [currMarkedElements, setCurrMarkedElements] = useState([]);
    const [showTask, setShowTask] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const readyTask = {
        backgroundColor: 'green',
        padding: '10px',
        font: 'normal 18px/1.5em Arial',
        marginTop: '10px',
        marginBottom: '10px',
        border: '1px solid #f0ad4e',
        borderRadius: '7px'
    }
    const notRdyTask = {
        backgroundColor: 'transperent',
        padding: '10px',
        font: 'normal 18px/1.5em Arial',
        marginTop: '10px',
        marginBottom: '10px',
        border: '1px solid #f0ad4e',
        borderRadius: '7px'
    }

    let showDescription =  (index, name) => {
        setShowDescr(prev => prev === name ? '' : name);
    } 

    let modifyMainArrays = () => {  // removing elements and returning new modifyed array
        let arrToModify =  value.userGoals[activeCategory];
        let sortedIndexes = currMarkedElements.sort((a,b) => b - a);
        sortedIndexes.forEach(el => arrToModify.splice(el,1));
        setCurrMarkedElements([]);
        return arrToModify; 
    }

    let deleteElements = () => {
        modifyMainArrays() // changing the mainArrays with the new Modifyed copy of them
    }

    let completeGoal = (index) => {
        let arrToModify = [];
        
        if (value.userGoals && value.userGoals[activeCategory]) {
             arrToModify =  value.userGoals[activeCategory];
        }

        let currCompletedGoal = arrToModify.splice(index, 1);
        let completedAt = Date.now();
        function getDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            return today;

        }
        let completedAtDate = getDate()
        value.takeCompletedGoals(activeCategory, currCompletedGoal, completedAt, completedAtDate);
        return currCompletedGoal;
    }

    function taskReady(index , owner, acat) {
        if (value.taskIndexes && value.taskIndexes[acat]) {
            if (value.taskIndexes[acat][owner] ? value.taskIndexes[acat][owner].includes(index): null){
                 return readyTask;
            } else {
                 return notRdyTask;
            } 
        } else {
            return notRdyTask;
        }
        
    }

    

    function castTasks(owner) {
        let currOwner = owner;
        let currTask = 
        <Container className={subGoalStyle.task}>
            <Row>
                {value.tasks && value.tasks[activeCategory] && value.tasks[activeCategory][currOwner] ? 
                value.tasks[activeCategory][currOwner].map((task, i) => 
                    <Col lg='auto'><div style= {taskReady(i, currOwner, activeCategory)}>
                        <h3 style={{wordWrap: 'break-word'}}>Task: {task[0]}</h3>
                        <h3 style={{wordWrap: 'break-word'}}>Description: {task[1]}</h3>
                        <button onClick={() => value.storeRdyTaskIndexes(i,currOwner,activeCategory)}>{completeTaskIcon}</button>
                    </div></Col> 
                ) : null
                }
            </Row>
        </Container>
        return currTask
    }
    function tasksPending(id, acat) {
        const uniqueIndexes = [...new Set(value.taskIndexes[acat] && value.taskIndexes[acat][id] ? value.taskIndexes[acat][id] : null )]
        if (value.tasks && value.tasks[acat] && value.tasks[acat][id]) {
            return value.tasks[acat][id].length - uniqueIndexes.length;
        } else {
            return '0'
        }
        
    }
        
    function currentGoals() {
        const currGoals =
        <>
            
            <Container>
                <Row>
                    {value.userGoals && value.userGoals[activeCategory] ? 
                    value.userGoals[activeCategory].map((goal,i) =>
                    <Col className='mt-5' lg={4} sm={6} xs={12}><Jumbotron className="mr-2 mt-1" style={{border: '1px solid red'}}>
                    <Container>
                        <Row className="justify-content-center" >
                            <Col lg='auto' sm="auto" xs='auto'><h2 style={{wordWrap: 'break-word'}}>{goal[0]}</h2></Col>
                        </Row>
                        
                        <Row className="justify-content-center mb-3"><Button style={{backgroundImage: `url(${pic})`, outline:'none', border: 'none', color: '#d9534f'}}  name = {goal[0]} onClick= 
                        {(e) => {
                            e.preventDefault();
                            let target = e.target.name;
                            value.takeTaskOwner(target);
                            props.history.push('/createtasks');
                            
                        }}>Add tasks</Button></Row>
                     <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Body>You're about to mark your goal as completed.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary"  onClick={() => completeGoal(i)}>
                                Continue
                            </Button>
                            <Button variant="secondary"  onClick={()=> setShowModal(false)}>
                                Go back
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Row className="justify-content-center mb-3" ><Button variant='outline-primary' onClick={() => showDescription(i, goal[0])}>Description</Button></Row>
                    <Row className='justify-content-center mb-3' ><Button variant ='outline-warning' name = {goal[0]} onClick ={(e) => {taskOwner = e.target.name;taskShowing(taskOwner)}}>{tasksPending(goal[0], activeCategory)}Tasks pending</Button></Row>
                    <Row className="justify-content-center mb-3" ><button key={goal[0]} onClick={()=> setShowModal(true)}>{completeGoalIcon}</button></Row>
                    <Row className="justify-content-center ">  {showDescr && goal[0] === showDescr ? <Col lg='auto' sm="auto" xs='auto' className={subGoalStyle.descr}><p style={{wordWrap: 'break-word'}}>{goal[1]}</p></Col> : null}</Row>
                    <Row className="justify-content-center ">{showTask && goal[0] === showTask ? castTasks(taskOwner) : null}</Row>
                    
                    <Row className="justify-content-around"><CheckBox
                        boxIndex = {i}
                        boxStatus = {(isChecked) => {
                            if (isChecked) {
                                setCurrMarkedElements([...currMarkedElements, Number(i)]);
                            } else {
                                currMarkedElements.splice(currMarkedElements.indexOf(i),1);
                                setCurrMarkedElements(currMarkedElements);
                            }
                        } }
                    /></Row>
                    
                    </Container>
                </Jumbotron>
                </Col>) : currMarkedElements = [] }
                </Row>
            </Container>
                
                
            </>;

                        function taskShowing(taskOwner) {
                            setShowTask(prev => prev === taskOwner ? '' : taskOwner);
                        }

            return currGoals;
    }
    
    return ( 
            <Container> 
                <button className='fixed-bottom' style={{ backgroundColor:'inherit', outline: 'none', border: 'none'}} onClick={deleteElements}>{deleteGoalIcon}</button>
                <Row className='justify-content-center mt-5'>{currentGoals()}</Row>
            </Container>    
            
        
    )
}
export default withRouter(Map_And_Manipulate_Goals)
// class CurrentGoals extends Component {
//     static contextType = MyContext;
//     constructor(props) {
//         super(props)
//         this.state = {
//             showDescr: false,
//             currMarkedElements: [],
//         }
//     }
    
//     showDescription = (index) => {
//         currGoalIndexToShow = Number(index);
//         console.log(currGoalIndexToShow);
//         this.state.showDescr ? this.setState({showDescr: false}) : this.setState({showDescr: true})
//     } 
//     currDescription = () => {
//         if (this.props.goalArrays[this.props.activeCategory]) {
//             let currGoal = this.props.goalArrays[this.props.activeCategory][currGoalIndexToShow];
//             if (currGoal) {
//                 let currDescription = currGoal[1];
//                 return <p>{currDescription}</p>
//             }
            
//         }  
//     }
//     modifyMainArrays = () => {  // removing elements and returning new modifyed array
//         let arrToModify =  this.props.goalArrays[this.props.activeCategory];
//         let sortedIndexes = this.state.currMarkedElements.sort((a,b) => b - a);
//         console.log('sortedIndexes:',sortedIndexes)
//         sortedIndexes.forEach(el => arrToModify.splice(el,1));
//         console.log('arrtomodify:', arrToModify);
//         this.setState({currMarkedElements: []});
//         return arrToModify; 
//     }

//     deleteElements = () => {
//         this.props.deleteGoal(this.modifyMainArrays()) // changing the mainArrays with the new Modifyed copy of them
//     }

//     completeGoal = (index, completeTime) => {
//         let arrToModify =  this.props.goalArrays[this.props.activeCategory];
//         let currCompletedGoal = arrToModify.splice(index, 1);
//         this.props.deleteGoal(arrToModify);
//         this.context.takeCompletedGoals(this.props.activeCategory, currCompletedGoal, completeTime);
//         return currCompletedGoal;
//     }

//     takeCompleteTime = (stopAndTakeTime) => {
      
//         return stopAndTakeTime;
//     }

//     render() {
        
//         let activeCategory = this.props.activeCategory;
//         const currGoals =
//         this.props.goalArrays[activeCategory] ? 
//             this.props.goalArrays[activeCategory].map((goal,i) =>
//                 <ul>
//                     <li id= {i} key={i}><input type='button' value={goal[0]} onClick={() => this.showDescription(i)}></input></li>
//                     <button key={goal[0]} onClick={() => this.props.completedGoal(this.completeGoal(i,this.takeCompleteTime()))}>{completeGoal}</button>
//                     <CheckBox
//                         boxIndex = {i}
//                         boxStatus = {(isChecked) => {
//                             if (isChecked) {
//                                 this.setState({currMarkedElements: [...this.state.currMarkedElements, Number(i)]})
//                             } else {
//                                 this.state.currMarkedElements.splice(this.state.currMarkedElements.indexOf(i),1)
//                                 this.setState({currMarkedElements: this.state.currMarkedElements})
//                             }
//                         } }
//                     />
//                     <Stopwatch takeCompleteTime = {this.takeCompleteTime} />
//                 </ul>   
//             ) : this.state.currMarkedElements = [];
                        
//         return (
//             <>
//                 {this.props.activeCategory ? <p>Current {activeCategory} goals</p> : null}
//                 {currGoals}
//                 {console.log('currMarkedElements',this.state.currMarkedElements)}
//                 {this.state.showDescr ? this.currDescription() : null}
//                 <button onClick={this.deleteElements}>{deleteGoal}</button>
//                 {console.log('active category inside current goals:',this.props.activeCategory)} 
//             </>
//         )
//     }
// }

// export default withRouter(CurrentGoals)