import React, { Component } from "react";
import TaskIt from "./TaskIt";

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1 //tất cả  -1 ; active : 1, hide :0
    }
  }

  onChange = (event) => {
    var name =event.target.name;
    var value = event.target.value;
    value=+value
    this.props.onFilter(
      name === 'filterName' ? value :this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    )
    this.setState({
      [name]: value
    })
  }

  render() {
    var  Tasks = this.props.tasks // var tasks = this.props.tasks
    var { filterName,filterStatus }=this.state
    var elmTasks = Tasks.map((Taskses, index) => {
      return (
        <TaskIt
          key={Taskses.id}
          index={index}
          task={Taskses}
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        />
      );
    });
    return (
      <table className="table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Status</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input type="text" className="form-control" name ="filterName"  value={ filterName} onChange={this.onChange}/>
            </td>
            <td>
              <select className="form-control" name="filterStatus" value={ filterStatus} onChange={this.onChange}>
                <option value="-1">All</option>
                <option  value="0">Hide </option>
                <option value="1">Active</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elmTasks}
        </tbody>
      </table>
    );
  }
}
export default TaskList;
