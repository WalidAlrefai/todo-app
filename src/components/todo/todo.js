import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { Button, Card, Elevation, Switch } from "@blueprintjs/core";
import "./todo.scss"
import Result from '../result/result.js';
import { When } from 'react-if';
// import { DisplayContext } from "../../context/DisplayCompleted";
import { UseSettings } from "../../context/Settings";
import {LoginContext} from '../../context/LoginContext';

import { v4 as uuid } from 'uuid';

const ToDo = () => {
    // const display = useContext(DisplayContext);
    const settings = useContext(UseSettings);
    const log = useContext(LoginContext);

    const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) ||[]);
    const [incomplete, setIncomplete] = useState([]);
    const { handleChange, handleSubmit } = useForm(addItem);
    function addItem(item) {
        item.id = uuid();
        console.log(item.id, '8888888');
        item.complete = false;
        console.log(item, "789");
        setList([...list, item]);
        localStorage.setItem('list', JSON.stringify([...list, item]));
    }
    const itemPerPageToggle = (pages) => {
        if (parseInt(pages) !== settings.itemsPerPage) {
            settings.setItemsPerPage(parseInt(pages));
        }
    }
    function deleteItem(id) {
        const items = list.filter((item) => item.id !== id);
        setList(items);
    }
    function toggleDisplay() {
        settings.setDisplay(!settings.display);
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
    }, [incomplete, list , settings.itemsPerPage]);

    return (
        <div className="todo">
            <header>
                <h1 className="title">To Do List: {log.loggedIn?incomplete : '0 '} items pending</h1>
            </header>
            <div className="content">
                <When condition={log.loggedIn}>
                <form onSubmit={handleSubmit}>
                    <Card className="card-submit" elevation={Elevation.TWO} interactive={true}>
                    <When condition={log.canDo('create')}>
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
                        </When>
                        <div className='displaySettings'>
                            <label>
                                <Switch
                                    checked={settings.display}
                                    label='show complete'
                                    onChange={toggleDisplay}
                                />
                            </label>
                            <label className="perpage">
                                <p> Item PerPage</p>
                                <input type="number" id="tentacles" name="tentacles" defaultValue={settings.itemsPerPage} onChange={(e) => itemPerPageToggle(e.target.value)} min="1" max="10"/>
                            </label>
                            <Button className="save" onClick={() => localStorage.setItem('settings', JSON.stringify(settings))}>Save Sittings</Button>
                        </div>
                    </Card>
                </form >
                <Result list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} incomplete={incomplete} />
                </When>
            </div>
        </div>
    );
};

export default ToDo;