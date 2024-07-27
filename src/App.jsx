import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState(""); 
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
 
  const handleEdit = (id, todo) => {
    settodo(todo);
    const newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
  };

  const handleCheckbox = (e) => {
    const id = e.target.id;
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    settodos(updatedTodos);
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.length > 3) {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1; 
      const year = date.getFullYear();
      const newTodo = { id: uuidv4(), todo, isCompleted: false, day, month, year };
      settodos([...todos, newTodo]);
      settodo("");
    }
    console.log(todos)
  };

  const toggleChecked = () => {
    setshowFinished(!showFinished);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className='w-full h-full  pb-[50px]'>
      <div className="header py-[50px]">
        <div className="name font-header text-[#DA1E1E] text-[52px] flex justify-center text-shadow-custom-red">Mikasa</div>
        <div className="desc font-normal text-[30px] text-white flex justify-center">Your daily task reminder</div>
      </div>
      <div className="input flex sm:flex-row flex-col justify-center gap-5 sm:gap-10 items-center">
        <input 
          onChange={handleChange} 
          type="text" 
          className='w-[300px] h-[50px]  placeholder:text-[18px] shadow-custom-dark rounded-full outline-none pl-5' 
          placeholder='Type to add a task' 
          onKeyDown={handleKeyDown} 
          value={todo} 
        />
        <button 
          onClick={handleAdd} 
          disabled={todo.length < 3} 
          className='bg-[#DA1E1E] rounded-full shadow-custom-light h-[50px] w-[100px] font-normal text-[20px] text-white disabled:bg-[#E16969]'
        >
          Save
        </button>
      </div>
      <div className="todos flex justify-center mt-[50px] ">
        <div className="box sm:w-[60vw] w-[80vw] rounded-3xl  h-[50vh] bg-[#1B2F1A] bg-opacity-70 text-white overflow-y-auto">
          <div className="heading flex justify-center mt-4 font-normal text-[30px] mb-7">Your Tasks</div>
          {todos.length === 0 ? (
            <div className='font-normal opacity-70 text-[20px] flex justify-center items-center h-[20vh]'>No tasks to display</div>
          ) : (
            <div className='flex gap-2 mb-4 ml-5 font-normal'>
              <input onChange={toggleChecked} type="checkbox" checked={showFinished} name="" id="show" />
              <label htmlFor="show">Show Finished</label>
            </div>
          )}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="entry mb-4 ml-5 flex justify-between items-center font-normal">
                <div className="flex items-center gap-6">
                  <input 
                    onChange={handleCheckbox} 
                    type="checkbox" 
                    className='w-[30px] h-[30px]' 
                    name="" 
                    id={item.id} 
                    checked={item.isCompleted} 
                  />
                  <div className="data text-[24px] pr-6 leading-tight">
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                    <div className="date text-[18px] text-sm text-[#EBEAEA]">{`${item.day}-${item.month}-${item.year}`}</div>
                  </div>
                </div>
                <div className="buttons flex gap-4 justify-end mr-8">
                  <button onClick={() => { handleEdit(item.id, item.todo) }} className='edit w-[35px] h-[35px] flex justify-center items-center shadow-custom-light bg-[#DA1E1E] rounded-[7px]'>
                    <span className="material-symbols-outlined text-[25px]">edit</span>
                  </button>
                  <button onClick={() => { handleDelete(item.id) }} className='delete w-[35px] h-[35px] flex justify-center items-center shadow-custom-light bg-[#DA1E1E] rounded-[7px]'>
                    <span className="material-symbols-outlined text-[25px]">delete</span>
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

