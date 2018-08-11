import React, { Component } from 'react';
import Card from './Card';
import { TransitionMotion, spring } from 'react-motion';
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
    }

    addTodo = (e) => {
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

    removeTodo = ( id ) => {
        let todos = this.state.todos.filter( todo => todo.key  !== id );
        this.setState({
            todos: todos
        })
    }

    toggle = ( id ) => {
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

    getDefaultStyles = () => {
        return this.state.todos.map( todo => {
            return Object.assign({}, todo, {style: { height: 0, opacity: 0 }})
        })
    }
    
    getStyles = () => {
        return this.state.todos.map( todo => {
            return Object.assign({}, todo, {style: {height: spring(65), opacity: spring(1)}})
        })
    }
    
    willEnter() {
        return {
            height: 0,
            opacity: 0
        }
    }
    
    willLeave() {
        return {
            height: spring(0),
            opacity: spring(0)
        }
    }

    render() {

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
                    <TransitionMotion
                        defaultStyles={ this.getDefaultStyles() }
                        styles={ this.getStyles() }
                        willEnter={ this.willEnter }
                        willLeave={ this.willLeave }
                        >
                        {(styles) => {
                            console.log(styles)
                            return (
                                <div>
                                    {styles.map( (todo) => {
                                        return <Card 
                                                    key={ todo.key }
                                                    toggle={ this.toggle }
                                                    removeTodo={ this.removeTodo } 
                                                    todo={ todo } /> 
                                    })}
                                </div> 
                            )
                        }}
                    </TransitionMotion> 
                </div> 
            </div> 
        )
    }
}