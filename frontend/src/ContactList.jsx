import React from 'react'

const ContactList = ({ contacts }) => {
    return (
        <>
            <h2>My contacts</h2>

            {contacts.map((contact) => (
                <div className="card" key={contact.id}>
                    <div className="card-border-top"></div>
                    <div className="img"></div>
                    <span>{contact.firstName} {contact.lastName}</span>
                    <p className="email">{contact.email}</p>
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            ))}
        </>
    )
}

export default ContactList
