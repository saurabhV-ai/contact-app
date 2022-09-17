import React from "react";
import { Link, Navigate } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email:"",
    redirect:false,
  }
  
  add = (e) => {
    e.preventDefault();
    if(this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory!");
      return
    }
    this.props.addContactHandler(this.state);
    this.setState({name: "", email:"", redirect:true,});
  }
  render () {
    return (
      <div className="ui main container">
        <h2>
          Add Contact

          <Link to="/">
            <button className="ui button blue right">Contact List</button>
          </Link>
        </h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"
              value={this.state.name}
              onChange={ (e) => this.setState({name: e.target.value})}
            />
          </div>
          <div className="field">
            <label>Eamil</label>
            <input type="text" name="email" placeholder="Email"
              value={this.state.email}
              onChange={ (e)=> this.setState({email: e.target.value}) }
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
        { 
          this.state.redirect && <Navigate to='/' replace={true}/>
        }
      </div>
    )
  }
}

export default AddContact;
