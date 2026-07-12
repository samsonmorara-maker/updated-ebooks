import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-white text-blue-600 font-semibold"
        : "hover:bg-blue-500"
    }`;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
           eBook Store
        </Link>

        <div className="flex items-center gap-4">

          <Link
            to="/dashboard"
            className={linkStyle("/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            to="/books"
            className={linkStyle("/books")}
          >
            Books
          </Link>

          <Link
            to="/orders"
            className={linkStyle("/orders")}
          >
            My Orders
          </Link>

            <Link
            to="/manage-books"
            className={linkStyle("/manage-books")}
                >
                Manage Books
                </Link>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}