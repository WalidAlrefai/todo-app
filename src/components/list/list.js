import { Button, Card, Elevation, Icon } from "@blueprintjs/core";
// import {useState} from 'react';

function List(props){
    // const [state, setState] = useState(false);
    // function toggle(){
    //     setState(!state);
    // }
    console.log('555555',props.index);
    return(
        <Card key={props.item.id} className="card-result" elevation={Elevation.THREE} interactive={true}>

                            <div className="card-buttons">
                                <div className="card-tag">
                                    <Button class="@ns-button" type="button" className={props.item.complete ? 'bp3-intent-success' : 'bp3-intent-danger'} onClick={() => props.toggleComplete(props.item.id)} value={props.item.complete.toString()}>{props.item.complete.toString()}</Button>
                                    <p> {props.item.assignee}</p>
                                </div>
                                <Button className="delete" onClick={() => props.deleteItem(props.item.id)}><Icon icon="cross" size={20} /></Button>
                            </div>
                            <div className="card-text">
                                <p>{props.item.text}</p>
                                <p className="diff"><small>Difficulty: {props.item.difficulty}</small></p>
                            </div>
                        </Card>
    )
}
export default List;