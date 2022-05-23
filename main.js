const STORAGE_KEY = 'My-todo-app'
const todoStorage = {
  fetch: function() {
    const todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
const vm = new Vue({
  el: '#app',
  data: {
    content: '',
    todos: [] 
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {
    addTodo: function() {
      const content = this.content
      if ((content === '')||(content === null)) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        content: content,
        isCompleted: false
      })
      todoStorage.save(this.todos)
      this.content = ''
    },
    editTodo: function(todo) {
      let newContent = window.prompt(`Update content`, `${todo.content}`)
      if ((newContent === '')||(newContent === null)) {
        return
      } else {
        todo.content = newContent
      }
      todoStorage.save(this.todos)
    },
    deleteTodo: function(todo) {
      const index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
      todoStorage.save(this.todos)
    },
    doChangeState: function() {
      todoStorage.save(this.todos)
    }
  }
})
