import { getTodos, toggleTodo, removeTodo } from "./todos"
import { getFilters } from "./filters"

const renderTodos = () => {
    const todoList = getTodos()
    const filterList = getFilters()

    const todoEl = document.querySelector('#todo-list')
    const filteredTodos = todoList.filter((todo) => {
        const searchText = todo.text.toLowerCase().includes(filterList.searchText.toLowerCase())
        const hideComplete = !filterList.hideCompleted || !todo.completed

        return searchText && hideComplete
    })

    const todosLeft = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(todosLeft))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-dos to show'
        todoEl.appendChild(emptyMessage)
    }
}

const generateTodoDOM = (todo) => {
    const todoDiv = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')
    const todoCheckbox = document.createElement('input')
    const todoRemoveButton = document.createElement('button')

    // Setup todo checkbox
    todoCheckbox.setAttribute('type', 'checkbox')
    todoCheckbox.checked = todo.completed
    containerEl.appendChild(todoCheckbox)
    todoCheckbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoDiv.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoDiv.appendChild(containerEl)

    // Setup todo button
    todoRemoveButton.textContent = 'remove'
    todoRemoveButton.classList.add('button', 'button--text')
    todoDiv.appendChild(todoRemoveButton)
    todoRemoveButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoDiv
}

const generateSummaryDOM = (todosLeft) => {
    const todosLeftText = document.createElement('h2')
    todosLeftText.classList.add('list-title')

    const plural = todosLeft.length === 1 ? '' : 's'
    todosLeftText.textContent = `You have ${todosLeft.length} todo${plural} left`
    return todosLeftText
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }