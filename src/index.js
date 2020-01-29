import { setFilters } from './filters'
import { createTodo } from './todos'
import { renderTodos } from './views'

renderTodos()

document.querySelector('#filter-todos').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

document.querySelector('#new-todo-form').addEventListener('submit', (e) => {
    const text = e.target.elements.newTodo.value.trim()
    e.preventDefault()

    createTodo(text)
    renderTodos()
    e.target.elements.newTodo.value = ''
})