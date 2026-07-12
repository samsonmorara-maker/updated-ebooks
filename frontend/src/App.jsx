import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Orders from "./pages/Orders";
import ManageBooks from "./pages/ManageBooks";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
            path="/manage-books"
        element={
         <ProtectedRoute>
        <ManageBooks />
        </ProtectedRoute>
        }
        />
    </Routes>
  );
}

export default App;