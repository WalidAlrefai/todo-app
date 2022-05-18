import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { Button, Card, Elevation, Switch } from "@blueprintjs/core";
import "./todo.scss"
import Result from '../result/result.js';
import { DisplayContext } from "../../context/DisplayCompleted";
// import { UseSettings } from "../../context/Settings";

import { v4 as uuid } from 'uuid';

const ToDo = () => {
    const display = useContext(DisplayContext);
    // const settings = useContext(UseSettings);

    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const { handleChange, handleSubmit } = useForm(addItem);
    function addItem(item) {
        item.id = uuid();
        console.log(item.id, '8888888');
        item.complete = false;
        console.log(item, "789");
        setList([...list, item]);
    }
    // const itemPerPageToggle = (pages) => {
    //     if (pages !== settings.itemsPerPage) {
    //         settings.itemsPerPage = pages
    //     }
    // }
    function deleteItem(id) {
        const items = list.filter((item, index) => index !== id);
        setList(items);
    }
    function toggleDisplay() {
        display.setDisplay(!display.display);
    }

    // function toggleComplete(id) {
    //     console.log(list , 'list');
    //     const items = list.map((item,index)=> {
    //         console.log(id ,"id");
    //         console.log(index ,"index");

    //         if (index === id) {
    //             item.complete = !item.complete;
    //         }
    //         return item;
    //     });
    //     console.log("items", items);
    //     setList(items);
    // }
    function toggleComplete(id) {

        const items = list.map(item => {
            if (item.id === id) {
                item.complete = !item.complete;
            }
            return item;
        });

        setList(items);

    }

    useEffect(() => {
        let incompleteCount = list.filter(item => !item.complete).length;
        setIncomplete(incompleteCount);
        document.title = `To Do List: ${incomplete}`;
    }, [incomplete, list]);

    return (
        <div className="todo">
            <header>
                <h1 className="title">To Do List: {incomplete} items pending</h1>
            </header>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <Card className="card-submit" elevation={Elevation.TWO} interactive={true}>
                        <h2>Add To Do Item</h2>
                        <label className="labels">
                            <p>To Do Item</p>
                            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
                        </label>
                        <label className="labels">
                            <p>Assigned To</p>
                            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                        </label>
                        <label className="labels">
                            <p>Difficulty</p>
                            <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
                        </label>
                        <label className="labels">
                            <Button type="submit">Add item</Button>
                        </label>
                        <div className='displaySettings'>
                            <label>
                                <Switch
                                    checked={display.display}
                                    label='show complete'
                                    onChange={toggleDisplay}
                                />
                            </label>
                            {/* <label>
                                <input type="number" id="tentacles" name="tentacles"
                                    min="1" max="10" onChange={itemPerPageToggle}/>
                            </label> */}
                        </div>
                    </Card>
                </form >
                <Result list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} incomplete={incomplete} />
            </div>
        </div>
    );
};

export default ToDo;