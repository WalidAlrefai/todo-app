import { Button, Card, Elevation, Icon } from "@blueprintjs/core";
// import {useState} from 'react';
import { useContext } from 'react';
import {LoginContext} from '../../context/LoginContext';
import { When } from "react-if";

function List(props){
    const log = useContext(LoginContext);
    console.log('555555',props.index);
    return(
        <Card key={props.item.id} className="card-result" elevation={Elevation.THREE} interactive={true}>

                            <div className="card-buttons">
                                <div className="card-tag">
                                    <Button class="@ns-button" type="button" className={props.item.complete ? 'bp4-intent-success' : 'bp4-intent-danger'} onClick={() => props.toggleComplete(props.item.id)} value={props.item.complete.toString()}>{props.item.complete.toString()}</Button>
                                    <p> {props.item.assignee}</p>
                                </div>
                                <When condition={log.canDo('delete')}>
                                <Button className="delete" onClick={() => props.deleteItem(props.item.id)}><Icon icon="cross" size={20} /></Button>
                                </When>
                            </div>
                            <div className="card-text">
                                <p>{props.item.text}</p>
                                <p className="diff"><small>Difficulty: {props.item.difficulty}</small></p>
                            </div>
                        </Card>
    )
}
export default List;