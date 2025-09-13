import { Link } from "react-router-dom";

function Dashboard() {
  const handleLogOut = () => {
    localStorage.removeItem("admin");
  }
  return (
    <div className="w-64 bg-gray-100 min-h-screen p-6 shadow-md">
   <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <ul className="flex flex-col gap-3">
        <Link to="/dashboard"><li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Dashboard</li></Link>
        <Link to="/product"><li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Product</li></Link>
       <Link to="/registerproduct"><li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Add Product</li></Link>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Customer</li>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Order</li>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Add Order</li>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Reports</li>
        <li  className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Setting</li>
        <Link to="/login"><li onClick={handleLogOut} className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Logout</li></Link>
      </ul>
    </div>
  );
}

export default Dashboard;
