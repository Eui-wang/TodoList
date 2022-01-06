import React, {useState} from 'react';
import './styles/DetailModal.scss'
import Modal from "react-modal"

function DetailModal(props) {
    const [onChangeTitle, setChangeTitle] = useState(false)
    const [onChangeContent, setChangeContent] = useState(false)
    const [onChangeWorker, setChangeWorker] = useState(false)

    const [selectedTaskType, setSelectedTaskType] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')
    const [newWorker, setNewWorker] = useState('')

    const todoArray = JSON.parse(localStorage.getItem(props.name))
    console.log(todoArray)
    //현재 할일목록을 받아옴
    console.log(selectedTaskType)
    const changeTitleHandler = (event) => {
        setNewTitle(event.currentTarget.value)
    }
    const changeContentHandler = (event) => {
        setNewContent(event.currentTarget.value)
    }
    const changeWorkerHandler = (event) => {
        setNewWorker(event.currentTarget.value)
    }
    const selectedTaskTypeHandler = (event) => {
        if(selectedTaskType != null)
            setSelectedTaskType(event.currentTarget.value)
    }

    const moveToDiffTask = (i, taskType) => {
        let selectedTask = todoArray.at(i)
        console.log(selectedTask)
        console.log(JSON.parse(localStorage.getItem(taskType)))
        let selectedArray = JSON.parse(localStorage.getItem(taskType))
        console.log(selectedArray)
        selectedArray.push(selectedTask)
        localStorage.setItem(taskType, JSON.stringify(selectedArray))
        props.deleteItem(i)
    }

    const onModifyTitle = (event) => {
        let tempArr = todoArray.map((task, i) => {
            if (props.index === i) {
                return {
                    ...task,
                    title: newTitle
                }
            }
            return task
        });
        //props.setTaskArr(tempArr)
        localStorage.setItem(props.name, JSON.stringify(tempArr))
        setChangeTitle(false)
        setNewTitle('')
    }
    const onModifyContent = (event) => {
        let tempArr = todoArray.map((task, i) => {
            if (props.index === i) {
                return {
                    ...task,
                    content: newContent
                }
            }
            return task
        });
        props.setTodoArr(tempArr)
        localStorage.setItem(props.name, JSON.stringify(tempArr))
        setChangeContent(false)
        setNewContent('')
    }
    const onModifyWorker = (event) => {
        let tempArr = todoArray.map((task, i) => {
            if (props.index === i) {
                return {
                    ...task,
                    worker: newWorker
                }
            }
            return task
        });
        props.setTodoArr(tempArr)
        localStorage.setItem(props.name, JSON.stringify(tempArr))
        setChangeWorker(false)
        setNewWorker('')
    }

    return (
        <Modal isOpen={props.showModify}
               onRequestClose={props.closeModify}
               className="modify-modal"
               overlayClassName="modify-modal-overlay"
               ariaHideApp={false}>
            <div className="top-wrapper">
                <div className="title-wrapper">
                    {onChangeTitle ? <div className="input-title">
                        <input type="text"
                               value={newTitle}
                               onChange={changeTitleHandler}
                        />
                        <button onClick={() => onModifyTitle()}>ok</button>
                    </div> : <div className="title-data">{props.item.title}</div>}
                </div>
                <div className="close-btn" onClick={() => props.closeModify()}>
                    x
                </div>
            </div>
            <div className="detail-wrapper">
                <div className="detail-content">
                    <div className="content-wrapper">
                        <div className="content-name">
                            업무 :
                        </div>
                        {onChangeContent ? <div className="input-content">
                            <input type="text"
                                   value={newContent}
                                   onChange={changeContentHandler}
                            />
                            <button onClick={() => onModifyContent()}>ok</button>
                        </div> : <div className="content-data">{props.item.content}</div>}
                    </div>
                    <div className="worker-wrapper">
                        <div className="worker-name">
                            작업자 :
                        </div>
                        {onChangeWorker ? <div className="input-worker">
                            <input type="text"
                                   value={newWorker}
                                   onChange={changeWorkerHandler}
                            />
                            <button onClick={() => onModifyWorker()}>ok</button>
                        </div> : <div className="worker-data">{props.item.worker}</div>}
                    </div>
                </div>
                <div className="btn-action">
                    <div className="move-to-btn">
                        <form >
                            <select name="move" onChange={selectedTaskTypeHandler}>
                                <option defaultValue="none" >Move to...</option>
                                <option value="Todo">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                            <button onClick={() => moveToDiffTask(props.index, selectedTaskType)}>ok</button>
                        </form>
                    </div>
                    <div className="modify-title-btn" onClick={() => setChangeTitle(!onChangeTitle)}>
                        제목 수정
                    </div>
                    <div className="modify-content-btn" onClick={() => setChangeContent(!onChangeContent)}>
                        업무 수정
                    </div>
                    <div className="modify-worker-btn" onClick={() => setChangeWorker(!onChangeWorker)}>
                        작업자 수정
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default DetailModal;