import { useState, useEffect } from 'react'
import { TbEdit } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    < >
	 
     
       <div className="  mx-3 md:container md:mx-auto my-5 rounded-3xl p-5 bg-pink-200 min-h-[80vh] md:w-1/2 ">
        <h1 className='font-bold text-center text-xl'>TODO LISTS</h1>
        
         <div className="addTodo p-5 bg-pink-400 my-5 rounded-3xl flex flex-col gap-4">
          <h2 className='text-center font-bold'>ADD A TODO</h2>
          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-600 hover:bg-purple-800 disabled:bg-purple-400 p-2 py-1 text-sm font-bold text-white rounded-full'>Save</button>
         </div>
         
         <h2 className='px-5 text-right font-semibold'><input className='my-5 gap-5' onChange={toggleFinished} type="checkbox" checked={showFinished} />SHOW COMPLETED</h2>
         
         <h2 className='text-center font-bold my-3'>YOUR TODOS</h2>
         
         <div className="todos">
          {todos.length ===0 && <div className='my-20 text-center font-bold'>NO TODOS TO DISPLAY!!!</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex md:w-1/2 my-3 justify-between"}>
            <div className='flex gap-5 '> 
            <input className=' ' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-pink-600 hover:bg-pink-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><TbEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-pink-600 hover:bg-pink-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
            </div> 
          </div>
          })}
         </div>
         
        
       
       </div>
    </>
  )
}

export default App
