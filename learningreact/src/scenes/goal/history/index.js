import React, { useContext } from 'react'
import  MyContext  from '../../../components/AppContext';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import prTabsStyle from 'C:/Users/admin070318/learningreact/src/styles/prTabStyle.module.css'

export default function History() {
    const value = useContext(MyContext);

    const {completedGoals} = value;
    const {timersStartingTime} = value;
    const completeTime = (goalName, cplTime) => {
        let timeToComplete = 0;
        for (let times of timersStartingTime) {
                if (times[0] === goalName) {
                    timeToComplete = Math.round((cplTime - times[1])  / 1000 );
                    let seconds = timeToComplete % 60;
                    let minutes = Math.floor(timeToComplete / 60);
                    let hours = Math.floor(minutes / 60);
                    let days = Math.floor(hours / 24);
                    timeToComplete = `${days}d:${hours}h:${minutes}m:${seconds}s`
                    let startDate = times[2];
                return {
                   cpltime: timeToComplete,
                   startDate: startDate
                }
                }
                
        }
    }

        let avCat = Object.getOwnPropertyNames(completedGoals);
        function castTabs() {
            return(
            <Container>
                <Tabs className={prTabsStyle.tabs}>
                    {avCat.map((cat, i) =>          
                        <Tab variant="outline-primary" eventKey={cat} title={cat}>
                                
                            <Row className='justify-content-center'>
                                {completedGoals[cat].map((goal, i) =>
                                <Jumbotron className={"justify-content-center mt-2 mr-2"} style={{backgroundColor: 'blue', color: 'white'}}>
                                    <p>Name: {goal[0][0]}</p>
                                    <p>Description: {goal[0][1]}</p>
                                    <p>Started at: {completeTime(goal[0][0], goal[0][2]).startDate}</p>
                                    <p>Finished at: {goal[0][3]}</p>
                                    <p>Completed in: {completeTime(goal[0][0], goal[0][2]).cpltime}</p>
                                </Jumbotron> 
                                 )}
                            </Row>
                            
                           
                        </Tab> 
                        )}
                    </Tabs>
                  </Container>
                
            )
        }
        

    return (
        <Container className='text-center' style={{color: 'white'}}>
            <Row className="mt-5 flex-column jutify-content-center">
                <Col className='mt-5'><h2>History:</h2></Col>
                <Col><p>{avCat.length < 1 ? 'You havent completed any goals yet ': null}</p></Col>
            </Row>
            {castTabs()}
            
        </Container>
    )
}


// export default class History extends Component {

//     static contextType = MyContext;
    
//     render() {
//         const {completedGoals} = this.context;
//         let avCat = Object.getOwnPropertyNames(completedGoals);
//         let avalibleCategories = avCat.map((cat, i) =>
        
//             <ul>
//                 <li id= {i} key={i}>
//                     <h2>{cat}</h2>
//                     {completedGoals[cat].map((goal, i) => 
                    
//                         <>
//                             <p>Name: {goal[0][0]}</p>
//                             <p>Description: {goal[0][1]}</p>
//                             <hr/>
//                         </>
//                     )}
                
//                 </li>
                
//             </ul>
        
//         )
       
//         return (
//             <div>
//                 <h1>History</h1>
//                 <hr/>
//                 <h2>Completed goals</h2>
//                 <p>{avCat.length < 1 ? 'You havent completed any goals yet ': null}</p>
//                 {avalibleCategories}



               
//             </div>
//         )
//     }
// }
