import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch("http://127.0.0.1:5000/books");

      const data = await response.json();

      setBooks(data);

    } catch (error) {
      console.log(error);
    }
  }
  async function buyBook(bookId) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://127.0.0.1:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        book_id: bookId,
      }),
    });

    const data = await response.json();

    alert(data.message);

  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }
}

  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          Available Books
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-2xl font-bold">
                {book.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {book.author}
              </p>

              <p className="text-xl font-semibold mt-4">
                KSH {book.price}
              </p>

             <button
                onClick={() => buyBook(book.id)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                Buy
                </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}