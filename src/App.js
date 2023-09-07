import React,{useEffect, useState} from 'react'
import CreateTask from './components/CreateTask.jsx'
import ListTasks from './components/ListTasks.js'
import { Toaster } from 'react-hot-toast'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import './App.css'
import './dist/output.css'
import axiosInstance from './axiosutil.js'
const App = () => {
  const [tasks,setTasks]=useState([]);
  const getTasks=()=>{
    axiosInstance({method:"GET",url:"/api/v1/"}).then((response)=>{
      const data=response.data.todos;
      // console.log(data);  
      setTasks([...data]);

    }).catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{

    getTasks();
      setTasks(JSON.parse(localStorage.getItem("tasks")));

  },[])
  console.log("tasks",tasks);
  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster/>
    <div className='w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16'>
    <CreateTask tasks={tasks} setTasks={setTasks}/>
    <ListTasks tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>

  )
}

export default App