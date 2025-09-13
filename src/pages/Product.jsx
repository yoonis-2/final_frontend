import axios from "axios";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

function Product() {
    const[data, setData] = useState([])
    


    const handleReadData = () => {
        axios.post("http://localhost:5000/read/product").then((res) => {
            setData(res.data)
        })
    }

    useEffect(() => {
        handleReadData()
    },[])

    const handleDelete = (id) => [
        axios.delete(`http://localhost:5000/delete/product/${id}`).then(() => {
            alert("succes delete")
            handleReadData()
        })
    ]
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Product List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">#</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Image</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Product Name</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Price</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Description</th>
               <th className="py-3 px-4 text-left text-gray-600 font-semibold">Category</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Status</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>
          {
            data.map((items) => {
                return <tbody>
            <tr className="border-b hover:bg-gray-100 transition">
              <td className="py-3 px-4">{items.prId}</td>
              <td className="py-3 px-4">
                <img
                  src={`http://localhost:5000/allImages/${items. prImage}`}
                  alt="Iphone"
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="py-3 px-4">{items.name}</td>
              <td className="py-3 px-4">{items. quantity}</td>
              <td className="py-3 px-4">{items.price}</td>
              <td className="py-3 px-4">{items.desc}</td>
              <td className="py-3 px-4">{items.category}</td>
              <td className="py-3 px-4">
                <span className={`${items.status === "Available" ? "text-green-600" : "text-red-500" } font-semibold`}>{items.status}</span>
              </td>
              <td className="py-3 px-4 flex gap-3">
                <Link to={`/updateproduct/${items._id}`}><button className="text-green-500 mt-2 text-xl">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button></Link>
                <button className="text-red-500 mt-2 text-xl">
                  <i onClick={() => handleDelete(items._id)} className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            {/* Ku celi tr-ka items badan haddii loo baahdo */}
          </tbody>
                
            })
          }

        </table>
      </div>
    </div>
  );
}

export default Product;
