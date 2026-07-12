import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:5000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setOrders(data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">
            You haven't purchased any books yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold">
                  {order.book.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  Author: {order.book.author}
                </p>

                <p className="text-green-600 font-bold mt-4">
                  ${order.book.price}
                </p>

                <p className="mt-4 text-sm text-blue-600">
                   Purchased
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}