import React from 'react';

function TodoBullAction({removeAllChecked}) {

    return(
        <div className='todo-bullAction-box'>
            <div className='todo-bullAction-title'>Bull Action:</div>
            <div className='todo-bullAction-btn'>
                <button className='todo-bullAction-done-btn todo-btn'>Done</button>
                <button onClick={removeAllChecked} className='todo-bullAction-remove-btn todo-btn'>Remove</button>
            </div>
        </div>
    )
}

export default TodoBullAction;