import React, { useState } from 'react'


export default function CheckBox({boxStatus},{boxIndex}) {
    const [checked, setChecked] = useState('');

    let onChangeHandler = (e) => {
        let isChecked = e.target.checked;
        setChecked(isChecked);
        console.log('isChecked:',isChecked);
        boxStatus(isChecked, boxIndex);  
    }

    let checkbox = <input type='checkbox' checked={checked} onChange={onChangeHandler}></input>

    return (
        <div>
            {checkbox}
        </div>
    )
}

// export default class CheckBox extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             checked: '',
//         }
//     }

//     onChangeHandler = (e) => {
//         let isChecked = e.target.checked;
//         this.setState({checked: isChecked})
//         console.log('isChecked:',isChecked);
//         this.props.boxStatus(isChecked, this.props.boxIndex);  
//     }

//     render() {
        
         
//         return (
//             <div>
//                 {checkbox}
//             </div>
//         )
//     }
// }
