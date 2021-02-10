import { g } from './App'
const $ = s => document.querySelector(s)
const body = document.body
const FILTERS = {
  All: {
    fn: arr => arr,
    href: '#/'
  },
  Active: {
    fn: arr => arr.filter(i => !i.completed),
    href: '#/active'
  },
  Completed: {
    fn: arr => arr.filter(i => i.completed),
    href: '#/completed'
  }
}

const data = {
  allTodos: [],
  filter: 'All'
}

const setTodo = (id, key, val) => {
  data.allTodos = data.allTodos.map(i => {
    if (i.id === id) i[key] = val
    return i
  })
  rerender()
}

const rerender = () => {
  $('ul.todo-list').replaceWith(g(('ul.todo-list'))(
    ...FILTERS[data.filter].fn(data.allTodos).map(todo =>
      g('li#_' + todo.id + (todo.completed ? '.completed' : ''))(
        g('.view')(
          g('input.toggle', {
            type: 'checkbox',
            checked: todo.completed,
            _click: () => setTodo(todo.id, 'completed', !todo.completed)
          })(),
          g('label', {
            _dblclick: () => {
              let value = todo.title
              const listEl = $('li#_' + todo.id)
              const input = g('input.edit', {
                type: 'text',
                _keyup: e => {
                  if (e.key === 'Enter') setTodo(todo.id, 'title', value)
                  else {
                    value = e.target.value
                    input.value = value
                  }
                },
                _blur: rerender
              })(value)
              listEl.classList.add('editing')
              listEl.appendChild(input)
            }
          })(todo.title),
          g('button.destroy', () => {
            data.allTodos = data.allTodos.filter(i => i.id !== todo.id)
            rerender()
          })()
        )
      )
    )))

  $('ul.filters').replaceWith(g('ul.filters')(
    ...Object.entries(FILTERS)
      .map(([text, { href }]) =>
        g('li')(
          g('a' + (text === data.filter ? '.selected' : ''), {
            href,
            _click: () => {
              data.filter = text
              rerender()
            }
          })(text)
        )
      )))

  const len = data.allTodos.filter(i => !i.completed).length
  $('span.todo-count').innerText = `${len} item${len > 1 ? 's' : ''} left`
}
body.appendChild(g('section.todoapp')(
  g('header.header')(
    g('h1')('todos'),
    g('input.new-todo', {
      placeholder: 'What needs to be done?',
      autofocus: true,
      _keyup: e => {
        if (e.key === 'Enter') {
          data.allTodos.push({
            id: +new Date(),
            title: e.target.value,
            completed: false
          })
          e.target.value = ''
          rerender()
        }
      }
    })()
  ),
  g('section.main')(
    g('input#toggle-all.toggle-all', {
      type: 'checkbox',
      _click: () => {
        const allDone = data.allTodos.every(i => i.completed)
        data.allTodos = data.allTodos.map(i => {
          i.completed = !allDone
          return i
        })
        data.allTodos.forEach(todo =>
          setTodo(todo.id, 'completed', !allDone)
        )
      }
    })(),
    g('label', {
      for: 'toggle-all'
    })('Mark all as complete'),
    g('ul.todo-list')()
  ),
  g('footer.footer')(
    g('span.todo-count')(),
    g('ul.filters')(),
    g('button.clear-completed', () => {
      data.allTodos = data.allTodos.filter(i => !i.completed)
      rerender()
    })('Clear completed')
  )
))
body.appendChild(g('footer.info')(
  g('p')('Double-click to edit a todo'),
  g('p')(
    'Created by ',
    g('a', { href: 'http://gaoryrt.com' })('gaoryrt')
  ),
  g('p')(
    'Part of ',
    g('a', { href: 'http://todomvc.com' })('TodoMVC')
  )
))
rerender()
