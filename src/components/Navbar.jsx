import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center px-[4vw] py-4 relative bg-[#E3350D] text-white shadow-md">

            <h1 className="text-2xl font-bold">PoKédex</h1>
            <ul className="hidden md:flex gap-6 items-center">
                <li>
                    <a href=""className="hover:text-[#FFDE00] transition-colors duration-300">Home</a></li>
                <li><a href=""className="hover:text-[#FFDE00] transition-colors duration-300">Favorites</a></li>
                <li><a href=""className="hover:text-[#FFDE00] transition-colors duration-300">About</a></li>
            </ul>
            <button
                className="md:hidden text-3xl text-black hover:text-[#FFDE00] transition-colors duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu">
                <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>
            {isOpen && (
                <ul className="absolute top-16 left-0 w-full bg-[#E3350D] shadow-md flex flex-col items-center  gap-4 py-4 md:hidden z-50 text-white">
                    <li><a href=""className="hover:text-[#FFDE00] transition-colors duration-300 font-bold">Home</a></li>
                    <li><a href=""className="hover:text-[#FFDE00] transition-colors duration-300 font-bold">Favorites</a></li>
                    <li> <a href=""className="hover:text-[#FFDE00] transition-colors duration-300 font-bold">About</a></li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
