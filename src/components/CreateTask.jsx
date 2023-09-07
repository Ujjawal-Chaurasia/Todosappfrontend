import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import axiosInstance from '../axiosutil';
import { toast } from 'react-hot-toast';
const CreateTask = ({tasks, setTasks}) => {
    const [task,setTask]=useState({
        id:"",
        title:"",
        status:"todo",
        description:"",
    })
    // console.log(task);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(task.title.length<3)return toast.error("title should have more than 3 char");
        if(task.description.length>150)return toast.error("description should have less than 150 char");
        
        if(task.description==="")task.description="write description";
        let list=[];
        if(tasks===null){
            list=[task];
        }else list=[...tasks,task];
        //this will be changed by database later
        // localStorage.setItem("tasks",JSON.stringify(list))
        axiosInstance({method:"POST",url:`/api/v1/create`,data:task}).then((response)=>{
            toast.success("task created");
          }).catch((error)=>{
            console.log(error);
          })

        setTasks(list)
        setTask({title:"",status:"todo",description:"",id:""})
        
    }
  return (
    <form className='flex flex-col py-1 ' onSubmit={handleSubmit}>
        <input type="text" className='border-2 border-black-100 bg-slate-100 rounded-md mr-4 h-4 w-64 px-1'
        value={task.title}
        required
        placeholder='title'
        onChange={(e)=>setTask({...task,id:uuidv4(),title:e.target.value})}
        />
        <input type="text" className='border-2 border-black-100 bg-slate-100 rounded-md mr-4 h-4 w-64 px-1'
        value={task.description}
        placeholder='description'
        onChange={(e)=>setTask({...task,description:e.target.value})}
        />        
        <button className='bg-cyan-500 rounded-md px-1 w-64 h-10 text-white '>Create</button>
    </form>
  )
}

export default CreateTask;