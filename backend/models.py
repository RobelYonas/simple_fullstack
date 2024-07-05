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
