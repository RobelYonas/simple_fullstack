import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModelOpen, setModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContact()
  }, [])

  const closeModel = () => {
    setModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if(!isModelOpen) setModalOpen(true)
  }

  const fetchContact = async () => {
    const data = await fetch("http://127.0.0.1:5000/contacts")
    const respond = await data.json()
    setContacts(respond.contacts)
  }

  const openEditModal = (contact) => {
    if (isModelOpen) return
    setCurrentContact(contact)
    setModalOpen(true)
  }

  return (
    <>
      <ContactList contacts={contacts} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModelOpen && <div className="model">
        <div className="modal-content">
          <span className="close" onClick={closeModel}>Remove</span>
          <ContactForm />
        </div>
        </div>}
    </>
  )
}

export default App
