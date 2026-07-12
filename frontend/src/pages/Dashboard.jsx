import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
      

      <div className="max-w-5xl mx-auto mt-10">

        <h2 className="text-3xl font-bold mb-8">
          Dashboard
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to="/books"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold">
              Books
            </h3>

            <p className="mt-3 text-gray-500">
              Browse all available eBooks.
            </p>
          </Link>

          <Link
            to="/orders"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold">
               My Orders
            </h3>

            <p className="mt-3 text-gray-500">
              View your purchased books.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}