import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';

import { ITodoItem } from '../components/TodoList';

import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';

export interface IState {
  items: ITodoItem[];
}

const Home: NextPage = () => {
  // Declare app state
  const [state, setState] = useState<IState>({ items: [] });

  useEffect(() => {
    fetch('/api/todo')
      .then((res) => res.json())
      .then((res) => {
        setState(res);
      });
  }, []);

  const updateTodoList = (list: ITodoItem[]) => {
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
