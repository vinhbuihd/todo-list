import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import './AppReponsive.css';



function App() {
  const [tasks, setTasks] = useState(() => {
    const initialTask = JSON.parse(localStorage.getItem('TASK-STORE')) || [];
    return initialTask;
  });
  

  const addTask = (formValue) => {
    const newTasks = [formValue, ...tasks];
    newTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    setTasks(newTasks);
    localStorage.setItem('TASK-STORE', JSON.stringify(newTasks))
  }

  const updateTask = (formValue, updateID) => {
    const newTasks = [...tasks].map(task => task.id === updateID ? formValue : task);
    newTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    setTasks(newTasks);
    localStorage.setItem('TASK-STORE', JSON.stringify(newTasks))
  }

  const removeTask = removeID => {
    const newTasks = [...tasks].filter(task => task.id !== removeID);
    setTasks(newTasks);
    localStorage.setItem('TASK-STORE', JSON.stringify(newTasks))
  }

  const removeTaskCheckbox = IDs => {
    const newTasks = [...tasks].filter(task => !IDs.includes(task.id.toString()))
    setTasks(newTasks)
    localStorage.setItem('TASK-STORE', JSON.stringify(newTasks))
  }

  // console.log(inital)

  return (
    <div className='app'>
      <div className='app-newtask'>
        <h2 className='app-heading'>New Task</h2>
        <TodoForm handleSubmitForm={addTask}/>
      </div>
      <div className='app-todolist'>
        <h2 className='app-heading'>To Do List</h2>
        <TodoList 
          tasks={tasks} 
          handleRemove={removeTask} 
          handleUpdate={updateTask} 
          removeCheckbox={removeTaskCheckbox}
        />
      </div>
    </div>
  );
}

export default App;

