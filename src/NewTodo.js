import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
        <input type="text" id="addedTask" placeholder="Type in your To-Do's here!"></input>
    );
  }
}

export default NewTodo;