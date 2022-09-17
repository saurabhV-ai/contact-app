import React from "react";
import user from "../images/user.jpg";
import { Link, useLocation } from "react-router-dom";

const ContactDetail = (props) => {
    const location = useLocation();
    const { name, email } = location.state.contact;
    return (
        <div className="ui main container">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="User"/>
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ContactDetail;
