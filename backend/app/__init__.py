from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
# Create the SQLAlchemy object
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()



app = Flask(__name__, instance_relative_config=True)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ebookstore.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    
app.config["SECRET_KEY"] = "my-secret-key"
app.config["JWT_SECRET_KEY"] = "your-secret-key"

db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
jwt.init_app(app)

from app import models
from app import routes
