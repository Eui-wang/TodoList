import './App.scss';
import React, {useEffect, useState} from "react";
import TaskContainer from "./view/components/TaskContainer";
import Header from './view/components/Header'

function App() {
    //App.js 에서 Task배열을 초기화 해야 하는 이유는 Container에서 초기화시 각 상황별 task처리를 따로해줘야 한다.
    //TaskContainer에 객체배열을 보내주기만 하면 동작하는 방식은 똑같음
    const loadDataStorage = JSON.parse(localStorage.getItem("data")) ?? {
        Todo: [],
        Doing: [],
        Done: []
    }
    const [tasks, setTasks] = useState(loadDataStorage)

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(tasks))
    }, [tasks])
    return (
        <div id = "App">
            <div className="title">
                {/*<Header/>*/}
            </div>
            <div className="contents">
                <TaskContainer name="Todo" id={0} taskArray={tasks} setTasks={setTasks}/>
                <TaskContainer name="Doing" id={1} taskArray={tasks} setTasks={setTasks}/>
                <TaskContainer name="Done" id={2} taskArray={tasks} setTasks={setTasks}/>
            </div>
        </div>
    );
};

export default App;
