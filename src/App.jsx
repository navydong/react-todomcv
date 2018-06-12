import React, { Component } from 'react';
// import { Router } from 'react-router'
import './App.css';
import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/todomvc-common/base.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibilityFilter: 'all',
            todos: [
                {
                    id: 0,
                    label: 'Taste JavaScript',
                    completed: true
                },
                {
                    id: 1,
                    label: 'Buy a unicorn',
                    completed: false
                }
            ]
        }
    }
    componentDidMount() {

    }
    todoCheckChange = (id) => {
        const todos = [...this.state.todos]
        todos.forEach(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
        })
        this.setState({
            todos
        })
    }
    keyPress = (e) => {
        if (e.charCode === 13) {
            const todos = [
                ...this.state.todos,
                {
                    id: this.state.todos.length,
                    label: e.target.value,
                    completed: false
                }
            ]
            this.setState({
                todos
            })
        }
    }
    delete = (id) => {
        const todos = this.state.todos.filter(todo => {
            return todo.id !== id
        })
        this.setState({
            todos
        })
    }
    toggle = (e) => {
        const checked = e.target.checked
        const todos = [...this.state.todos]
        todos.forEach(todo => {
            todo.completed = checked
        })
        this.setState({
            todos
        })
    }
    filter = (e) => {
        const filter = e.target.text
        let visibilityFilter;
        switch (filter) {
            case 'Completed':
                visibilityFilter = 'completed'
                break;
            case 'Active':
                visibilityFilter = 'active'
                break;
            default:
                visibilityFilter = 'all'
        }
        this.setState({
            visibilityFilter
        })
    }
    clearCompleted = () => {
        const todos = this.state.todos.filter(todo => (
            !todo.completed
        ))
        this.setState({
            todos
        })
    }
    render() {
        const { todos, visibilityFilter } = this.state
        const showTodos = todos.filter(todo => {
            switch (visibilityFilter) {
                case 'active':
                    return !todo.completed;
                case 'completed':
                    return todo.completed;
                default:
                    return true;
            }
        })
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>todos</h1>
                        <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyPress={this.keyPress} />
                    </header>
                    {/* This section should be hidden by default and shown when there are todos */}
                    <section className="main">
                        <input id="toggle-all" className="toggle-all" type="checkbox" onClick={this.toggle} />
                        <label htmlFor="toggle-all">Mark all as complete</label>
                        <ul className="todo-list">
                            {/*  These are here just to show the structure of the list items */}
                            {/*  List items should get the className `editing` when editing and `completed` when marked as completed  */}
                            {
                                showTodos.map((todo) => (
                                    <li className={todo.completed ? 'completed' : ''} key={todo.id}>
                                        <div className="view">
                                            <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => this.todoCheckChange(todo.id)} />
                                            <label>{todo.label}</label>
                                            <button className="destroy" onClick={() => this.delete(todo.id)}></button>
                                        </div>
                                        <input className="edit" defaultValue="Create a TodoMVC template" />
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                    {/* <!-- This footer should hidden by default and shown when there are todos --> */}
                    <footer className="footer">
                        {/* <!-- This should be `0 items left` by default --> */}
                        <span className="todo-count"><strong>{showTodos.length}</strong> item left</span>
                        {/* <!-- Remove this if you don't implement routing --> */}
                        <ul className="filters" onClick={this.filter} >
                            <li>
                                <a className={visibilityFilter === 'all' && 'selected'} href="#/">All</a>
                            </li>
                            <li>
                                <a className={visibilityFilter === 'active' && 'selected'} href="#/active">Active</a>
                            </li>
                            <li>
                                <a className={visibilityFilter === 'completed' && 'selected'} href="#/completed">Completed</a>
                            </li>
                        </ul>
                        {/* <!-- Hidden if no completed items are left ↓ --> */}
                        {
                            todos.filter(todo => todo.completed).length > 0
                                ? <button className="clear-completed" onClick={this.clearCompleted} >Clear completed</button>
                                : null
                        }

                    </footer>
                </section>
                <footer className="info">
                    <p>Double-click to edit a todo</p>
                    {/* <!-- Change this out with your name and url ↓ --> */}
                    <p>Created by <a href="http://todomvc.com">dong</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        );
    }
}

export default App;
