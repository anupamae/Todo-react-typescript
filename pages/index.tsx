import React, { useState, useEffect } from 'react';

import { ITodoItem } from '../components/TodoList';

import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';

export interface IState {
  items: ITodoItem[];
}

const Home = () => {
  const [state, setState] = useState<IState>({ items: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/todo');
      setState(await res.json());
    };
    fetchData();
  }, []);

  const updateTodoList = (list: ITodoItem[]) => {
    const updateData = async () => {
      await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ items: list }),
      });
    };

    updateData();
    setState({ items: list });
  };

  return (
    <main className='main'>
      <Header />
      <TodoList todoList={state.items} updateTodoList={updateTodoList} />
      <Footer />
    </main>
  );
};

export default Home;
