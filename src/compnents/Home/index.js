import React, {useState , useEffect}  from "react";
import {TextField} from "@mui/material";
import "bootstrap/dist/css/bootstrap.css"; 

const Index=()=>{
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isAdd,setIsAdd]=useState(true)
  const [itemsToDelete, setItemsToDelete]=useState([])
  const [updateId,setUpdateId]=useState()
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function fnHandleTask(e) {
    setTodo(e.target.value);
  }
   const fnAddTask=(e)=>{
    if (todo !== "") {
      let item=todos.find((obj)=>obj.text==todo)
      if(item){
        alert('DUPLICATE ENETRY')
        return;
      }
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }
    setTodo("");
   }
   const fnUpdateBtnClick=(id)=>{
      let item=todos.find((obj)=>obj.id==id)
      setTodo(item.text)
      setUpdateId(id)
      setIsAdd(false)
   }
   const fnUpdateTask=()=>{
     if(todo != ''){
      let obj=todos.find((obj)=>obj.text==todo)
      let item=todos.find((obj)=>obj.id==updateId)
    
      if(obj && item.text != todo){
        alert('DUPLICATE ENETRY')
        return;
      }
      item.text=todo
     localStorage.setItem("todos", JSON.stringify(todos));
     setIsAdd(true)
     setTodo("");
     }
   }
   
   const fnDeleteBtnClick=(id)=>{
     if(itemsToDelete.length == 0){
       alert('No items selected to delete')
       return;
     }
     let _todos=Object.assign([],todos)
     itemsToDelete.forEach((id)=>{
         let _index=_todos.findIndex((obj)=>obj.id==id)
         _todos.splice(_index,1)
     })
     setTodos(_todos)
     setItemsToDelete([])
   }

   const fnChange=(id,eve)=>{
      const {checked}= eve.target
      if(checked){
         setItemsToDelete([...itemsToDelete,id])
      }else{
          let _itemsToDelete=itemsToDelete;
          let _index=_itemsToDelete.indexOf(id)
          _itemsToDelete.splice(_index,1)
          setItemsToDelete(_itemsToDelete);
      }
   }
  
  return (
    <div className='container text-center'>
      <h1 className="mb-5">To-Do List!</h1>
      <TextField value={todo} id="filled-basic" label="Please Enter New Task" variant="filled" className="me-5 mb-5" onChange={fnHandleTask} />
      {
      isAdd ? 
      <button className="btn btn-primary mt-3 mb-5" onClick={fnAddTask}>Add Task</button>
      :
      <button className="btn btn-primary mt-3 mb-5" onClick={fnUpdateTask}>Update Task</button>
      }
      <div className="row">
      
        <table border="2px solid red">
          <tr>
            <td>Select</td>
            <td>Task</td>
            <td>Action</td>
          </tr>
        {todos.map((item) => (
            <tr>
            <td><input onChange={(eve)=>fnChange(item.id,eve)} type="checkbox" /></td>
            <td className="ms-5" key={item.id} >{item.text}</td>
            <td><button className="btn btn-primary me-3 mb-2 ms-2 " onClick={()=>fnUpdateBtnClick(item.id)} >Update</button></td>
            </tr>      
        ))}
      {todos.length != 0 &&   <tr>
          <td colSpan={3}><button className="btn btn-danger mb-2" onClick={()=> fnDeleteBtnClick()}>Delete Items</button></td>
        </tr>
}
      </table>
      
      </div>

    </div>
  );
}

export default Index;
