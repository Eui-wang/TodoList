import './App.scss';
import React, {useEffect, useState} from "react";
import TaskContainer from "./view/components/TaskContainer";
import Header from './view/components/Header'

function App() {
    //App.js 에서 Task배열을 초기화 해야 하는 이유는 Container에서 초기화시 각 상황별 task처리를 따로해줘야 한다.
    //TaskContainer에 객체배열을 보내주기만 하면 동작하는 방식은 똑같음

    const [todo, setTodo] = useState([])
    const [doing, setDoing] = useState([])
    const [done, setDone] = useState([])
    const [tasks, setTasks] = useState({todo, doing, done})
    // //const [todoArr, setTodoArr] = useState(JSON.parse(localStorage.getItem(props.name)))
    // //초기 데이터 저장
    // useEffect(() => {
    //     window.addEventListener('storage', (e) => {
    //         // When local storage changes, dump the list to
    //         // the console.
    //         console.log(e)
    //         // console.log(JSON.parse(localStorage.getItem(props.name)));
    //     });
    // }, [])
    // const todoList = tasks.map((task, index) => {
    //     return {
    //         ...task,
    //         id: index
    //     }
    // }).filter(task => task.containerId === 0)
    // const doingList = tasks.filter(task => task.containerId === 1)
    // const doneList = tasks.filter(task => task.containerId === 2)
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
