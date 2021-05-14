import React, { useState } from 'react'
import TodoDisplay from './TodoDisplay'
import TodoForm from './TodoForm'
import TodoWrapper from './TodoWrapper'

const Todo = () => {
    const [todos, setTodos] = useState([])
    return (
        <TodoWrapper>
            <div>
                <TodoForm setTodo={setTodos} />
                <TodoDisplay todos={todos} />
            </div>
        </TodoWrapper>
    )
}

export default Todo
