import React from "react";
import Features from "../components/One-time-use/features";
import Cart from "./Carts";
import Carts from "./Carts";

function Home() {
    return (
        <div>

        <div className="bg-gray-50  flex justify-evenly  ">
            <div className="flex justify-evenly   gap-10 px-4">
                
                {/* Left - Text */}
                <div className="text-left mt-16">
                    <h3 className="text-5xl font-bold text-gray-800">
                        Discover Your Next <br /> Favorite Book
                    </h3>
                    <p className="mt-4 text-gray-600 text-xl">
                        Explore our wide collection and find the perfect read for your next adventure.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
                            Shop Now
                        </button>
                        <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition">
                            Browse Categories
                        </button>
                    </div>
                </div>

                {/* Right - Image */}
                <div>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/046/789/747/non_2x/female-wear-hijab-read-book-3d-design-free-png.png"
                        alt="Reading book"
                        className="w-96 h-96 "
                        />
                </div>

            </div>
        </div>
        <Features/>

        </div>
    );
}

export default Home;
