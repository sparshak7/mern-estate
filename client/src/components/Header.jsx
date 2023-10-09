import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Switcher from "./Switcher";

const Header = () => {
  return (
    <header className="bg-[#F3E1E1] shadow-md dark:bg-[#212121]">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-sky-400/90">Your</span>
            <span className="text-red-600/100">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 dark:text-white">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="hover:underline">Sign In</li>
          </Link>
          <li>
            <Switcher />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
