import React from 'react'
import ShowGoals from './components/Show_Goals_By_Category'
import CurrentGoals from './components/Map_And_Manipulate_Goals'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function EvenCleanerToDo() {

     return(
        <Container fluid>
            <Row style={{minHeight: '100vh'}} className="aliign-items-start">
                <Col className="mt-5" lg='auto' sm='auto' xs="auto"><ShowGoals /></Col>
                <Col><CurrentGoals/></Col>
            </Row>
        </Container>
    )

     }

// export default class CleanerToDo extends Component {
//     static contextType = MyContext;
//     constructor(props) {
//         super(props)
//         this.state = {
//             activeCategory: '',
//             categories: this.props.userGoals,
//             completedGoals: {}
//         } 
//         this.completeGoal = this.completeGoal.bind(this);
//     }

// completeGoal = (goal) => {
//     this.setState(prevState => {
//        const existingValues = this.state.completedGoals[this.state.activeCategory] ? this.state.completedGoals[this.state.activeCategory] : [];
//         return {
//             completedGoals: {
//                 ...prevState.completedGoals,
//                 [this.state.activeCategory]: [...existingValues, goal]
//             }
//         };
//     })
// }



//     render() {
//         return (
//             <div>

//                 <ShowGoals
//                     activeCategory = { (goalType) => { 
//                         let currActiveCategory = goalType;
//                         currActiveCategory ? this.setState({
//                         activeCategory: goalType
//                     }) : this.setState({activeCategory: ''})
//                     }}
//                 />

//                 <CurrentGoals
//                     goalArrays = {this.state.categories}
//                     activeCategory = {this.state.activeCategory}
//                     deleteGoal = {(modifiedArr) => 
//                         this.setState(prevState => ({
//                             categories: {
//                                 ...prevState.categories,
//                                 [this.state.activeCategory]: modifiedArr
                                
//                     }
//                         }))
//                     }
//                     completedGoal = {this.completeGoal}
//                 />

//                 {console.log('state cat',this.state.categories)}
//                 {console.log('completedGoals:', this.state.completedGoals)}
//                 {console.log('active category:',this.state.activeCategory)}
//             </div>
//         )
//     }
// }
