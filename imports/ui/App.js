import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import styled, { css } from 'styled-components';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

const Header=styled.header`
  background: #d2edf4;
  background-image: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
  padding: 20px 15px 15px 15px;
  position: relative;
`;

const ToDoListTitle=styled.h1`
  font-size: 1.5em;
  margin: 0;
  margin-bottom: 10px;
  display: inline-block;
  margin-right: 1em;
`;

const NewTaskFrm=styled.form`
& > input {
  box-sizing: border-box;
  padding: 10px 0;
  background: transparent;
  border: none;
  width: 100%;
  padding-right: 80px;
  font-size: 1em;
}

& > input:focus {
  outline: 0;
}
`;

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
	
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {	  		  
    return (
      <div className="container">
        <Header>
          <ToDoListTitle>Todo List</ToDoListTitle>

          <NewTaskFrm className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input  placeholder= "Type to add new tasks" type="text" ref="textInput"/>
          </NewTaskFrm>
        </Header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
