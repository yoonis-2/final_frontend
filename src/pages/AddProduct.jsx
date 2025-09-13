import axios from "axios"
import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function AddProduct() {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [img, setImage] = useState(null)

    
   const navigate = useNavigate()

   const handleCreate = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/create/product", formData)
    .then(() => {
        toast.success("product add success 🚀")
        setTimeout(() => {
            navigate("/product")
            
        }, 2000);
    })
   }
    
    const formData = new FormData()

    formData.append("name", name)
    formData.append("quantity", quantity)
    formData.append("price", price)
    formData.append("desc", description)
    formData.append("category", category)
    formData.append("img", img)

    

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Register Product</h2>
            
            <div>
                <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Price</label>
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
             <div>
                <label className="block text-gray-700 font-medium mb-1">Category</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Image</label>
                <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    className="w-full text-gray-700"
                />
            </div>

            <div>
                <button onClick={handleCreate} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                    Add Product
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default AddProduct
