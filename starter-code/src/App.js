import React from "react";
import "./App.css";
import userData from "./users.json";
import Users from "./Users";

class App extends React.Component {
  state = {
    users: userData,
    search: "",
    teacher: true,
    student: true,
    campus: ""
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      search: event.target.value
    });
  };

  roleChecked = event => {
    console.log(event.target.checked);
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

  campusChange = event => {
    console.log(event.target.value);
    this.setState({
      campus: event.target.value
    });
  };

  render() {
    let userList = this.state.users.filter(user => {
      let nameCheck =
        user.firstName
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.state.search.toLowerCase());

      if (
        nameCheck &&
        ((this.state.teacher && user.role === "teacher") ||
          (this.state.student && user.role === "student")) &&
        user.campus.includes(this.state.campus)
      ) {
        return true;
      }

      // if (this.state.search === "") {
      //   return this.state.users;
      // } else if (
      //   user.firstName
      //     .toLowerCase()
      //     .includes(this.state.search.toLowerCase()) ||
      //   user.lastName.toLowerCase().includes(this.state.search.toLowerCase())
      // ) {
      //   return user;
      // } else if (this.state.teacher == true) {
      //   return user;
      // }
    });

    return (
      <div className="App">
        <h1>IronBook</h1>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
        />
        <label htmlFor="teacher">Teacher</label>
        <input
          type="checkbox"
          name="teacher"
          id="teacher"
          checked={this.state.teacher}
          onChange={this.roleChecked}
        />
        <label htmlFor="student">Student</label>
        <input
          type="checkbox"
          name="student"
          id="student"
          checked={this.state.student}
          onChange={this.roleChecked}
        />
        <label htmlFor="campus">Campus</label>
        <select name="campus" id="campus" onChange={this.campusChange}>
          <option value="Berlin">Berlin</option>
          <option value="Paris">Paris</option>
          <option value="Lisbon">Lisbon</option>
        </select>
        <Users users={userList} />
      </div>
    );
  }
}

export default App;
