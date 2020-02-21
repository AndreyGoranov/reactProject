import React, { useContext, useState } from 'react'
import  MyContext  from '../../../components/AppContext';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import prTabsStyle from 'C:/Users/admin070318/learningreact/src/styles/prTabStyle.module.css'
import 'C:/Users/admin070318/learningreact/src/styles/myTabStyle.css';

export default function Progress() {
    const value = useContext(MyContext);
    let {completedGoals} = value;                           
    let {userGoals} = value;
    let [activeTab, setActiveTab] =  useState('work');
    
    const totalGoalProgress = () => {
        const overallProgressData = [];

        let totalCompGoals = 0;
        let totalGoals = 0;
        for (let cat in completedGoals) {
            totalCompGoals += completedGoals[cat].length;
        }
        for (let categ in userGoals) {
            totalGoals += userGoals[categ].length
        }
        
        overallProgressData.push(totalGoals,totalCompGoals);
        return overallProgressData;
    }

    const categoryProgressPercentage = () => {
        const progressPercentages = [];
        let catWithoutCompletedGoalsYet = [];
        let currCompletedCatLength = 0;
        let currActiveCatLength = 0;
        let totalCatLength = 0;

        function isEmpty(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
        
            return true;
        }

        if (!isEmpty(completedGoals)) {
            for (let cCat in completedGoals) {
                currCompletedCatLength = completedGoals[cCat].length;
            for (let aCat in userGoals) {
                if (aCat === cCat) {
                    if (catWithoutCompletedGoalsYet.includes(cCat)) {
                        for (let i = 0; i < progressPercentages.length; i++) {
                            if (progressPercentages[i][0] === cCat) {
                                progressPercentages.splice(progressPercentages.indexOf(progressPercentages[i]),1);
                            }
                        }
                    }
                    
                    currActiveCatLength = userGoals[aCat].length;
                    totalCatLength = currActiveCatLength + currCompletedCatLength;
                    let percentage = currCompletedCatLength / totalCatLength * 100;
                    progressPercentages.push([aCat,totalCatLength,currCompletedCatLength,Math.floor(percentage)]);
                    currActiveCatLength = 0;
                    currCompletedCatLength = 0;
                    totalCatLength = 0;
    
                } else {
                    if (!completedGoals.hasOwnProperty(aCat)) {
                        if (userGoals[aCat].length > 0) {
                            progressPercentages.push([aCat,userGoals[aCat].length,0,0]);
                        }
                    }
                }
            }
           
        }
        } else {
            for (let currCat in userGoals) {
                if (catWithoutCompletedGoalsYet.includes(currCat)) {
                    break;
                } else {
                    catWithoutCompletedGoalsYet.push(currCat);
                }
                
                currActiveCatLength = userGoals[currCat].length;
                totalCatLength = currActiveCatLength;
                progressPercentages.push([currCat,totalCatLength,0,0])
                totalCatLength = 0;
            }
        }
    
        return progressPercentages;
    }

    function isEqual(a, b) {
        if(a && b ? a.length !== b.length : false) {
            return false; 
        } else {
            if (a && b) {
                for(var i = 0; i < a.length; i++) {
                if(a[i] !== b[i])
                return false;
                }    
            } else {
                return false;
            }
         
        }
            return true; 
        }

        function filterProgressData(data) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (i !== j) {
                        if (isEqual(data[i], data[j])) {
                            data.splice(data.indexOf(data[i]), 1);
                        }
                    }
                }
                
            
            }
            return data;
        }

    function castProgressByTabs(arrWithProgressData) {
        let filteredData = filterProgressData(arrWithProgressData);
        return(
            <Tabs className={prTabsStyle.tabs} onSelect={key => setActiveTab(key)} activeKey={activeTab}>
                {filteredData.map((cat) => 
                <Tab id='tab' eventKey={cat[0]} title={cat[0]}>
                    <Container>
                        <Jumbotron className={positionCenter} style={{backgroundColor: 'darkblue', color: 'white', boxShadow: '1px solid white', borderRadius: '6px'}}>
                            <Row className={positionCenter}>
                                <Col><h3 style={{textAlign: 'center'}}>Total goals: {cat[1]}</h3></Col>
                            </Row>
                            <Row className={positionCenter}>
                                <Col><h3 style={{textAlign: 'center'}}>Completed: {cat[2]}</h3></Col>
                            </Row>    
                            <Row className={positionCenter}>
                                <Col lg='6'>
                                Progress:
                                 <ProgressBar
                                    variant='success'
                                    animated 
                                    label={`${cat[3]}%`}
                                    now={cat[3]}
                                ></ProgressBar>
                                </Col>
                            </Row>
                        </Jumbotron>   
                    </Container>

                </Tab>
                )}
            </Tabs>
            )
    }
    
    let overallProgress = totalGoalProgress(); 
    let arrWithAllCatProgress = categoryProgressPercentage();
    let totalGoalsEver = overallProgress[0] + overallProgress[1];
    let progressInPercentages = overallProgress[1] / totalGoalsEver * 100;
    const positionCenter = "justify-content-md-center";
    return (
    <Container fluid className={positionCenter} style={{minHeight: '100vh', width: '100wv'}}>
                  
                <Row className={positionCenter}><Col lg='auto'><h2 style={{textAlign: 'center', marginTop: '100px', color: 'white'}}>Here's your progress.</h2></Col></Row>
                <Row className={positionCenter}><Col lg='auto'><h3 style={{textAlign: 'center', color: 'white'}}>Total goals: {totalGoalsEver}</h3></Col></Row>
                <Row className={positionCenter}><Col lg='auto'><h3 style={{textAlign: 'center', color: 'white'}}>Total goals completed: {overallProgress[1]}</h3></Col></Row>
                
                <Row className={positionCenter}>
                    <Col lg='9'><h3 style={{textAlign: 'center', paddingTop: '20px', color: 'white'}}><h3 style={{color: 'white'}}>Progress:</h3><div style={{paddingTop: '30px'}}>
                        <ProgressBar
                            variant='success'
                            animated 
                            label={totalGoalsEver === 0 ? null : 0 ? null : `${Math.floor(progressInPercentages)}%`}
                            now={totalGoalsEver === 0 ? 0 : Math.floor(progressInPercentages)}
                        ></ProgressBar></div></h3>
                    </Col>
                </Row>
                    
            <Row>
                <Col>{castProgressByTabs(arrWithAllCatProgress)}</Col>
            </Row>
    </Container>
    )
}


// export default class index extends Component {
//     static contextType = MyContext;

//     totalGoalProgress = () => {
//         const overallProgressData = [];
//         let {completedGoals} = this.context;
//         let {userGoals} = this.context;

//         let totalCompGoals = 0;
//         let totalGoals = 0;
//         for (let cat in completedGoals) {
//             totalCompGoals += completedGoals[cat].length;
//         }
//         for (let categ in userGoals) {
//             totalGoals += userGoals[categ].length
//         }
        
//         overallProgressData.push(totalGoals,totalCompGoals);
//         return overallProgressData;
//     }

//     categoryProgressPercentage = () => {
//         const progressPercentages = [];

//         let {completedGoals} = this.context;                           
//         let goalArrays = this.context.userGoals;

//         let currCompletedCatLength = 0;
//         let currActiveCatLength = 0;
//         let totalCatLength = 0;

//         for (let cCat in completedGoals) {
//             currCompletedCatLength = completedGoals[cCat].length;
//             for (let aCat in goalArrays) {
//                 if (aCat === cCat) {
//                     currActiveCatLength = goalArrays[aCat].length;
//                     totalCatLength = currActiveCatLength + currCompletedCatLength;
//                     let percentage = currCompletedCatLength / totalCatLength * 100;
//                     progressPercentages.push([aCat,totalCatLength,currCompletedCatLength,Math.floor(percentage)]);

//                     currActiveCatLength = 0;
//                     currCompletedCatLength = 0;
//                     totalCatLength = 0;
//                 }
//             }
//         }
//         return progressPercentages;
//     }

//     render() {
        
//         let overallProgress = this.totalGoalProgress(); 
//         let arrWithAllCatProgress = this.categoryProgressPercentage();
//         let castProgress = arrWithAllCatProgress.map((cat) => 
//             <>
//                 <h3>Category: {cat[0]}</h3>
//                 <h5>Total goals: {cat[1]}</h5>
//                 <h5>Completed: {cat[2]}</h5>
//                 <h5>Progress: {cat[3]} %</h5>
//                 <hr/>
//             </>
//         );

//         let totalGoalsEver = overallProgress[0] + overallProgress[1];
//         let progressInPercentages = overallProgress[1] / totalGoalsEver * 100;
//         return (
//             <div>
//                 <h1>Here's your progress. Try to make it 100% !</h1>
//                 <h3>Total goals: {totalGoalsEver}</h3>
//                 <h3>Total goals completed: {overallProgress[1]}</h3>
//                 <h3>Progress: {totalGoalsEver == 0 ? 0 : Math.floor(progressInPercentages)} %</h3>
//                 <hr/>
//                 {castProgress}
//                 {console.log(this.categoryProgressPercentage())}    
//                 {console.log('user goals',this.context.userGoals)}  
//             </div>
//         )
//     }
// }
