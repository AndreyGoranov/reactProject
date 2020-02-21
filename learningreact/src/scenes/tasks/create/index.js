import React, {useContext, useState} from 'react'
import MyContext from '../../../components/AppContext';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function Create_Tasks() {
    const value = useContext(MyContext);
    const [task, setTask] = useState({
        taskName: '',
        taskDescription: ''
    })

    const [showModal, setShowModal] = useState(false)

    const onChangeHandler = (event) => {
        const n = event.target.name
        const v = event.target.value
        setTask(prev => ({
            ...prev,
            [n]: v
        }))
    }
    return (
        <Container className="justify-content-center" style={{position:'relative', top:'150px'}}>
            
            <Row className="flex-column">
                <Col className="align-self-center text-center" style={{border: '1px solid black', background:'rgba(255,255,255,0.2)'}} lg={5} md={6} sm={10} xs={12}>
                    <Col className='mt-3'><input className='form-control' name='taskName' type = 'text' value={task.taskName} placeholder = 'Task' onChange = {onChangeHandler}></input></Col>
                    <Col className='mt-3'><textarea className='form-control' name='taskDescription' type = 'text' value={task.taskDescription} placeholder = 'Description' onChange = {onChangeHandler}></textarea></Col>
                    <Col className='mt-3'><button style={{backgroundColor: 'green', border: 'none', borderRadius:'1px', outline: '1px solid black', color: 'white'}} onClick={() => {setShowModal(true); value.saveNewTask(value.taskOwner, [task.taskName, task.taskDescription], value.activeCat); setTask({taskName: '', taskDescription: ''}) }}>Create</button></Col>
                </Col>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body>Task created successfully</Modal.Body>
                <Button variant="secondary" onClick={()=> setShowModal(false)}>
                    Great
                </Button>
            </Modal>     
            </Row>
          
        </Container>
    )
}
