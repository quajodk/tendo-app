/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styles from './todo.module.css';
import { useTodos } from './TodoWrapper';

const TodoForm = () => {
    const [input, setInput] = useState("");
    const { setTodos, selectedTodo, todos, setSelectedTodo } = useTodos();

    const handleAddTodo = () => {
        if (!input) { return };
        setTodos && setTodos(prev => [input, ...prev]);
        setInput("")
    }

    const handleEditTodo = () => {
        if (!input) { return };
        const list = [...todos];
        list[selectedTodo] = input;
        setTodos && setTodos(list);
        setInput("")
        setSelectedTodo(-1)
    }

    useEffect(() => {
        if (selectedTodo > -1) {
            setInput(todos[selectedTodo])
        }
    }, [selectedTodo]);

    return (
        <div className={styles.form}>
            <input value={input} onChange={e => setInput(e.target.value)} className={styles.formText} placeholder="Enter Something" />
            {selectedTodo < 0 && <button onClick={handleAddTodo} className={styles.btn}>Add</button>}
            {selectedTodo > -1 && <button onClick={handleEditTodo} className={styles.btn}>Edit</button>}
        </div>
    )
}

export default TodoForm
