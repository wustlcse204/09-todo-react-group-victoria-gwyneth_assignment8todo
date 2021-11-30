import React, { Component } from 'react';
import './todo.css';

class Todo extends Component {
  render() {
    return (
        <div id="toDoList"> 
            <p>{this.props.text}</p>
        </div>
        
    );
  }
}

export default Todo;
