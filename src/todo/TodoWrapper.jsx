import React, { createContext, useContext, useState, useEffect } from 'react';

//create the context
const TodoContext = createContext();

//create the todo middleware for the children to use
export const useTodos = () => useContext(TodoContext);

const TodoWrapper = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const _todosCollectedAsString = localStorage.getItem("todos-elx");
        return JSON.parse(_todosCollectedAsString || "[]");
    });
    const [selectedTodo, setSelectedTodo] = useState(-1);

    useEffect(() => {
        localStorage.setItem("todos-elx", JSON.stringify(todos));
    }, [todos])


    const removeTodo = id => {
        const list = [...todos]
        const index = id;
        if (index > -1) {
            list.splice(index, 1);
            setTodos(list);
        }
    }


    return (
        <TodoContext.Provider value={{ todos, setTodos, removeTodo, setSelectedTodo, selectedTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoWrapper
