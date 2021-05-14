import React from 'react';
import styles from './todo.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useTodos } from './TodoWrapper';

const TodoItem = ({ todoText, index }) => {
    const { removeTodo, setSelectedTodo } = useTodos();
    const onTrashClicked = () => {
        removeTodo(index)
    }

    const onEditClicked = () => {
        setSelectedTodo(index)
    }

    return (
        <div className={styles.todo}>
            <div className={styles.todoItem}>
                {todoText}
            </div>
            <div onClick={onTrashClicked} className={styles.trashBtn}>
                <FaTrash color="#fff" />
            </div>
            <div onClick={onEditClicked} className={styles.editBtn}>
                <FaEdit color="#fff" />
            </div>
        </div>
    )
}

export default TodoItem
