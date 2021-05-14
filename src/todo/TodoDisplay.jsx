import React from 'react'
import TodoItem from './TodoItem'
import styles from './todo.module.css';
import { useTodos } from './TodoWrapper';


const TodoDisplay = () => {
    const { todos } = useTodos();
    return (
        <div className={styles.todoList}>
            {todos.map((todo, key) => <TodoItem todoText={todo} key={key} index={key} />)}
        </div>
    )
}

export default TodoDisplay
