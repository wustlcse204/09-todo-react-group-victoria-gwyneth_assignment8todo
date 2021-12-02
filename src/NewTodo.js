import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <form>
        {/* <input type="text" id="addedTask" placeholder="Type in your To-Do's here!"></input>  */}
        <input  placeholder="Type in your To-Do's here!" id="addedTask" placeholder="Type in your To-Do's here!" value={this.props.input} onChange={this.props.onChange} />
        <button id="submit" className="submit" onClick={this.props.addToDos}>Submit</button>
      </form>
    );
  }
}

export default NewTodo;