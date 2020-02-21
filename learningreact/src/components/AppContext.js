import React from 'react'

const MyContext = React.createContext({
    categories : 
        [      
            {value: 'work', name: 'Work'},
            {value: 'study', name: 'Study'},
            {value: 'sports', name: 'Sport'},
            {value: 'diet', name: 'Diet'},
            {value: 'vacation', name: 'Vacation'},
            {value: 'family', name: 'Family'},
            {value: 'savings', name: 'Savings'},
            {value: 'other', name: 'Other'}    
        ],
    activeCat: '',
    usersData: [],
    userGoals: {},
    taskOwner: '',
    tasks: {},
    taskIndexes: {},
    completedGoals: {},
    timersStartingTime: []
});

export default MyContext

        
        

