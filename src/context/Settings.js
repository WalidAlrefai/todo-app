// import React, { Component } from 'react';
// export const UseSettings = React.createContext();

// export default class settings extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             itemsPerPage: 3,
//             sort: 'Ascending',
//             show: true,
//         };
//     }
//     render() {
//         return (
//             <UseSettings.Provider value={this.state}>
//                 {this.props.children}
//             </UseSettings.Provider>
//         );
//     }
// }
import React,{useState, useEffect} from 'react';

export const UseSettings = React.createContext();


export default function PageSettings(props){

const [itemsPerPage,setItemsPerPage] = useState(3);
const [sort,setSort] = useState('Ascending');
const [show,setShow] = useState(true);
const [display,setDisplay] = useState(true);
useEffect(() => {
    let data = localStorage.getItem('settings');
    if (data) {
        let settings = JSON.parse(data);
        setItemsPerPage(settings.itemsPerPage);
        setSort(settings.sort);
        setShow(settings.show);
        setDisplay(settings.display);
    }
},[])

const state = {itemsPerPage,sort,show,display,setItemsPerPage,setSort,setShow,setDisplay};

return (
    <UseSettings.Provider value={state}>
        {props.children}
    </UseSettings.Provider>
)
}