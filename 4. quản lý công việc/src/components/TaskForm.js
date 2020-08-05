import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }
  UNSAFE_componentWillMount() {
    if (this.props.task != null) {
      this.setState({   
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    console.log(nextprops );
    if (nextprops.task) {
      this.setState({
        id: nextprops.task.id,  
        name: nextprops.task.name,
        status: nextprops.task.status,
      });
    }
  }
  onChange = (event) => {
    let namespace = event.target.name;
    let value = event.target.value;
    if (namespace === "status") {
      value = event.target.value === "true" ? true : false;
    }
    this.setState({
      [namespace]: value,
      // [namespace: value,
      //[namespace]:[value] : vì sao sai  ??
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.props.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };

  render() {
    let { id } = this.state;
    return (
      <div className="card border-success ">
        <div className="card-header bg-success ">
          <h5 className="card-title text-light">
            {id !== "" ? "Update Task" : "Add Task"}
            <span
              onClick={this.props.onCloseForm}
              className="float-right fas fa-times-circle"
            ></span>
          </h5>
        </div>
        <div className="card-body ">
          <div className="form-group">
            <label >Name:</label>
            <input
              className="form-control border-success"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <form className="form-group " onSubmit={this.onSubmit}>
            <label for="">Status:</label>
            <select
              className="form-control border-success"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Active</option>
              <option value={false}>No</option>
            </select>
            <br />
            <div className="text-center ">
              <button name="" className="btn btn-success text-light " type="submit">
                <i className="fas fa-plus-square"></i> {id !== "" ? "Update" : "Add "}
              </button>
              &nbsp; &nbsp;
              <button
                name=""
                className="btn btn-danger"
                type="reset"
                onClick={() => this.onClear()}
              >
                <i className="fas fa-window-close"></i> Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default TaskForm;
