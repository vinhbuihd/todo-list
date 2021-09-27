import React , {useState} from 'react';

function TodoForm({handleSubmitForm, update}) {
    const currentToday = new Date().toISOString().substring(0,10);

    const [inputText, setInputText] = useState(update? update.title : '');
    const [textArea, setTextArea] = useState(update? update.desc : '');
    const [date, setDate] = useState(update? update.date : currentToday);
    const [piority, setPiority] = useState(update? update.piority : 'normal');
   
    const onChangeTextArea = e => setTextArea(e.target.value)

    const handleChange = e => {
        const {type, value} = e.target;
        if (type === 'text') {
            setInputText(value)
        }
        if (type === 'date') {
            if (new Date(e.target.value) < (new Date(currentToday))) return;
            setDate(e.target.value)
        } 
    }

    const onChangeSelect = e => setPiority(e.target.value);
    const submitForm = e => {
        e.preventDefault();
        if (!inputText || /^\s*$/.test(inputText)) return;
        const formValue = {
            id: new Date().getTime(),
            title: inputText,
            desc: textArea,
            date: date,
            piority: piority,
        }
        handleSubmitForm(formValue)
        setInputText('')
        setTextArea('')
        setDate(currentToday)
        setPiority('normal')
    }

    return (
        <form id='todoForm' onSubmit={submitForm}>
        {
            update?.id ? (
                <>
                    <div>
                        <input 
                            className='todoForm-input'
                            type='text'
                            value={inputText}
                            placeholder='Update task ...'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='todoForm-textarea'>Description</label>
                        <textarea onChange={onChangeTextArea} id='todoForm-textarea' value={textArea}></textarea>
                    </div>
                    <div className='todoForm-date-piority-box'>
                        <div className='todoForm-half-box'>
                            <label htmlFor='todoForm-date'>Due Date</label>
                            <input type='date' id='todoForm-date' value={date} onChange={handleChange}/>
                        </div>
                        <div className='todoForm-half-box'>
                            <label htmlFor='todoForm-piority'>Piority</label>
                            <select id='todoForm-piority' value={piority} onChange={onChangeSelect}>
                                <option value='low'>Low</option>
                                <option value='normal'>Normal</option>
                                <option value='high'>High</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className='todoForm-btn' type='submit'>Update</button>
                    </div>
                </>
            ) 
            : (
                <>
                    <div>
                        <input 
                            className='todoForm-input'
                            type='text'
                            value={inputText}
                            placeholder='Add new task ...'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='todoForm-textarea'>Description</label>
                        <textarea onChange={onChangeTextArea} id='todoForm-textarea' value={textArea}></textarea>
                    </div>
                    <div className='todoForm-date-piority-box'>
                        <div className='todoForm-half-box'>
                            <label htmlFor='todoForm-date'>Due Date</label>
                            <input type='date' id='todoForm-date' value={date} onChange={handleChange}/>
                        </div>
                        <div className='todoForm-half-box'>
                            <label htmlFor='todoForm-piority'>Piority</label>
                            <select id='todoForm-piority' value={piority} onChange={onChangeSelect}>
                                <option value='low'>Low</option>
                                <option value='normal'>Normal</option>
                                <option value='high'>High</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className='todoForm-btn' type='submit'>Add</button>
                    </div>
                </>
            )
        }
        </form>
    );
}

export default TodoForm;