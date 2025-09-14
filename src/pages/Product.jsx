import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Product() {
    const [data, setData] = useState([])

    const handleReadData = () => {
        axios.post("http://localhost:5000/read/product")
            .then(res => setData(res.data))
            .catch(err => console.error(err))
    }

    useEffect(() => { handleReadData() }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/delete/product/${id}`)
            .then(() => { alert("Delete success"); handleReadData() })
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Product List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Avg Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item._id} className="border-b hover:bg-gray-100 transition">
                                <td>{item.prId}</td>
                                <td><img src={`http://localhost:5000/allImages/${item.prImage}`} alt={item.name} className="w-12 h-12 object-cover rounded-md"/></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.desc}</td>
                                <td>{item.category}</td>
                                <td>{item.status==="Available"?"✅":"❌"}</td>
                                <td>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < Math.round(item.avgRating || 0) ? "text-yellow-400" : "text-gray-300"}>★</span>
                                    ))}
                                    ({item.reviews?.length || 0})
                                </td>
                                <td className="flex gap-2">
                                    <Link to={`/updateproduct/${item._id}`}><button className="text-green-500">Edit</button></Link>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product
