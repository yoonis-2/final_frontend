import { Link, useNavigate } from "react-router-dom";

function Header() {
    const getCustomer = localStorage.getItem("customer")

    const navigate = useNavigate()
   
    const handleLogOut = () => {
        localStorage.clear()
        navigate("/")
    }

    
    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-2xl font-bold text-gray-800">BookHaven</h1>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <ul className="flex space-x-6">
                        <Link to="/"><li className="hover:text-blue-500 cursor-pointer">Home</li></Link>
                        <li className="hover:text-blue-500 cursor-pointer">Categories</li>
                        <li className="hover:text-blue-500 cursor-pointer">Best Sellers</li>
                        <li className="hover:text-blue-500 cursor-pointer">Contact</li>
                    </ul>
                </nav>

                {/* Buttons */}
                <div className="flex space-x-3">
                    { getCustomer ? 
                        (
                            <>
                            <div> 
                                {/* <h1 className=" text-2xl font-bold bg-yellow-500 w-10 h-10 rounded-full text-black text-center items-center">{JSON.parse(getCustomer)?.data?.customer?.name?.[0] || "?" }</h1> */}
                                <h1 className=" text-2xl font-bold bg-yellow-500 w-10 h-10 rounded-full text-black text-center items-center">{JSON.parse(getCustomer).data?.customer.name[0]}</h1>
                            </div>
                            <button onClick={handleLogOut} className="px-2 py-2 border-2 border-blue-500 text-black  rounded-md ">
                                Log-Out
                            </button>
                            </>
                        ) : (
                            <div className="flex gap-5">
                            <Link to="/login">
                                <button className="flex items-center gap-1 px-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                                <i className="fa-solid fa-user"></i> LogIn
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="px-2 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md">
                                Register Customers
                                </button>
                            </Link>
                            
                            </div>
                        )
                        }

                        <Link to="/carts">
                                <button className="flex items-center gap-1 px-4 py-2 bg-[#847837] text-white rounded-md">
                                <i className="fa-solid fa-cart-shopping"></i> Cart
                                </button>
                            </Link>

                    
                    
                    
                </div>
            </div>
        </header>
    );
}

export default Header;
