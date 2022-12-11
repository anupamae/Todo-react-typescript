import React from 'react';

import Form from './Form';
import TodoCard from './TodoCard';

export interface ITodoItem {
  _id: string;
  title: string;
  isDone: boolean;
}

interface ITodoListProps {
  todoList: ITodoItem[];
  updateTodoList: (list: ITodoItem[]) => void;
}

const TodoList = (props: ITodoListProps) => {
  const addTodo = (item: ITodoItem) => {
    // Update React state
    props.updateTodoList([
      item,
      ...props.todoList
    ]);

    // Send update to backend.
    fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(item)
    })
  };

  const toggleDone = (item: ITodoItem) => {
    // Update React state
    props.updateTodoList(
      props.todoList.map((value) => {
        if (value._id === item._id) {
          return {
            _id: value._id,
            title: value.title,
            isDone: item.isDone,
          };
        } else {
          return value;
        }
      })
    );

    // Send update to backend.
    fetch(`/api/todo/${item._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(item),
    });
  };

  const removeTodoItem = (itemId: string) => {
    // Update React state
    const index = props.todoList.findIndex((value) => value._id === itemId);
    props.todoList.splice(index, 1);
    props.updateTodoList(props.todoList);

    // Send update to backend.
    fetch(`/api/todo/${itemId}`, {
      method: 'DELETE'
    })
  };

  return (
    <React.Fragment>
      <Form addTodoItem={addTodo} />
      <section className='todolist'>
        {props.todoList
          .filter((value) => value.isDone === false)
          .map((value) => (
            <TodoCard key={value._id} todoItem={value} toggleDone={toggleDone} removeTodoItem={removeTodoItem} />
          ))}
        {props.todoList
          .filter((value) => value.isDone === true)
          .map((value) => (
            <TodoCard key={value._id} todoItem={value} toggleDone={toggleDone} removeTodoItem={removeTodoItem} />
          ))}
      </section>
    </React.Fragment>
  );
};

export default TodoList;
