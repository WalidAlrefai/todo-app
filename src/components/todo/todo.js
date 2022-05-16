import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { Button, Card, Elevation } from "@blueprintjs/core";
import "./todo.scss"
import Result from '../result/result.js';

import { v4 as uuid } from 'uuid';

const ToDo = () => {

    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const { handleChange, handleSubmit } = useForm(addItem);

    function addItem(item) {
        console.log(item);
        item.id = uuid();
        item.complete = false;
        setList([...list, item]);
    }

    function deleteItem(id) {
        const items = list.filter(item => item.id !== id);
        setList(items);
    }

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
            <div className= "content">
                <form onSubmit={handleSubmit}>
                    <Card className="card-submit" elevation={Elevation.TWO}>
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
                    </Card>
                </form >
                <Result list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} incomplete={incomplete}/>
            </div>

        </div>
    );
};

export default ToDo;