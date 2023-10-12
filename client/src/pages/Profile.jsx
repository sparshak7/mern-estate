import { useSelector } from "react-redux"

const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-center text-3xl font-semibold my-7'>Profile Details</h1>
      <form className="flex flex-col gap-5">
        <img src={currentUser.avatar} alt="profile" className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2" />
        <input type="text" id='username' placeholder='Username...' className="p-3 border rounded-lg" />
        <input type="email" id='email' placeholder='Email...' className="p-3 border rounded-lg" />
        <input type="text" id='password' placeholder='Password...' className="p-3 border rounded-lg" />
        <button className="p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile