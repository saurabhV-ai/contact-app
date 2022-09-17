import React, {useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  console.log(props);
  const inputEl = useRef("");
  const deleteContactHandler = (id) => {
    console.log('id: ', id);
    props.getContactId(id)
  };

  const renderContactList = props.contacts.map(
    (contact) => {
      return (
        <ContactCard contact={contact} clickHandler={deleteContactHandler} />
      )
    }
  );

  const getSearchTerm = () => {
    const value = inputEl.current.value;
    props.searchKeyword(value);
  }

  return (
    <div className="ui main container">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input ref={inputEl}
                  type="text" placeholder="Search contact" className="prompt"
                  value={ props.term } onChange={getSearchTerm} />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : 'No Result Found!' }
      </div>
    </div>
  )
}

export default ContactList;
