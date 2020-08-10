import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  onChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.keyword);  
  };

  render() {
    let { keyword } = this.state;
    return (
      <div className="col-10 col-md-6 ">
        <div className="input-group mb-3">
          <input
            className="form-control "
            placeholder="Nhập từ khóa....."
            onChange={this.onChange}
            name= "keyword"
            type= "text"
            value= {keyword}
          />
          <div className="input-group-append">
            <button
              className="btn btn-info "
              onClick={this.onSearch}
            >
              <span className="fas fa-search"></span>  Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
