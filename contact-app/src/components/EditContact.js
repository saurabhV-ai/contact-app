import React, {useState} from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

const EditContact = (props) => {
  console.log(props);
  const location = useLocation();
  const [contact, setContact] = useState(location.state.contact);
  const [redirect, setRedirect] = useState(false);

  const update = (e) => {
    e.preventDefault();
    if(contact.name === "" || contact.email === "") {
      alert("All fields are mandatory!");
      return
    }
    props.updateContactHandler(contact);
    setContact({id:"", name: "", email:""});
    setRedirect(true);
  }

  return (
    <div className="ui main container">
      <h2>
        Edit Contact

        <Link to="/">
          <button className="ui button blue right">Contact List</button>
        </Link>
      </h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name"
            value={contact.name}
            onChange={ (e) => setContact({id: contact.id, name: e.target.value, email: contact.email})}
          />
        </div>
        <div className="field">
          <label>Eamil</label>
          <input type="text" name="email" placeholder="Email"
            value={contact.email}
            onChange={ (e) => setContact({id: contact.id, name: contact.name, email: e.target.value})}
          />
        </div>
        <button className="ui button blue">update</button>
      </form>
      { 
        redirect && <Navigate to='/' replace={true}/>
      }
    </div>
  )
}

export default EditContact;
