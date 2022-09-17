import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

const DeleteContact = (props) => {
    const location = useLocation();
    // const contact = location.state.contact;
    console.log(location);
    // const { deleteContactHandler } = location.state.deleteContactHandler;
    const [ redirect, setRedirect ] = useState(false);

    const NavigateToHome= () => {
        setRedirect(true);
    }

    const removeContact = () => {
        // deleteContactHandler(id);
        setRedirect(true);
    }

    return (
        <div className="item">
            <div>
                Are you sure you want to delete contact?
            </div>
            
            <button onClick={removeContact} className="ui button blue center">
                Yes
            </button>
            <button onClick={NavigateToHome} className="ui button secondary center">
                No
            </button>
            { 
                redirect && <Navigate to='/' replace={true}/>
            }
        </div>
    )
}

export default DeleteContact;
