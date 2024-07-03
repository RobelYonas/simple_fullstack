from config import db


class Contact(db.Model):
    """
    Represents a contact.

    Attributes:
        id (int): The unique identifier of the contact.
        first_name (str): The first name of the contact.
        last_name (str): The last name of the contact.
        email (str): The email address of the contact.
    """
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=True)

    def to_dict(self):
        """
        Converts the contact object into a dictionary.

        Returns:
            dict: A dictionary representing the contact.
        """
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email
        }

    @classmethod
    def find_by_id(cls, contact_id):
        """
        Finds a contact by its id.

        Args:
            contact_id (int): The id of the contact to find.

        Returns:
            dict: A dictionary representing the contact if found, otherwise an error message.
        """
        # Query the database for a contact with the given id
        contact = cls.query.get(contact_id)

        if contact:
            return contact.to_dict()
        else:
            return {"error": "Contact could not be found."}
