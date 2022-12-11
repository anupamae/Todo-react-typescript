import React from 'react';

import Form from './Form';
import TodoCard from './TodoCard';

export interface ITodoItem {
  id: string;
  title: string;
  isDone: boolean;
}

interface ITodoListProps {
  todoList: ITodoItem[];
  updateTodoList: (list: ITodoItem[]) => void;
}

const TodoList = (props: ITodoListProps) => {
  const addTodo = (item: ITodoItem) => {
    props.todoList.unshift(item);
    props.updateTodoList(props.todoList);
  };

  const toggleDone = (itemId: string) => {
    props.updateTodoList(
      props.todoList.map((value) => {
        if (value.id === itemId) {
          return {
            id: value.id,
            title: value.title,
            isDone: !value.isDone,
          };
        } else {
          return value;
        }
      })
    );
  };

  const removeTodoItem = (itemId: string) => {
    const index = props.todoList.findIndex((value) => value.id === itemId);
    props.todoList.splice(index, 1);
    props.updateTodoList(props.todoList);
  };

  return (
    <React.Fragment>
      <Form addTodoItem={addTodo} />
      <section className='todolist'>
        {props.todoList
          .filter((value) => value.isDone === false)
          .map((value) => (
            <TodoCard key={value.id} todoItem={value} toggleDone={toggleDone} removeTodoItem={removeTodoItem} />
          ))}
        {props.todoList
          .filter((value) => value.isDone === true)
          .map((value) => (
            <TodoCard key={value.id} todoItem={value} toggleDone={toggleDone} removeTodoItem={removeTodoItem} />
          ))}
      </section>
    </React.Fragment>
  );
};

export default TodoList;
