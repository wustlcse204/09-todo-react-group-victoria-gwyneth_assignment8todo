import React, { Component } from 'react';
import './todo.css';

class Todo extends Component {
  constructor(props){
    super(props);
    this.check = {id: this.props.id};
  }

  check(event) {
    var currComponent= this;
    var check = event.target.parentNode.id;
    var value = {completed: true};
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // save new Todo to check
        currComponent.setState({completed: true});
      }
    }
    xhttp4.open("PUT", "https://cse204.work/todos/" + check, true);
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.setRequestHeader("x-api-key", "e678e1-b3de89-352f09-13b587-042016");
    xhttp4.send(JSON.stringify(value));
  }

  render() {
    var className = "todo";
    this.check = {completed: this.props.completed};
    if (this.check.completed) {
      className = "todo completed";
    }
    return (
        <div id= {this.props.id}> 
            <button className="button" onClick={this.props.delete}>DELETE</button>
            <input id= "checked" className="checkbox" type="checkbox" onClick={this.check}></input>
            <p>{this.props.text}</p>
        </div>
        
    );
  }
}

export default Todo;
