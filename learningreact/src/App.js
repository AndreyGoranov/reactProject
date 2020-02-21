import React, {useContext, useState} from 'react'
import WelcomePage from './scenes/welcome/home'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ToDoList from './scenes/goal/list'
import Layout from './Layout'
import ToDoForm from './scenes/goal/create'
import Progress from './scenes/goal/progress'
import AppContext from './components/AppContext'
import History from './scenes/goal/history'
import Login from './scenes/user/login'
import Register from './scenes/user/register'
import CreateTasks from './scenes/tasks/create'


function App() {
    const value = useContext(AppContext);
    const [context, setContext] = useState(value);

    const storeRdyTaskIndexes = (index, owner, aCat) => {
        let existingValues = context.taskIndexes[aCat] ? context.taskIndexes[aCat] : {};
        let deeperExistValues = existingValues[owner] ? existingValues[owner] : [];
        setContext(prev => {
            return {
                ...prev,
                taskIndexes: {
                    ...prev.taskIndexes,
                    [aCat]: {
                        ...prev.taskIndexes[aCat],
                       [owner]: [...deeperExistValues, index]
                    }

                }
                
            }
        })
    }

    const takeTaskOwner= (owner) => {
        setContext(prev => {
            return {
               ...prev,
            taskOwner: owner  
            }
           
        })
    }

    const saveNewTask = (owner, task, aCat) => {
        let existingValues = context.tasks[aCat] ? context.tasks[aCat] : {};
        let deeperExistValues = existingValues[owner] ? existingValues[owner] : [];
        setContext(prev => {
            return {
                ...prev,
                tasks: {
                    ...prev.tasks,
                    [aCat]: {
                        ...prev.tasks[aCat],
                       [owner]: [...deeperExistValues, task]
                    }

                }
                
            }
        })
    }

    const saveTimersStartingTime = (time) => {
        setContext(prev => {
            return {
                ...prev,
                timersStartingTime: [...context.timersStartingTime, time]
            }
        })
    }

    const takeActiveCat = (actCat) => {
        setContext(prevState => {
            return {
                ...prevState,
            activeCat: actCat
            }   
        })
            
    }

    const takeUserGoals = (goalType,value) => {
        setContext(prevState => {
            const existingValues = context.userGoals[goalType] ? context.userGoals[goalType] : [];
            return {
                ...prevState,
                userGoals: {
                    ...prevState.userGoals,
                    [goalType]: [...existingValues, value]
                }
        }})
        
    }

    const takeCompletedGoals = (actCat, goal, completeTime, cplDate) => {
        goal[0].push(completeTime, cplDate);
        setContext(prevState => {
            const existingValues = context.completedGoals[actCat] ? context.completedGoals[actCat] : [];
            return {
                ...prevState,
                completedGoals: {
                    ...prevState.completedGoals,
                    [actCat]: [...existingValues, goal]
                    
                }
        }})
    }

    const takeUsersData = (data) => {
        setContext(prevState => {
            return {
                ...prevState,
                usersData: [...context.usersData, data]
            }
            
        }) 
    }

    return (
            <Router>
                <AppContext.Provider value=
                {{
                    ...context,
                    categories: context.categories,
                    takeActiveCat: takeActiveCat,
                    takeUserGoals: takeUserGoals,
                    takeCompletedGoals: takeCompletedGoals,
                    userGoals: context.userGoals,
                    takeUsersData: takeUsersData,
                    usersData: context.usersData,
                    saveTimersStartingTime: saveTimersStartingTime,
                    activeCat: context.activeCat,
                    timersStartingTime: context.timersStartingTime,
                    takeTaskOwner: takeTaskOwner,
                    saveNewTask: saveNewTask,
                    storeRdyTaskIndexes: storeRdyTaskIndexes
                }}>
                    <Switch>
        
                        <Route path='/' exact component={WelcomePage} />

                        <Route path='/login' component={Login} />

                        <Route path='/register' component={Register} />

                        <Layout>
                            <Route path='/goalslist' component={ToDoList} />
                                
                            <Route path='/creategoals' component={ToDoForm} />

                            <Route path='/history' component={History} />

                            <Route path='/progress' component={Progress} />

                            <Route path='/createtasks' component={CreateTasks} />

                            
                        </Layout>

                    </Switch>
                </AppContext.Provider>    
        </Router>
       
        )
    
}

export default App;