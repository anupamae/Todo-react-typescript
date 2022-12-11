import { ITodoItem } from './TodoList';

interface ITodoCardProps {
  todoItem: ITodoItem;
  toggleDone: (item: ITodoItem) => void;
  removeTodoItem: (itemId: string) => void;
}

const TodoCard = (props: ITodoCardProps) => {
  const handleToggle = (event: any) => {
    event.stopPropagation();
    props.toggleDone({
      ...props.todoItem, 
      isDone: !props.todoItem.isDone
    });
  };

  const handleRemove = (event: any) => {
    event.stopPropagation();
    if (props.todoItem.isDone) {
      props.removeTodoItem(props.todoItem._id);
    }
  };

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      handleToggle(event);
    } else if (event.key === 'Delete') {
      handleRemove(event);
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
