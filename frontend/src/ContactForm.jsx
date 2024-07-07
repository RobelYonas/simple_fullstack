import { useState } from "react";
//import './style/ContactForm.css';

const ContactForm = ({ existingContact = {}, updateCallBack }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const updating = Object.entries(existingContact).length != 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if(response.status != 201 && response.status != 200){
            const data = await response.json()
            alert(data.message)
        }
        else {
            updateCallBack()
        }
    }

    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                <input
                    placeholder="Enter your name"
                    className="input"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    placeholder="Enter your Last Name"
                    className="input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    placeholder="Email"
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="submit_btn">Submit</button>
            </form>
        </>
    )
}

export default ContactForm;
