import { ITodoItem } from './TodoList';

interface ITodoCardProps {
  todoItem: ITodoItem;
  toggleDone: (itemId: string) => void;
  removeTodoItem: (itemId: string) => void;
}

const TodoCard = (props: ITodoCardProps) => {
  const handleToggle = () => {
    props.toggleDone(props.todoItem._id);
  };

  const handleRemove = () => {
    if (props.todoItem.isDone) {
      props.removeTodoItem(props.todoItem._id);
    }
  };

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      handleToggle();
    } else if (event.key === 'Delete') {
      handleRemove();
    }
  };

  return (
    <article
      onKeyUp={handleKeyUp}
      onClick={handleToggle}
      tabIndex={0}
      className={'todo todo__article todo--toggle-completed' + (props.todoItem.isDone ? ' todo--completed' : '')}>
      <h4 className='todo todo__h4' onClick={handleToggle}>
        {props.todoItem.title}
      </h4>
      {props.todoItem.isDone && <button className='todo todo__button--remove' onClick={handleRemove} />}
    </article>
  );
};

export default TodoCard;
