import React, {useState} from 'react';
import "./styles/InsertModal.scss"
import Modal from "react-modal"
function InsertModal(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [worker, setWorker] = useState('')
    const todoArray = JSON.parse(localStorage.getItem(props.name))
    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const onContentHandler = (event) => {
        setContent(event.currentTarget.value)
    }
    const onWorkerHandler = (event) => {
        setWorker(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault()
    }
    const onCreate = (event) => {
        let temp = props.taskArray[props.name];
        temp.push({title:title, content:content, worker:worker, containerId: props.containerId});
        props.setTasks({
            ...props.taskArray,
            [props.name] : temp,
        })
        props.closeInsert()
        setTitle('');
        setContent('');
        setWorker('');
    }
    return (
        <Modal
            isOpen={props.insertToggle}
            onRequestClose={props.closeInsert}
            className="insert-content"
            overlayClassName="insert-overlay"
            ariaHideApp={false}
        >
            <div className="title">Add Task</div>
            <div className="form-wrapper">
                <form className="input-form" onSubmit={onSubmitHandler}>
                    <div className="input-wrapper">
                        <div className="row-wrapper">
                            <div className="row-title">Title</div>
                            <input type="text" label="Title" value={title} maxLength={10} onChange={onTitleHandler}/>
                        </div>
                        <div className="row-wrapper">
                            <div className="row-title">Content</div>
                            <input type="text" label="Content" value={content} maxLength={10} onChange={onContentHandler}/>
                        </div>
                        <div className="row-wrapper">
                            <div className="row-title">Who</div>
                            <input type="text" label="Who?" value={worker} maxLength={10} onChange={onWorkerHandler}/>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <div className="btn ok" onClick={() => onCreate()}>ok</div>
                        <div className="btn cancel" onClick={() => props.closeInsert()}>cancel</div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default InsertModal;