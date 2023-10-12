import { GoogleAuthProvider,getAuth,signInWithPopup } from "firebase/auth"
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async()=>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth,provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
      })
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/")
    } catch (error) {
      console.log('Unable to sign in with Google.', error)
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick} className="border p-3 rounded-lg bg-red-700 text-white uppercase hover:opacity-95 disabled:opacity-80 border-none outline-none">
      Continue with Google
    </button>
  );
}

export default OAuth