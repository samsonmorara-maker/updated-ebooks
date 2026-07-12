from flask import request, jsonify
from app import app, db, bcrypt
from app.models import User, Book, Order

@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to the eBook Store API"
    })

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data["name"]
    email = data["email"]
    password = data["password"]

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({
            "message":"Email already exists"
        }), 400
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(
        name=name,
        email=email,
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "message":"User created successfully"
    }),201