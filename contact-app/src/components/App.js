import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { uuid } from 'uuidv4';
import './App.css';
import Header from './Header';
import AddContact from './AddContact'
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';
import api from "../api/contacts"

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // RetrieveContacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
    
  }

  const removeContactHandler = async (id) => {
    console.log('id2: ', id)
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());
      })
      setSearchResults(newContactList);
      console.log(searchResults);
    } else {
      setSearchResults(contacts);
    }
  };

  const LOCAL_STORAGE_KEY = "";
  
  useEffect(() => {
   /*  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts); */
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts);
    }

    getAllContacts();
  }, []);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui'>
      <Router>
        <Header />
          <Routes>
            <Route
              path="/" 
              element={<ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />}
            />
            <Route
              path="/add"
              element={<AddContact
                addContactHandler={addContactHandler}
              />}
            />
            <Route
              path="/edit/:id"
              element={<EditContact
                updateContactHandler={updateContactHandler}
              />}
            />
            <Route
              path="/contact/:id"
              element={<ContactDetail
              />}
            />
            <Route
              path="/deletecontact/:id"
              element={<DeleteContact
              />}
            />
          </Routes>
      </Router>
      {/* <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
    </div>
  );
}

export default App;
