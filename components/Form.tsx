import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ITodoItem } from './TodoList';

interface IFormProps {
  addTodoItem: (item: ITodoItem) => void;
}

const Form = (props: IFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.addTodoItem({
      _id: uuidv4(),
      title: title,
      isDone: false,
    });
    setTitle('');
  };

  return (
    <form className='form' onSubmit={handleSubmit} autoComplete='off'>
      <fieldset className='form form__fieldset'>
        <legend className='form form__legend'> Add your new Todo </legend>
        <input
          type='text'
          value={title}
          className='form form__input'
          placeholder='Enter your todo'
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required></input>
        <button type='submit' className='form form__button--submit' disabled={title.length < 1}>
          Add
        </button>
      </fieldset>
    </form>
  );
};

export default Form;
