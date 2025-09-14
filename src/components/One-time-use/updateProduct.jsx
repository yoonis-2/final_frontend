import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function UpdateProduct() {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [img, setImage] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    const handleReadSingle = () => {
        axios.get(`http://localhost:5000/readSingle/product/${params.id}`)
            .then((res) => {
                setName(res.data[0].name)
                setQuantity(res.data[0].quantity)
                setPrice(res.data[0].price)
                setDescription(res.data[0].desc)
                setImage(res.data[0].prImage)
                setCategory(res.data[0].category)
            })
            
    }

    // update
    const handleUpdate = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("quantity", quantity)
        formData.append("price", price)
        formData.append("desc", description)
        formData.append("img", img)
        formData.append("category", category)

        axios.put(`http://localhost:5000/readSingle/product/${params.id}`, formData)
            .then(() => {
                toast.success("Product updated successfully! 🎉")
                setTimeout(() => {
                    navigate('/product')
                }, 2000) // 2 seconds kadib ayuu u leexanayaa
            })
            
    }

    useEffect(() => {
        handleReadSingle()
    }, [])

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Update Product</h2>

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
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

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
                <button
                    onClick={handleUpdate}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Upload Product
                </button>
            </div>

            {/* Toast Container waa inuu ku jiraa JSX */}
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default UpdateProduct
