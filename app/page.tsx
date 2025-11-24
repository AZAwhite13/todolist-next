
'use client'
import { useState, useEffect } from 'react'
import './globals.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (): void => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="todo-header">
          <h1 className="todo-title">Todo List</h1>
        </div>

        <div className="todo-card">
          <div className="todo-input-section">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Добавить задачу..."
              className="todo-input"
            />
            <button onClick={addTodo} className="todo-add-button">
              Добавить
            </button>
          </div>

          {totalCount > 0 && (
            <div className="todo-stats">
              Выполнено: {completedCount} из {totalCount}
            </div>
          )}

          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="todo-empty">
                <div className="todo-empty-icon">📝</div>
                <p>Нет задач</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                  <div 
                    className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed && '✓'}
                  </div>
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="todo-delete"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}