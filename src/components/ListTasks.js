import React, { useEffect, useState } from 'react'
import TaskBox from './TaskBox.js'
const ListTasks = ({tasks,setTasks}) => {
    const [todos,setTodos]=useState([]);
    const [inProgress,setInProgress]=useState([]);
    const [done,setDone]=useState([]);
    useEffect(() => {
        let fTodos=[];
        let fInProgress=[];
        let fDone=[];
       if(tasks){ 
            fTodos=tasks.filter(task=>task.status==="todo");
            fInProgress=tasks.filter(task=>task.status==="inProgress");
            fDone=tasks.filter(task=>task.status==="done");
        }
        setTodos(fTodos);
        setInProgress(fInProgress);
        setDone(fDone);
    }, [tasks])
    const statuses=['todo','inProgress',"done"];
  return <div className='flex gap-16 '>
      {statuses.map((status,index)=><TaskBox key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} setTodos={setTodos}
      inProgress={inProgress} setInProgress={setInProgress} done={done} setDone={setDone} />)}
  </div>
  
}

export default ListTasks