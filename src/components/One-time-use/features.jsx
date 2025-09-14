import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Features() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [ratingInputs, setRatingInputs] = useState({});
    const [userName, setUserName] = useState("");

    const handleReadData = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                `http://localhost:5000/read/product${category ? `?category=${encodeURIComponent(category)}` : ''}`
            );
            setProducts(response.data);
            
            if (response.data.length === 0) {
                setError("No products found. Please try a different category.");
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products. Please check if the server is running.");
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleReadData();
    }, [category]);

    const handleRatingChange = (productId, field, value) => {
        setRatingInputs(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    const submitRating = async (productId) => {
        const input = ratingInputs[productId] || {};
        
        if (!input.rating) {
            toast.error("Please select a rating");
            return;
        }

        try {
            await axios.post("http://localhost:5000/rating", {
                productId,
                rating: Number(input.rating),
                comment: input.comment || "",
                userName: userName || "Anonymous"
            });
            
            toast.success("Rating submitted successfully!");
            
            // Reset form
            setRatingInputs(prev => ({
                ...prev,
                [productId]: { rating: 0, comment: "" }
            }));
            
            // Refresh products to show updated ratings
            handleReadData();
        } catch (err) {
            console.error("Rating submission error:", err);
            toast.error(err.response?.data?.message || "Error submitting rating");
        }
    };

    const renderStars = (rating, size = "text-lg") => {
        return (
            <div className={`flex ${size}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="flex bg-gray-100 min-h-screen p-6 gap-8">
            {/* Sidebar Filter */}
            <div className="w-64 bg-white shadow-md rounded-lg p-5 h-fit">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Categories</h3>
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="category"
                            value=""
                            checked={category === ""}
                            onChange={() => setCategory("")}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span>All Categories</span>
                    </label>
                    {["Smart-Phone", "Tv", "Laptop", "Desk-Top"].map(cat => (
                        <label key={cat} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="category"
                                value={cat}
                                checked={category === cat}
                                onChange={() => setCategory(cat)}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
                
                {/* User Name Input */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name (for reviews)
                    </label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border p-2 rounded text-sm"
                    />
                </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Loading products...</span>
                    </div>
                ) : error ? (
                    <div className="text-center p-8 bg-white rounded-lg shadow">
                        <div className="text-red-500 text-xl font-semibold mb-2">{error}</div>
                        <button 
                            onClick={handleReadData}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                            Try Loading Products Again
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-lg shadow">
                        <div className="text-gray-500 text-xl font-semibold mb-2">No products found</div>
                        <button 
                            onClick={handleReadData}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                            Refresh Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map(product => {
                            const input = ratingInputs[product._id] || { rating: 0, comment: "" };
                            
                            return (
                                <div key={product._id} className="bg-white shadow-lg rounded-xl p-5 flex flex-col gap-4 hover:shadow-2xl transition">
                                    <img 
                                        src={`http://localhost:5000/allImages/${product.prImage}`} 
                                        alt={product.name} 
                                        className="w-full h-48 object-contain rounded-md" 
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                                        }}
                                    />
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                                        <p className={`text-sm font-medium px-2 py-1 rounded ${product.status === "Available" ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"}`}>
                                            {product.status}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-bold text-blue-600">${product.price}</h4>
                                        <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
                                    </div>
                                    
                                    {/* Product Rating Display */}
                                    <div className="flex items-center gap-2">
                                        {renderStars(product.averageRating || 0)}
                                        <span className="text-sm text-gray-500">
                                            ({product.totalRatings || 0} reviews)
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 line-clamp-2">{product.desc}</p>

                                    {/* Rating Input Form */}
                                    <div className="border-t pt-3 mt-2">
                                        <h5 className="font-medium text-gray-700 mb-2">Rate this product</h5>
                                        
                                        {/* Star Rating Input */}
                                        <div className="flex items-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => handleRatingChange(product._id, "rating", star)}
                                                    className={`text-2xl ${input.rating >= star ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500 transition`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                            <span className="text-sm text-gray-600 ml-2">
                                                {input.rating > 0 ? `${input.rating} star${input.rating > 1 ? 's' : ''}` : 'Select rating'}
                                            </span>
                                        </div>
                                        
                                        {/* Comment Input */}
                                        <textarea
                                            value={input.comment}
                                            onChange={e => handleRatingChange(product._id, "comment", e.target.value)}
                                            placeholder="Your review (optional)"
                                            className="w-full border p-2 rounded text-sm mb-2"
                                            rows="2"
                                        />
                                        
                                        {/* Submit Button */}
                                        <button
                                            onClick={() => submitRating(product._id)}
                                            disabled={!input.rating}
                                            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded text-sm transition"
                                        >
                                            Submit Rating
                                        </button>
                                    </div>

                                    {/* Display Existing Ratings */}
                                    {product.ratings && product.ratings.length > 0 && (
                                        <div className="border-t pt-3">
                                            <h6 className="font-medium text-gray-700 mb-2">Customer Reviews</h6>
                                            <div className="space-y-3 max-h-40 overflow-y-auto">
                                                {product.ratings.map((rating, index) => (
                                                    <div key={index} className="text-sm">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-medium">
                                                                {rating.userName}
                                                            </span>
                                                            {renderStars(rating.rating, "text-sm")}
                                                        </div>
                                                        {rating.comment && (
                                                            <p className="text-gray-600">{rating.comment}</p>
                                                        )}
                                                        <p className="text-xs text-gray-400">
                                                            {new Date(rating.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default Features;