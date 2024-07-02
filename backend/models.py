from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)


# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)
