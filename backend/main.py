from flask import request, jsonify
from config import app, db
from models import Contact


@app.route("/contacts", methods=["GET"])
def get_contact():
    """
    Get all contacts from the database and return them as a JSON response.

    Returns:
        A JSON response containing a list of contacts.
    """
    # Query the database for all contacts
    contacts = Contact.query.all()

    # Convert each contact to a JSON object
    json_Contact = list(map(lambda x: x.to_json(), contacts))

    # Return the contacts as a JSON response
    return jsonify({"contacts": json_Contact})


@app.route("/create_contact", methods=["POST"])
def create_contact():
    # Get JSON data from request
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastname")
    email = request.json.get("email")

    # Validate required fields
    if not first_name or not last_name or not email:
        return jsonify({"message": "One of the needed variables is not entered"}), 400

    # Create a new contact object
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)

    try:
        # Add and commit new contact to the database
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        # Handle exceptions during database operations
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "New contact has been created"}), 201


@app.route("/update_contact/<int:contact_id>", methods=["PATCH"])
def update_contact(contact_id):
    contact = Contact.query.get(contact_id)

    if not contact:
        return jsonify({"message": "Contact not found"}), 404

    data = request.json
    contact.first_name = data.get("first_name", contact.first_name)
    contact.last_name = data.get("last_name", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "Contact updated"}), 200


@app.route("/delete_contact/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    contact = Contact.query.get(contact_id)

    if contact is None:
        return jsonify({"message": "Contact not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "Contact deleted"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
