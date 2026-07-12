from app import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    orders = db.relationship("Order", back_populates="user")

    def __repr__(self):
        return f"<User {self.name}>"


class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    orders = db.relationship("Order", back_populates="book")
    
    def __repr__(self):
        return f"<Book {self.title}>"
    

    def to_dict(self):
        return {
            "id" : self.id,
            "title":self.title,
            "author":self.author,
            "price":self.price
        }
    

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)
    user = db.relationship("User", back_populates="orders")
    book = db.relationship("Book", back_populates="orders")
    def __repr__(self):
        return f"<Order {self.id}>"
    

    def to_dict(self):
        return {
            "id": self.id,
            "book": self.book.to_dict()
        }
    
    def __repr__(self):
        return f"<Order {self.id}>"