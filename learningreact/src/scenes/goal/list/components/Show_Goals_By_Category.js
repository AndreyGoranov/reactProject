import React, { useContext  } from 'react'
import  MyContext  from '../../../../components/AppContext'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


 export default function ShowGoals() {
        const value = useContext(MyContext)
        const categories = value.categories;
       
        return (
            <Tabs style={{borderBottom: '0px'}} className="flex-sm-column justify-content-start mt-5 " onSelect = {k => value.takeActiveCat(k)}>
                {categories.map(cat => 
                <Tab eventKey={cat.value} title={cat.name}></Tab>)}
            </Tabs>
        )
    }

