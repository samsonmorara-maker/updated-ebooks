from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Create the SQLAlchemy object
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # Database configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ebookstore.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Secret key (we'll improve this later)
    app.config["SECRET_KEY"] = "my-secret-key"

    # Connect SQLAlchemy to the app
    db.init_app(app)
    migrate.init_app(app, db)

    from app import models

    return app