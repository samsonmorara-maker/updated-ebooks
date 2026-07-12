from flask import request, jsonify
from app import app, db, bcrypt
from app.models import User, Book, Order
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({
            "message":"Invalid email or password"
        }),401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "message":"Invalid email or password"
        }),401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "message": "Login successful",
        "access_token": access_token
    })

@app.route("/books", methods=["GET"])
def get_books():

    books = Book.query.all()
    books_list = [book.to_dict() for book in books]

    return jsonify(books_list)

@app.route("/books", methods=["POST"])
@jwt_required()
def create_book():

    data = request.get_json()

    title = data["title"]
    author = data["author"]
    price = data["price"]

    new_book = Book(
        title=title,
        author=author,
        price=price
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify({
        "message": "Book created successfully"
    }), 201