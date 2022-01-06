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
        props.closeInsert()
        let tempArr = todoArray;
        tempArr.push({title:title, content:content, worker:worker, containerId: props.containerId});
        localStorage.setItem(props.name, JSON.stringify(tempArr))
        props.setTodoArr(tempArr)
        //local strage에서는 직접 수정을 할 수 없으므로 가져와서 수정후 덮어쓰기해야한다,
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
            <div className="form-wrapper">
                <form className="input-form" onSubmit={onSubmitHandler}>
                    <div className="input-wrapper">
                        <input type="text" label="Title" value={title} onChange={onTitleHandler}/>
                        <input type="text" label="Content" value={content} onChange={onContentHandler}/>
                        <input type="text" label="Who?" value={worker} onChange={onWorkerHandler}/>
                    </div>
                    <div className="button-wrapper">
                        <button onClick={() => onCreate()}>ok</button>
                        <button onClick={() => props.closeInsert()}>cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default InsertModal;