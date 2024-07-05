import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './ContactList'

function App() {
  const [contacts, setContacts] = useState([{"firstName": "Tim", "lastName": "bob", "email":"email", id:1}])

  useEffect(() => {
    //fetchContact()
  }, [])

  const fetchContact = async() => {
    const data = await fetch("http://127.0.0.1:5000/contacts")
    const respond = await data.json()
    setContacts(respond.contacts)
  }

  return (
    <>
      <ContactList contacts={contacts}/>
    </>
  )
}

export default App
