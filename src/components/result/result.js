import { Button } from "@blueprintjs/core";
import { useState, useContext, useEffect } from "react";
import { UseSettings } from '../../context/Settings';
// import {DisplayContext} from '../../context/DisplayCompleted';
import List from '../list/list.js';
import {When} from 'react-if';
import {LoginContext} from '../../context/LoginContext';
function Result(props) {
    const settings = useContext(UseSettings);
    const log = useContext(LoginContext);
    // const  display  = useContext(DisplayContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(Math.ceil(props.list.length / (settings.itemsPerPage)))
    const [activeList, setactiveList] = useState(
        (settings.show ? props.list : props.incomplete).slice(
            0, settings.itemsPerPage)
    );
    useEffect(() => {
        setactiveList(
            (settings.show ? props.list : props.incomplete).slice(
                0,
                settings.itemsPerPage
            )
        );
        setPageNumber(
            Math.ceil(
                (settings.show ? props.list : props.incomplete).length /
                settings.itemsPerPage
            )
        );
    }, [settings.itemsPerPage, settings.show, props.list, props.incomplete,settings.display]);
    useEffect(() => {
        let start = (currentPage - 1) * settings.itemsPerPage;
        let end = start + settings.itemsPerPage;
        setactiveList(
            (settings.show ? props.list : props.incomplete).slice(start, end)
        );
    }, [currentPage, settings.itemsPerPage, settings.show, props.list, props.incomplete]);
    const changePage = (pageNum) => {
        if (pageNum !== currentPage) setCurrentPage(pageNum);
    };
    
    const Pages = () => {
        let pagesArr = [];
        if (currentPage > 1) {
            pagesArr.push(
                <Button
                    class="@ns-button"
                    type="button"
                    onClick={() => {
                        changePage(currentPage - 1);
                    }}
                >
                    previous
                </Button>
            );
        }
        for (let i = 1; i <= pageNumber; i++) {
            pagesArr.push(
                <Button
                    class="@ns-button"
                    type="button"
                    onClick={() => {
                        changePage(i);
                    }}
                    key={i}
                >
                    {i}
                </Button>
            );
        }
        if (currentPage <= pageNumber) {
            pagesArr.push(
                <Button
                    class=".bp3-active"
                    type="button"
                    onClick={() => {
                        changePage(currentPage + 1);
                    }}
                >
                    next
                </Button>
            );
        }
        return <div className="pages"> {pagesArr} </div>;
    };
    console.log('556666',activeList);
    return (
        <div className="result">
            <When condition={log.canDo('read')}>
            {
                settings.display ?
                activeList.map((item,index) => (
                    <div >
                        <List item={item} toggleComplete={props.toggleComplete} deleteItem={props.deleteItem} index = {index}/>
                        
                    </div>
                ))
                :  activeList.filter(item => item.complete === false).map((item,index) => (
                    <div >
                        
                        <List item={item} toggleComplete={props.toggleComplete} deleteItem={props.deleteItem} index ={index}/>
                </div>
                ))
            }
            <Pages />
            </When>
        </div>
    )
}
export default Result;