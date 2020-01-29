import uuidv4 from 'uuid/v4'

let todos = []

const loadTodos = () => {
    const todosJSON = localStorage.getItem('todosData')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

const saveTodos = () => {
    localStorage.setItem('todosData', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            text,
            completed: false
        })

        saveTodos()
    }
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

todos = loadTodos()

export { getTodos, createTodo, removeTodo, toggleTodo }