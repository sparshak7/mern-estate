import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate=useNavigate();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username..."
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email..."
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password..."
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80 border-none outline-none">
          {loading ? "Loading..." : "Sign Up"}
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
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    </div>
  );
}

export default SignUp