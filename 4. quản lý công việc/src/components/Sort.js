import React, { Component } from 'react';

class Sort extends Component {
    render(){
    return (
        <div className="col-6">
        <div className="dropdown">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
          >
            Sort &nbsp;
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="a">
              <i className="fas fa-sort-alpha-up"></i> Tên A-Z
            </a>
            <a className="dropdown-item" href="a">
              <i className="fas fa-sort-alpha-down"></i> Tên Z-A
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="a">
              Trạng Thái Kích Hoạt
            </a>
            <a className="dropdown-item" href="a">
              Trạng Thái Ẩn
            </a>
          </div>
        </div>
      </div>
  );
}
}
export default Sort;
