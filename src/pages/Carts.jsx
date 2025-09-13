import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Carts() {
  const[productsData , setProducts] = useState([])
  

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("products")) || []
    const update = getData.map(item => ({
      ...item, quantity :1, maxQuantity: item.quantity
    }))
    setProducts(update)
  },[])

  const getCustomer = localStorage.getItem("customer")

  let customerOrder = ""

  if(getCustomer){
    customerOrder = JSON.parse(getCustomer).data.customer.name
  }

  console.log(customerOrder)

  

  const handleOrder = () => {
    if(!customerOrder){
      alert("please login customer or enter customer name")
    }
    axios.post("http://localhost:5000/create/order", {
      "customer": customerOrder,
      "products": productsData.map((item) => ({
        "productId": item._id,
        "quantity": item.quantity
      }))
    }).then((res) => {
      if(res.data.error){
        alert(res.data.error)
      }
      else{
        alert("success order")
        localStorage.removeItem("products")
        setProducts([])
      }
    }).catch(error => console.log(error))
  }

  const handleDelete = (id) => {
    const removeItems = productsData.filter((item) => item._id !== id)
    localStorage.setItem("products", JSON.stringify(removeItems))
    setProducts(removeItems)
  }

  const TotalPrice = productsData.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)),0)

  // incremenet
  const handleIncrement = (id) => {
    setProducts(prd => prd.map(
      item => item._id === id ? {...item, quantity: item.quantity < item.maxQuantity ?  item.quantity +1 : item.quantity} : item
    ))
  }
  // Deccremenet
  const handleDecrement = (id) => {
    setProducts(prd => prd.map(
      item => item._id === id ? {...item, quantity: item.quantity > 1 ? item.quantity -1 : item.quantity} : item
    ))
  }
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Shopping Cart */}
        <div className="col-span-2 bg-white rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">PRODUCT DETAILS</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            {
              productsData.map((items) => {
                return <tbody>
              <tr className="border-b">
                <td className="py-4 flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/allImages/${items.prImage}`}
                    alt="Iphone 16"
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{items.name}</h3>
                    <p className="text-sm text-purple-600">Smart Phone</p>
                    <button onClick={() => handleDelete(items._id)} className="text-red-500 text-sm mt-1 cursor-pointer">Remove</button>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <button onClick={() => handleDecrement(items._id)} className="px-2 py-1 border rounded">-</button>
                    <span>{items.quantity}</span>
                    <button onClick={() => handleIncrement(items._id)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </td>
                <td className="text-gray-700">${items.price}</td>
                <td className="font-semibold">${items.price*items.quantity}</td>
              </tr>
            </tbody>
              })
            }
          </table>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between mb-4">
            <p className="text-gray-600">ITEMS</p>
            <p className="font-medium">{productsData.length}</p>
          </div>

          <h4 className="mb-2 text-sm font-medium">Shipping</h4>
          <select className="w-full border p-2 rounded mb-4">
            <option>Choose delivery option</option>
            <option>Standard - $20</option>
            <option>Express - $40</option>
          </select>

          <h4 className="mb-2 text-sm font-medium">Promo Code</h4>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Enter your code"
              className="flex-1 border p-2 rounded-l"
            />
            <button className="bg-red-500 text-white px-4 rounded-r">
              Apply
            </button>
          </div>

          <div className="flex justify-between font-semibold mb-4">
            <h3>TOTAL COST</h3>
            <h4>${TotalPrice}</h4>
          </div>

          <button onClick={handleOrder} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carts;
