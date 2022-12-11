import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import TodoList, { ITodoItem } from './components/TodoList';

export interface IState {
  items: ITodoItem[];
}

const Home = () => {
  const [state, setState] = useState<IState>({ items: [] });

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('todoList') || '') as ITodoItem[];
      if (list) {
        setState({ items: list });
      }
    } catch (_) {}
  }, []);

  const updateTodoList = (list: ITodoItem[]) => {
    setState({ items: list });
    localStorage.setItem('todoList', JSON.stringify(list));
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
