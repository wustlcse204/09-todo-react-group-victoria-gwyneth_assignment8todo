import React, { Component } from 'react';
import './App.css';
import Todo from './todo'; 
import NewTodo from './NewTodo';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { todos: [] };
    this.addToDos = this.addToDos.bind(this);
  }

  componentDidMount(){
    var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() { //process the AJAX response
    if (this.readyState == 4 && this.status == 200) { //checkMark to see if it's working
        //returns an array of objects as JSON (each object will be a ToDo that has been previously submitted with my API key) JSON.parse() parses this JSON into a usable array
        var todos = JSON.parse(this.responseText); //NOTE: this array will be empty before we have successfully submitted any ToDos
        this.setState({todos: todos});
    }
};

xhttp.open("GET", "https://cse204.work/todos", true); //AJAX call GET request to cse 204 API 
xhttp.setRequestHeader("x-api-key","e678e1-b3de89-352f09-13b587-042016"); //API key must be sent as an x-api-key header
xhttp.send();
  }

  addToDos(event) {
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
    var data = JSON.parse(this.responseText)

    // IF READYSTATE ****
    //if SUCCESSFUL, return a single object containing the ToDo item that has been saved
    if (this.readyState == 4 && this.status == 200) { 
      

    }

    else if (this.readyState == 4) { //if UNSUCCESSFUL, this POST request will return a text error
      console.log(this.responseText);
      }
    };
  
    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "e678e1-b3de89-352f09-13b587-042016");

    xhttp2.send(JSON.stringify(data)); 
  }

  render() {
    return (
      <div id="header" class="header">

            <div className="title">
                <p><h1> M Y &nbsp;&nbsp;T O - D O &nbsp;&nbsp;L I S T </h1></p>
            </div>

            <div className="introduction">
                <p><h1>Welcome to Victoria and Gwyneth's To-Do list. Type in your task and you can check it off once completed, or delete it from the list.</h1></p>
            </div>
        
            <div id="border"> </div>
            <section id="containerToDos"> 
            <NewTodo />

            {this.state.todos.map((todo) => 
            <Todo key={todo.id} id={todo.id} addToDos={this.addToDos} text={todo.text}/>)}

            </section>
      </div>

    );
  }
}

export default App;
