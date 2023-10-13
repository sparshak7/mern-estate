import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { useSnackbar } from "notistack";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        enqueueSnackbar("There was an error signing in. Try again.", {
          variant: "error",
        });
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
      enqueueSnackbar("Succesfully signed in.", {
        variant: "success",
      });
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto mt-5">
      <h1 className="text-3xl text-center font-semibold my-7 dark:text-white">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter email..."
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter password..."
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80 border-none outline-none"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 justify-center items-center">
        <p className="dark:text-white">Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700 dark:text-blue-400">Sign Up.</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-500 mt-5 text-center">{error}</p>} */}
    </div>
  );
};

export default SignIn;
