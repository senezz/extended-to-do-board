function generateId() {
    return crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now() + '-' + Math.random().toString(36).slice(2)
}

class Task {
    constructor(text) {
        this.id = generateId()
        this.text = text.trim()
        this.createdAt = Date.now()
    }

    updateText(newText) {
        if (newText.trim() === '') return;
        this.text = newText.trim()
    }
}

class Column {
    constructor(title) {
        this.id = generateId()
        this.title = title.trim()
        this.tasks = []
    }

    addTask(text) {
        if (!text.trim()) return;
        const task = new Task(text)
        this.tasks.push(task)
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId)
    }

    getTask(taskId) {
        return this.tasks.find(t => t.id === taskId)
    }

    moveTaskTo(targetColumn, taskId) {
        const task = this.getTask(taskId)
        if (!task) return
        this.removeTask(taskId)
        targetColumn.tasks.push(task)
    }

    sortTasksByDate() {
        this.tasks.sort((a, b) => a.createdAt - b.createdAt)
    }

    reverseTasks() {
        this.tasks.reverse()
    }
}

class Board {
    constructor() {
        this.id = generateId()
        this.title = 'My Board'
        this.columns = []
        this.load()
    }

    addColumn(title) {
        if (!title.trim()) return
        const column = new Column(title)
        this.columns.push(column)
        this.save()
    }

    removeColumn(columnId) {
        this.columns = this.columns.filter(c => c.id !== columnId)
        this.save()
    }

    getColumn(columnId) {
        return this.columns.find(c => c.id === columnId)
    }

    moveTask(fromColumnId, toColumnId, taskId) {
        const fromCol = this.getColumn(fromColumnId)
        const toCol = this.getColumn(toColumnId)
        if (!fromCol || !toCol) return
        fromCol.moveTaskTo(toCol, taskId)
        this.save()
    }

    save() {
        localStorage.setItem('to-do-board', JSON.stringify(this))
    }

    load() {
        const data = localStorage.getItem('to-do-board')
        if (!data) return
        try {
            const parsed = JSON.parse(data)
            this.id = parsed.id
            this.title = parsed.title
            this.columns = parsed.columns.map(colData => {
                const column = new Column(colData.title)
                column.id = colData.id
                column.tasks = colData.tasks.map(taskData => {
                    const task = new Task(taskData.text)
                    task.id = taskData.id
                    task.createdAt = taskData.createdAt
                    return task;
                })
                return column
            });
        } catch (e) {
            localStorage.removeItem('to-do-board')
        }
    }
}

const board = new Board()

function renderBoard() {
    const boardEl = document.getElementById('board')
    boardEl.innerHTML = ''

    board.columns.forEach((column, index) => {
        const template = document.getElementById('column-template')
        const columnEl = template.content.cloneNode(true).querySelector('.column')
        
        columnEl.dataset.id = column.id
          const titleEl = columnEl.querySelector('.column-title')
          titleEl.textContent = column.title

        titleEl.addEventListener('click', () => {
            titleEl.contentEditable = true
            titleEl.focus()
        });

        titleEl.addEventListener('blur', () => {
            column.title = titleEl.textContent.trim()
            titleEl.contentEditable = false
            board.save()
            renderBoard()
        });

        titleEl.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault()
                titleEl.blur()
            }
        });

        columnEl.querySelector('.delete-column').onclick = () => {
            board.removeColumn(column.id)
            renderBoard()
        }
        columnEl.querySelector('.sort-by-date').onclick = () => {
            column.sortTasksByDate()
            board.save()
            renderBoard()
        }
        columnEl.querySelector('.reverse-tasks').onclick = () => {
            column.reverseTasks()
            board.save()
            renderBoard()
        }

        const form = columnEl.querySelector('.add-task-form')
        form.onsubmit = e => {
            e.preventDefault()
            const input = form.querySelector('.add-task-input');
            column.addTask(input.value)
            board.save()
            renderBoard()
            input.value = ''
        }

        const tasksList = columnEl.querySelector('.tasks-list')
        column.tasks.forEach(task => {
            const taskTemplate = document.getElementById('task-template');
            const taskEl = taskTemplate.content.cloneNode(true).querySelector('.task');
            taskEl.dataset.id = task.id

            const textEl = taskEl.querySelector('.task-text')
            textEl.textContent = task.text

            textEl.addEventListener('click', () => {
                textEl.contentEditable = true
                textEl.focus()
            })
            textEl.addEventListener('blur', () => {
                task.updateText(textEl.textContent)
                board.save()
                renderBoard()
            });
            textEl.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    textEl.blur()
                }
            });

            taskEl.querySelector('.delete-task').onclick = () => {
                column.removeTask(task.id)
                board.save()
                renderBoard()
            }

            const leftBtn = taskEl.querySelector('.move-left')
            const rightBtn = taskEl.querySelector('.move-right')

            if (index > 0) {
                leftBtn.onclick = () => {
                    board.moveTask(column.id, board.columns[index - 1].id, task.id)
                    renderBoard()
                };
            } else {
                leftBtn.remove()
            }

            if (index < board.columns.length - 1) {
                rightBtn.onclick = () => {
                    board.moveTask(column.id, board.columns[index + 1].id, task.id)
                    renderBoard()
                }
            } else {
                rightBtn.remove()
            }

            tasksList.appendChild(taskEl)
        });

        boardEl.appendChild(columnEl)
    })
}

document.getElementById('toggle-add-column').onclick = () => {
    const form = document.getElementById('add-column-form');
    form.classList.toggle('hidden');
    if (!form.classList.contains('hidden')) {
        document.getElementById('new-column-title').focus();
    }
};

document.getElementById('add-column-form').onsubmit = e => {
    e.preventDefault()
    const input = document.getElementById('new-column-title')
    board.addColumn(input.value)
    renderBoard()
    input.value = ''
    document.getElementById('add-column-form').classList.add('hidden')
}

document.getElementById('cancel-add-column').onclick = () => {
    document.getElementById('new-column-title').value = ''
    document.getElementById('add-column-form').classList.add('hidden')
}

renderBoard();