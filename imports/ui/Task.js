import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { Tasks } from '../api/tasks.js';

const TaskLI=styled.li`
  position: relative;
  list-style: none;
  padding: 15px;
  border-bottom: #eee solid 5px;
  
  ${props => props.theme.checked && css`
   color: #888;
  `}
  
  & > .text {
   margin-left: 10px;
  }
 
  ${props => !props.theme.checked} {
   text-decoration: line-through;
  }}
`;

const DelTaskBtn=styled.button`
  float: right;
  font-weight: bold;
  background: none;
  font-size: 1em;
  border: none;
  position: relative;
`;
	
// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }
  
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
   const taskTheme =this.props.task.checked ? {checked:'checked'} : undefined; 

    return (
      <TaskLI theme={taskTheme}>
        <DelTaskBtn className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </DelTaskBtn>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">{this.props.task.text}</span>
      </TaskLI>
    );
  }
}
