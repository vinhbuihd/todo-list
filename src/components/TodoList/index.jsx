import React, { useState } from 'react';
import TodoBullAction from '../TodoBullAction';
import TodoForm from '../TodoForm';

function TodoList({ tasks, handleRemove, handleUpdate ,removeCheckbox }) {
    const [checkbox, setCheckbox] = useState([]);
    const [filterText, setFilterText] = useState('')
    const taskList = [];
    const [update, setUpdate] = useState({
        id: null,
        title: '',
        desc: '',
        date: '',
        piority: '',
    })
    const removeTask = removeID => handleRemove(removeID);
    
    const updateTask = task => {
        setUpdate({
            id: task.id, 
            title: task.title,
            desc: task.desc,
            date: task.date,
            piority: task.piority,
        })
    }

    const updateForm = (formValue) => {
        handleUpdate(formValue, update.id);
        setUpdate({
            id: null,
            title: '',
            desc: '',
            date: '',
            piority: '',
        })
    }
    
    const handleChangeCheckbox = e => {
        const newCheckBox = [...checkbox].filter(item => item.id !== e.target.value);
        const item = {
            id: e.target.value,
            isChecked: e.target.checked,
        }
        if (item.isChecked === true) {
            newCheckBox.push(item)
        }
        setCheckbox(newCheckBox);
    }
    
    const removeAllChecked = () => {
        const IDchecked = [...checkbox].map(item => item.id);
        removeCheckbox(IDchecked);
        setCheckbox([]);
    }

    const handleChangeFilterText = e => {
        setFilterText(e.target.value);
    }

    tasks.forEach(task => {
        if (task.title.toLowerCase().indexOf(filterText.trim().toLowerCase()) === -1) return;
        taskList.push(task)
    })

    return (
        <>
        <input 
            className='todo-search' 
            type='text' 
            placeholder='Search ...' 
            onChange={handleChangeFilterText}
        />
        <ul className='todo-list'>
            {taskList.map(task => (
                <li key={task.id} className='todo-item'>
                    <div className='todo-item-box'>
                        <div className='todo-titlebox'>
                            <input 
                                id={task.id} 
                                className='todo-checkbox' 
                                type='checkbox' 
                                onChange={handleChangeCheckbox} 
                                value={task.id}
                            />
                            <label htmlFor={task.id} className='todo-title'>{task.title}</label>
                        </div>
                        <div className='todo-btnbox'>
                            <button className='todo-btn blue' onClick={() => updateTask(task)}>Detail</button>
                            <button className='todo-btn red' onClick={() => removeTask(task.id)}>Remove</button>
                        </div>
                    </div>
                    {
                        update.id === task.id 
                        ? <div className='todo-update'>
                        <TodoForm handleSubmitForm={updateForm} update={update}/> 
                        </div>
                        : ''
                    }
                </li>
            ))}
        </ul>
        {
            checkbox.map(item => item.isChecked 
                ? <TodoBullAction removeAllChecked={removeAllChecked}/> 
                : '')
        }
        </>
    );
}

export default TodoList;