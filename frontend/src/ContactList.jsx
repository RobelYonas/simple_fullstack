import React from 'react'
//import './style/ContactList.css';

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const ondDelete = async(id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status == 2) {
                updateCallback()
            }
            else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }
    
    
    return (
        <>
            <h2>My contacts</h2>

            {contacts.map((contact) => (
                <div className="card" key={contact.id}>
                    <div className="card-border-top"></div>
                    <div className="img"></div>
                    <span>{contact.firstName} {contact.lastName}</span>
                    <p className="email">{contact.email}</p>
                    <button className='btn_submit' onClick={() => updateContact(contact)}>Update</button>
                    <button className='btn_submit'onClick={() => ondDelete(contact.id)}>Delete</button>
                </div>
            ))}
        </>
    )
}

export default ContactList
