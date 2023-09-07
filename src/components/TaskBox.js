import React from 'react'
import toast from 'react-hot-toast';
import { useDrag, useDrop } from 'react-dnd';
import axiosInstance from '../axiosutil';
const TaskBox = ({status,tasks,setTasks,todos,inProgress,done}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop:(item)=>addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))
    let text="TODO";
    let bg="bg-green-500"
    let tasksToMap=todos;
    if(status==="inProgress"){
        text="INPROGRESS "
        bg="bg-purple-500"
        tasksToMap=inProgress
    }
    if(status==="done"){
        text="DONE"
        bg="bg-green-500"
        tasksToMap=done
    }
    const addItemToSection=(id)=>{
        console.log("dropped",id,status);
        axiosInstance({method:"PUT",url:`/api/v1/updatestatus/${id}`,data:{status:status}}).then((response)=>{
            console.log(response);
          }).catch((error)=>{
            console.log(error);
          })
        setTasks((prev)=>{
            const mTasks=prev.map(t=>{
                if(t.id===id){
                    return {...t,status:status}
                }else{
                    return t;
                }
            })
            return mTasks;
        })
        toast("Task status updated");
    }
  return (
    <div  ref={drop} className={`w-64 rounded-md p-2 ${isOver? "bg-slate-400": ""}`}>
        <Header text={text} bg={bg} count={tasksToMap.length} />
        {tasksToMap.length>0&& tasksToMap.map(task=><Task task={task} key={task.id} tasks={tasks} setTasks={setTasks}/>)}
    </div>
  )
}

export default TaskBox

const Header=({text,bg,count})=>{
   return (<div className={`${bg} flex item-center h-12 pl-4 rounded-md uppercase text-sm text-white`}> {text}<div className='ml-2 bg-white w5 h-5 text-black rounded-full flex item-center justify-center'>{count}</div></div>)
} 

const Task=({task,tasks,setTasks})=>{

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id:task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    const handleRemove=(id)=>{
        axiosInstance({method:"DELETE",url:`/api/v1/delete/${id}`}).then((response)=>{
            console.log(response);
          }).catch((error)=>{
            console.log(error);
          })
        const ftasks=tasks.filter(tsk=>tsk.id!==id)
        setTasks(ftasks);
        toast("Task removed",{icon:"👻"});
    }
    return (
        <div ref={drag} className={`relative flex flex-col flex-wrap p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging?"opacity-10":"opacity-100"}`} >
            <p>{task.title}</p>
            <p>{task.description}</p>
            
            <button className='absolute bottom-1 right-1 text-slate-400' onClick={()=>handleRemove(task.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
        </div>
    )

}