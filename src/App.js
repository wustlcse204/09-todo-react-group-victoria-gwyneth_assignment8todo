import React, { Component } from 'react';
import './App.css';
import Todo from './todo'; 
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <div id="header" class="header">

            <div class="title">
                <p><h1> M Y &nbsp;&nbsp;T O - D O &nbsp;&nbsp;L I S T </h1></p>
            </div>

            <div class="introduction">
                <p><h1>Welcome to Victoria and Gwyneth's To-Do list. Type in your task and you can check it off once completed, or delete it from the list.</h1></p>
            </div>
        
            <div id="border"> </div>
            <section id="containerToDos"> 
            <NewTodo />
            <Todo /> 
            </section>
      </div>

    );
  }
}

export default App;
