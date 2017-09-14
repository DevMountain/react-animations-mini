import React, { Component } from 'react';
import Card from './Card';
import './App.css';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [{
                key: 't1',
                data: {
                    todo: 'Learn react-motion',
                    completed: false
                }
            }]
        }
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    addTodo(e) {
        e.preventDefault();
        let newTodo = {
            key: `t${new Date()}`,
            data: {
                todo: this.inputRef.value,
                completed: false
            }
        }
        this.setState({
            todos: [...this.state.todos, newTodo]
        })
        this.inputRef.value = '';
    }

    removeTodo( id ) {
        let todos = this.state.todos.filter( todo => todo.key  !== id );
        this.setState({
            todos: todos
        })
    }

    toggle( id ) {
        let todos = this.state.todos.map( todo => {
            if (todo.key === id) {
                todo.data.completed = !todo.data.completed;
            }
            return todo;
        });
        this.setState({
            todos: todos
        })
    }


    render() {

        const todos = this.state.todos.map( (todo, i) => {
            return <Card 
                        key={i}
                        toggle={ this.toggle }
                        removeTodo={ this.removeTodo } 
                        todo={ todo } /> 
        })

        return(
            <div className='app'>
                <h1>to-dos</h1>
                <div className='todos-wrap'>
                    <div className='right-arrow'>></div> 
                    <div className='input-container'>
                        <form onSubmit={ this.addTodo }>
                            <input 
                                ref={ input => this.inputRef = input}
                                placeholder='add new to-do...'
                                className='todo-inp'
                                /> 
                        </form>   
                    </div>
                    <div>
                        { todos }
                    </div>  
                </div> 
            </div> 
        )
    }
}
