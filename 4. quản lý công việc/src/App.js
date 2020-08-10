import React, { Component } from "react";
import "./App.css";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1
      },
      keywork: "",
      isLoading: true,
      sort :{
        by : 'name',
        value : 1
      }
    };
  }
 UNSAFE_componentWillMount() {
    console.log("componentWillMount");
    if(localStorage.getItem("data"))
    this.setState({
      tasks : JSON.parse(localStorage.getItem("data"))
    })
  }

  componentDidMount() {
    console.log("componentDidMount");
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }
  s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  general = () => this.s4() + "-" + this.s4() + "-" + this.s4();

  onData = () => {
    var tasksList = [
      {
        id: this.general(),
        name: "Chơi Game",
        status: true,
      },
      {
        id: this.general(),
        name: "Học Bài",
        status: false,
      },
      {
        id: this.general(),
        name: "Xem Phim",
        status: true,
      },
      {
        id: this.general(),
        name: "Ngủ",
        status: false,
      },
      {
        id: this.general(),
        name: "Tắm Biển",
        status: false,
      },
    ];
    this.setState({
      tasks: tasksList,
    });
    localStorage.setItem("data", JSON.stringify(tasksList));
  };

  onChangeForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.general();
      tasks.push(data);
    } else {
      for (const i of tasks) {
        if (i.id === data.id) {
          tasks[tasks.indexOf(i)] = data;
        }
      }
    }
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem("data", JSON.stringify(tasks));
  };

  updateStatus = (id) => {
    let { tasks } = this.state;
    for (const i of tasks) {
      if (i.id === id) {
        i.status = !i.status;
        this.setState({ tasks: tasks });
      }
      localStorage.setItem("data", JSON.stringify(tasks));
    }
  };

  onUpdate = (id) => {
    let { tasks } = this.state;
    for (const i of tasks)
      if (i.id === id) {
        this.setState({ taskEditing: tasks[tasks.indexOf(i)] });
      }
    this.onShowForm();
  };

  onDelete = (id) => {
    let { tasks } = this.state;
    for (const i of tasks) {
      if (i.id === id) {
        tasks.splice(tasks.indexOf(i), 1);
        this.setState({ tasks: tasks });
        localStorage.setItem("data", JSON.stringify(tasks));
      }
    }
    this.onCloseForm();
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter:{
        name :  filterName.toLowerCase(),
        status : filterStatus
      }
    });
  };

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  onSort = (sort) => {
    setTimeout(() => {
      console.log("sort")
    }, this.setState({
      sort : sort
    }));
  
   
  }

  render() 
  {
    console.log("render")
    const override = css`
      display: block;
      margin: 20% auto;
      border-color: red;
    `;
    let { tasks, isDisplayForm, taskEditing, filter, keyword ,sort} = this.state; // let tasks = this.state.tasks
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1 || filter.status === '-1' ) {
          return task;
        } else {
          return task.status === (parseInt(filter.status) === 1 ? true : false);
        }
       
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if( sort.by === 'name' ){
      tasks.sort((a,b)=>{
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        if(nameA > nameB ) return sort.value
        else if(nameA < nameB) return -sort.value
        else return 0;
        
      })
    }else
    tasks.sort((a,b)=>{
      if(a.status > b.status ) return -sort.value
      else if(a.status < b.status) return sort.value
      else return 0;
    })
  
    var eleDisplayForm = isDisplayForm ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return this.state.isLoading ? (
      <div className="sweet-loading">
        <RingLoader
          css={override}
          size={200}
          color={"black"}
          loading={this.state.loading}
        />
      </div>
    ) : (
      <div className="container mt-3 ">
        <div className=" text-center ">
          <h2>Quản Lý Công Việc</h2>
        </div>
        <div className="row mt-20">
          <div className={isDisplayForm ? "col-10 col-md-4" : ""}>{eleDisplayForm}</div>
          <div className={isDisplayForm ? "col-0 col-md-8" : "col-12"}>
            <button
              type="button"
              className="btn btn-info"
              onClick={this.onChangeForm}
            >
              <span className="fas fa-plus-square"></span> Add task
            </button>
            <button
              type="button"
              className="btn btn-info ml-3"
              onClick={this.onData}
            >
              <span className="fas fa-database"></span> Load Data
            </button>
            <Control onSearch={this.onSearch} onSort = {this.onSort} />
            <div className="row mt-3">
              <div className="col-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.updateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
