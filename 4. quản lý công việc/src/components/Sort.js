import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: "name",
        value: 1,
      },
    };
  }
  onClick = (sortBy, sortValue) => {
    setTimeout(() => {
      this.props.onSort(this.state.sort)
    }, this.setState({
      sort : {
         by : sortBy,
         value : sortValue
      }
    }));
 
  };

  render() {
    let { sort } = this.state;
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
            <li
              className={"dropdown-item "+
                ((sort.by === "name" && sort.value === 1)
                  ? "sort_selected "
                  : "")
              }
              href="a"
              onClick={() => {
                this.onClick("name", 1);
              }}
            >
              <i className="fas fa-sort-alpha-up"></i> Tên A-Z
            </li>
            <li
              className={"dropdown-item "+
              ((sort.by === "name" && sort.value === -1)
                ? "sort_selected "
                : "")
            }
              href="a"
              onClick={() => {
                this.onClick("name", -1);
              }}
            >
              <i className="fas fa-sort-alpha-down"></i> Tên Z-A
            </li>
            <div className="dropdown-divider"></div>
            <li
              className={"dropdown-item "+
              ((sort.by === "status" && sort.value === 1)
                ? "sort_selected "
                : "")
            }
              href="a"
              onClick={() => {
                this.onClick("status", 1);
              }}
            >
              Trạng Thái Kích Hoạt
            </li>
            <li
              className={"dropdown-item "+
              ((sort.by === "status" && sort.value === -1)
                ? "sort_selected "
                : "")
            }
              href="a"
              onClick={() => {
                this.onClick("status", -1);
              }}
            >
              Trạng Thái Ẩn
            </li>
          </div>
        </div>
      </div>
    );
  }
}
export default Sort;
