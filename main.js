var STORAGE_KEY = 'My-todo-app'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
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
var vm = new Vue({
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
      var content = this.$refs.content
      if ((content.value === '')||(content.value === null)) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        content: content.value,
        isCompleted: false
      })
      todoStorage.save(this.todos)
      content.value = ''
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
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
      todoStorage.save(this.todos)
    },
    doChangeState: function() {
      todoStorage.save(this.todos)
    }
  }
})
