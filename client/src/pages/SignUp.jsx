import React from 'react'
import {Link} from "react-router-dom"

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username..."
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email..."
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password..."
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80 border-none outline-none">
          Sign Up
        </button>
        <button className="border p-3 rounded-lg bg-red-700 text-white uppercase hover:opacity-95 disabled:opacity-80 border-none outline-none">
          Continue with Google
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center items-center">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In.</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp