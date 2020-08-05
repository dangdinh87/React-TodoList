import React, { Component } from "react";

class TaskIt extends Component {

  onUpdateStatus=()=>{
    this.props.onUpdateStatus(this.props.task.id);
  }

  onDelete=()=>{
    this.props.onDelete(this.props.task.id);
  }

  onUpdate=()=>{
    this.props.onUpdate(this.props.task.id);
  }

  
  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td>
          <button 
            className={
              "text-center btn-block btn-sm btn text-white" +
              (task.status === true ? " bg-success" : " bg-danger")
            }
            onClick={this.onUpdateStatus}
          >
            {task.status === true ? "Active" : " Hide"}
          </button>
        </td>
        <td className="text-center">
          <button className="btn btn-warning text-light btn-sm  " type="button"   onClick ={this.onUpdate} >
            <i className="fas fa-pen"></i> Edit
          </button>
          <span className="col"></span>
          <button className="btn-sm btn-danger btn" type="button  " onClick={this.onDelete}>
            <i className="fas fa-window-close"></i> Delete
          </button>
        </td>
      </tr>
    );
  }
}
export default TaskIt;
