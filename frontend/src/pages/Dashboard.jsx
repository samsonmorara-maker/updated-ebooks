import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-blue-600 text-white p-4 flex justify-between">

        <h1 className="text-2xl font-bold">
          eBook Store
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </nav>

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