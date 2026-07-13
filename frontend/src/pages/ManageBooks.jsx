import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch("https://updated-ebooks.onrender.com/books");
      const data = await response.json();

      if (response.ok) {
        setBooks(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function saveBook(e) {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const url = editingId
    ? `https://updated-ebooks.onrender.com/books/${editingId}`
    : "https://updated-ebooks.onrender.com/books";

  const method = editingId ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      setFormData({
        title: "",
        author: "",
        price: "",
      });

      setEditingId(null);

      fetchBooks();
    }
  } catch (error) {
    console.log(error);
  }
}

 
  async function deleteBook(id) {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://updated-ebooks.onrender.com/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        fetchBooks();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function editBook(book) {
  setEditingId(book.id);

  setFormData({
    title: book.title,
    author: book.author,
    price: book.price,
  });
}

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-8">

          <h1 className="text-4xl font-bold mb-8">
            Manage Books
          </h1>


          <form
            onSubmit={saveBook}
            className="bg-white rounded-xl shadow-lg p-6 mb-10"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Add New Book
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
            {editingId ? "Update Book" : "Add Book"}
            </button>

          </form>

          
          <h2 className="text-2xl font-semibold mb-6">
            All Books
          </h2>

          {books.length === 0 ? (
            <p>No books available.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold">
                    {book.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {book.author}
                  </p>

                  <p className="text-green-600 font-bold mt-4">
                    KSH {book.price}
                  </p>

                  <div className="flex gap-3 mt-6">

                   <button
                    onClick={() => editBook(book)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                    >
                    Edit
                    </button>

                    <button
                      onClick={() => deleteBook(book.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}