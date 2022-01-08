import React, {useEffect, useState} from 'react';
import './styles/TaskContainer.scss'
import TaskItems from "./TaskItems";
import InsertModal from "./InsertModal";
//Task 상황별 다른 배열에서 데이터들을 가져옴, 렌더링해줌.
//데이터 관리는 Container 컴포넌트에서.
function TaskContainer(props) {
    const containerId = props.id
    // task 데이터들 초기값 세팅
    const [insertToggle, setInsertToggle] = useState(false)
    const openInsert = () => {
        setInsertToggle(true)
    }
    const closeInsert = () => {
        setInsertToggle(false)
    }

    return (
        <div id="TaskContainer">
            <div className="task-type">
                {props.name}
            </div>
            <div className="tasks">
                {props.taskArray[props.name].map((item,index) => (
                    <TaskItems item={item}
                               key={index}
                               index={index}
                               name={props.name}
                               taskArray={props.taskArray}
                               setTasks={props.setTasks}/>
                ))}
                <div className="input-insert">
                    {insertToggle && <InsertModal
                        name={props.name}
                        insertToggle={insertToggle}
                        closeInsert={closeInsert}
                        taskArray={props.taskArray}
                        setTasks={props.setTasks}
                        containerId={containerId}
                    />}
                </div>
            </div>
            <div className="add-button" onClick={openInsert}>
                <div className="add-btn-wrapper">
                    +
                </div>
            </div>

        </div>
    );
};

export default TaskContainer;