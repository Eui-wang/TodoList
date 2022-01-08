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

    //현재 할일목록을 받아옴
    const changeTitleHandler = (event) => {
        if(event.currentTarget.value === '')
            setNewTitle(props.item.title)
        else
            setNewTitle(event.currentTarget.value)
    }
    const changeContentHandler = (event) => {
        setNewContent(event.currentTarget.value)
    }
    const changeWorkerHandler = (event) => {
        setNewWorker(event.currentTarget.value)
    }
    const selectedTaskTypeHandler = (event) => {
        if (selectedTaskType != null)
            setSelectedTaskType(event.currentTarget.value)
    }

    const moveToDiffTask = (i, taskType) => {
        let selectedTask = props.taskArr[props.name].at(i)
        let before = props.taskArr[props.name].filter((task, index) => index !== i)
        let after = props.taskArr[taskType]
        after.push(selectedTask)
        props.setTasks({
            ...props.taskArr,
            [props.name]: before,
            [taskType]: after,
        })
    }

    const onModifyTitle = (event) => {
        let tempArr = props.taskArr[props.name].map((task, index) => {
            if (props.index === index) {
                return {
                    ...task,
                    title: newTitle
                }
            }
            return task
        });
        props.setTasks({
            ...props.taskArr,
            [props.name]: tempArr,
        })
        setChangeTitle(false)
    }
    const onModifyContent = (event) => {
        let tempArr = props.taskArr[props.name].map((task, index) => {
            if (props.index === index) {
                return {
                    ...task,
                    content: newContent
                }
            }
            return task
        });
        props.setTasks({
            ...props.taskArr,
            [props.name]: tempArr,
        })
        setChangeContent(false)
    }
    const onModifyWorker = (event) => {
        let tempArr = props.taskArr[props.name].map((task, index) => {
            if (props.index === index) {
                return {
                    ...task,
                    worker: newWorker
                }
            }
            return task
        });
        props.setTasks({
            ...props.taskArr,
            [props.name]: tempArr,
        })
        setChangeWorker(false)
    }

    const inputHandler = (e) => {
        if(e==='title'){
            setChangeTitle(!onChangeTitle);
            setChangeContent(false);
            setChangeWorker(false);
        }
        else if(e==='content'){
            setChangeTitle(false);
            setChangeContent(!onChangeContent);
            setChangeWorker(false);
        }

        else if(e==='worker'){
            setChangeTitle(false);
            setChangeContent(false);
            setChangeWorker(!onChangeWorker);
        }

    }

    return (
        <Modal isOpen={props.showModify}
               onRequestClose={props.closeModify}
               className="modify-modal"
               overlayClassName="modify-modal-overlay"
               ariaHideApp={false}>
            <div className="top-wrapper">
                <div className="title-wrapper">
                    {onChangeTitle ?
                        <div className="input-title">
                            <input type="text"
                                   maxLength={10}
                                   defaultValue={newTitle ? newTitle : props.item.title}
                                   onChange={changeTitleHandler}
                            />
                            <div className="ok-btn" onClick={() => onModifyTitle()}>ok</div>
                        </div>
                        :
                        <>
                            {
                                props.item.title === '' ?
                                    <div className="title-data">No Title</div>
                                    :
                                    <div className="title-data">{props.item.title}</div>
                            }
                        </>}
                </div>
                <div className="close-btn" onClick={() => props.closeModify()}>
                    x
                </div>
            </div>
            <div className="detail-wrapper">
                <div className="detail-content">
                    <div className="content-wrapper">
                        <div className="content-name">
                            What To Do
                        </div>
                        {onChangeContent ?
                            <div className="input-content">
                                <input type="text"
                                       maxLength={10}
                                       defaultValue={newContent ? newContent : props.item.content}
                                       onChange={changeContentHandler}
                                />
                                <div className="ok-btn" onClick={() => onModifyContent()}>ok</div>
                            </div>
                            :
                            <>
                                {
                                    props.item.content === '' ?
                                        <div className="content-data">No Content</div>
                                        :
                                        <div className="content-data">{props.item.content}</div>
                                }
                            </>}
                    </div>
                    <div className="worker-wrapper">
                        <div className="worker-name">
                            Who
                        </div>
                        {onChangeWorker ?
                            <div className="input-worker">
                                <input type="text"
                                       maxLength={10}
                                       defaultValue={newWorker ? newWorker : props.item.worker}
                                       onChange={changeWorkerHandler}
                                />
                                <div className="ok-btn" onClick={() => onModifyWorker()}>ok</div>
                            </div>
                            :
                            <>
                                {
                                    props.item.worker === '' ?
                                        <div className="worker-data">No Who</div>
                                        :
                                        <div className="worker-data">{props.item.worker}</div>
                                }
                            </>}
                    </div>
                </div>
                <div className="btn-action">

                    <div className="modify-title-btn" onClick={() => inputHandler('title')}>
                        Edit Title
                    </div>
                    <div className="modify-content-btn" onClick={() => inputHandler('content')}>
                        Edit Content
                    </div>
                    <div className="modify-worker-btn" onClick={() => inputHandler('worker')}>
                        Edit Who
                    </div>

                </div>
            </div>
            <div className="btn-wrapper">
                <div className="move-to-btn">
                    <select name="move" onChange={selectedTaskTypeHandler}  onClick={() => {
                        moveToDiffTask(props.index, selectedTaskType);
                    }}>
                        <option defaultValue="none">Move to...</option>
                        {
                            props.name !== "Todo" &&
                            <option value="Todo">To do</option>
                        }
                        {
                            props.name !== "Doing" &&
                            <option value="Doing">Doing</option>
                        }
                        {
                            props.name !== "Done" &&
                            <option value="Done">Done</option>
                        }
                    </select>
                </div>
            </div>
        </Modal>
    );
}

export default DetailModal;