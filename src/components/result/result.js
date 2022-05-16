import { Button, Card, Elevation, Icon } from "@blueprintjs/core";
import { useState, useContext, useEffect } from "react";
import { UseSettings } from '../../context/Settings';
function Result(props) {
    const settings = useContext(UseSettings);
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
    }, [settings.itemsPerPage, settings.show, props.list, props.incomplete]);
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
    return (
        <div className="result">
            {
                activeList.map(item => (
                    <div key={item.id}>
                        <Card className="card-result" elevation={Elevation.TWO}>
                            <div className="card-buttons">
                                <div className="card-tag">
                                    <Button className={item.complete ? 'bp3-intent-success' : 'bp3-intent-danger'} onClick={() => props.toggleComplete(item.id)}>{item.complete.toString()}</Button>
                                    <p> {item.assignee}</p>
                                </div>
                                <Button className="delete" onClick={() => props.deleteItem(item.id)}><Icon icon="cross" size={20} /></Button>
                            </div>
                            <div className="card-text">
                                <p>{item.text}</p>
                                <p className="diff"><small>Difficulty: {item.difficulty}</small></p>
                            </div>
                        </Card>
                    </div>
                ))
            }
            <Pages />
        </div>
    )
}
export default Result;