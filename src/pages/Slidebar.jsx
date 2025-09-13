import axios from "axios";
import { useEffect, useState } from "react";

function Slidebar() {
    const [totalIncome, setTotalIncome] = useState([]);
    const[topcustomers,setTopCustomers] = useState([]);

     const handleTopCustomers =() => {
        axios.get("http://localhost:5000/getTopCustomer/order").then((res) => {
            setTopCustomers(res.data)
        })

    }


    const handleGetIncome =() => {
        axios.get("http://localhost:5000/getIncome/order").then((res) => {
            setTotalIncome(res.data[0].totalIncome)
        })
    }

    useEffect(()=> {
        handleGetIncome()
        handleTopCustomers()
    },[])
  return (
    <div className="p-6 space-y-6">
      {/* Total Income Card */}
      <div className="shadow-md rounded-2xl p-6 w-fit bg-gradient-to-r from-orange-300 to-orange-600">
        <h2 className="text-lg font-semibold text-gray-800">Total Income</h2>
        <h3 className="text-2xl font-bold text-white">${totalIncome}</h3>
      </div>

      {/* Table Section */}
      <div className="shadow-md rounded-2xl p-6 bg-gradient-to-r from-orange-400 to-orange-700">
        <table className="table-auto border-collapse w-full text-white">
          <thead>
            <tr className="bg-black/20">
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-left">TotalSpent</th>
              <th className="border px-4 py-2 text-left">TotalOrder</th>
            </tr>
          </thead>
          {
            topcustomers.map((items) => {
                return <tbody>
            <tr className="hover:bg-black/20">
              <td className="border px-4 py-2">{items.customer}</td>
              <td className="border px-4 py-2">{items.totalOrders}</td>
              <td className="border px-4 py-2">${items.totalSpent}</td>
            </tr>
          </tbody>
            })
          }
        </table>
      </div>
    </div>
  )
}

export default Slidebar
