import React, { Component } from 'react';
import './App.css';
import Todo from './todo'; 
import NewTodo from './NewTodo';

class App extends Component {

  // SAVE POINT 9:17 PM

  //CONSTRUCTOR METHOD
  constructor() {
    super();
    // Don't call this.setState() here!
    this.state = { todos: [], input:' '}; //set todo items as an array
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addToDos = this.addToDos.bind(this);
    this.delete = this.delete.bind(this); 
    this.onChange = this.onChange.bind(this); 
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
  }


  componentDidMount(){
    var currComponent = this;
    //Make initial AJAX call to list Todos -- CHECK!! 
    var xhttp = new XMLHttpRequest();
 
    xhttp.onreadystatechange = function() { //process the AJAX response
      if (this.readyState == 4 && this.status == 200) { //checkMark to see if it's working
        //returns an array of objects as JSON (each object will be a ToDo that has been previously submitted with my API key) JSON.parse() parses this JSON into a usable array
        var todosResponse = JSON.parse(this.responseText); //NOTE: this array will be empty before we have successfully submitted any ToDos
        currComponent.setState({todos: todosResponse});

        console.log(todosResponse);
      }
    };

    xhttp.open("GET", "https://cse204.work/todos", true); //AJAX call GET request to cse 204 API 
    xhttp.setRequestHeader("x-api-key","e678e1-b3de89-352f09-13b587-042016"); //API key must be sent as an x-api-key header
    xhttp.send();
  }

  addToDos(event) {
    event.preventDefault();
    var xhttp2 = new XMLHttpRequest();
    var currComponent = this; //used currComponent instead of self 
    const newText = this.state.input;
    var value = { text: newText };
    //Grab input data from new todo?

    xhttp2.onreadystatechange = function() {
      // IF READYSTATE ****
      //if SUCCESSFUL, return a single object containing the ToDo item that has been saved
      if (this.readyState == 4 && this.status == 200) {     

        //data = JSON.parse(this.responseText);
        //this.setState({ todos: [data, ...this.state.todos] }) 
        //change input state?

        currComponent.setState({
          todos: [...currComponent.state.todos, JSON.parse(this.responseText)]
        })
        // clear the input field
        currComponent.setState({ input: '' });
      }

      else if (this.readyState == 4) { //if UNSUCCESSFUL, this POST request will return a text error
        console.log(this.responseText);
      }
    };
  
    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "e678e1-b3de89-352f09-13b587-042016");

    xhttp2.send(JSON.stringify(value)); 

    // read the input value from state
    const newTodoText = this.state.input;
    // Do AJAX
    // Inside your AJAX success
    this.state.input = '';
  }


  //ON CHANGE EVENT TO UPDATE STATE WHEN THE INPUT IS CHANGED
  onChange(event){
    //set the state to the value of the input 
    this.setState({
      input: event.target.value
    });
  }

  delete(event){
    event.preventDefault(); 
    var currComponent = this;
    var deleting = event.target.parentNode.id;
    var xhttp3 = new XMLHttpRequest();

    xhttp3.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // You need the id of the todo you want to delete as a variable.
        const remainingTodos = currComponent.state.todos.filter((todo) => {
          // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
          if (todo.id !== deleting) {
            return todo;
          }
        });
        // Update state with filtered list using this.setState();
        currComponent.setState({ todos: remainingTodos });
      }
    };

    xhttp3.open("DELETE", "https://cse204.work/todos/" + deleting, true);
    xhttp3.setRequestHeader("x-api-key", "e678e1-b3de89-352f09-13b587-042016");
    xhttp3.send();

  } 

  //SORT EVENT HANDLER-- sorts array alphabetically using localCompare
  sortAlphabetically(event) {
    var todos = this.state.todos;
    todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });
    this.setState({ todos: todos })
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

            {/* //CHECK IF THIS LINE IS RIGHT */}
            <NewTodo addToDos={this.addToDos} onChange={this.onChange} input={this.state.input}/>
            <button id = "sort" className="sort" onClick={this.sortAlphabetically}>Sort By Alphabetical Order</button>

            {/* /* // STEP 4 : Render Todo componenent for each Todo item
            // USE MAP FUNCTION TO ITERATE OVER TODO ARRAY defined above */}

            {
              this.state.todos.map((todo) => 
                <Todo key={todo.id} id={todo.id} text={todo.text} delete={this.delete} completed={todo.completed}/> 
              )
            }

            </section>
      </div>

    );
  }
}

export default App;
