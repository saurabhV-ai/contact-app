import React from "react";
import user from "../images/user.jpg";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    const { id, name, email } = props.contact;

    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="User"/>
            <div className="content">
                <Link to={`/contact/${id}`} state={{contact: props.contact}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            {/* <Link to={'/deletecontact/${id}'} state={{contact: props.}} data={{deleteContactHandler: deleteContactHandler}}>
                <i className="trash alternate outline icon"
                    style={{color: "#d71c1c", float: "right", marginTop: "0.6rem"}}
                ></i>
            </Link> */}
            <i className="trash alternate outline icon" onClick={() => props.clickHandler(id)}
                style={{color: "#d71c1c", float: "right", marginTop: "0.6rem", marginRight: "0.6rem"}}
            ></i>
            <Link to={`/edit/${id}`} state={{contact: props.contact}}>
                <i className="edit alternate outline icon"
                    style={{color: "#blue", float: "right", marginTop: "0.6rem"}}
                ></i>
            </Link>
        </div>
    )
}

export default ContactCard;
