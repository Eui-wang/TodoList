import React, {useState} from 'react';
import './styles/TaskItems.scss'
import {BsPencilSquare, BsTrash} from "react-icons/bs"
import DetailModal from "./DetailModal";
//이 컴포넌트에서는 객체에 저장되어있는 데이터들을 어떻게 나타낼지 결정함.
//상위컴포넌트에서 이 컴포넌트에 전달하는 값은 배열이 아닌 객체.
//배열에서 꺼내온것을 전달한 것.
//눌렀을때 상세정보 나오게 구현
function TaskItems(props) {
    const todoArray = JSON.parse(localStorage.getItem(props.name))
    const [showModify, setShowModify] = useState(false)
    const openModify = () => {
        setShowModify(true)
    }
    const closeModify = () =>{
        setShowModify(false)
    }
    const deleteItem = key => {
        console.log(todoArray)
        const tempArr = todoArray.filter(item => todoArray.indexOf(item) !== key)
        console.log(tempArr)
        localStorage.setItem(props.name, JSON.stringify(tempArr))
        props.setTodoArr(tempArr)
        //console.log(JSON.parse(localStorage.getItem(props.name)))
    }
    return (
        <div id="TaskItems">
            <div className="card-wrapper">
                <div className="row-wrapper">
                    <div className="item-title">{props.item.title}</div>
                    <div className="btn-wrapper">
                        <div className="modify-btn">
                            <BsPencilSquare onClick={openModify} size="20"/>
                        </div>
                        <div>
                            {showModify && <DetailModal
                                name={props.name}
                                item={props.item}
                                index={props.index}
                                setTasks={props.setTasks}
                                setTodoArr={props.setTodoArr}
                                taskArr={props.taskArray}
                                closeModify={closeModify}
                                showModify={showModify}
                                deleteItem={deleteItem}
                            />}
                        </div>
                        <div className="delete-btn">
                            <BsTrash size="20" onClick={() => deleteItem(props.index)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default TaskItems;