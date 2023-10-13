import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector(state=>state.user);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        // setImageUploadError(false);
        enqueueSnackbar(`${files.length} ${files.length === 1 ? 'image' : 'images' } succesfully uploaded.`, {
          variant: "success",
        });
        setUploading(false);
      }).catch((err)=>{
        // setImageUploadError('Image upload failed. (2MB max per image)');
        enqueueSnackbar("Image upload failed. (2MB max per image)", {
          variant: "error",
        });
        setUploading(false);
      })
    } else{
      // setImageUploadError('Please upload an image. (Max of 6 images)')
      enqueueSnackbar("Image upload failed. (2MB max per image)", {
        variant: "error",
      });
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) =>{
    setFormData({...formData, imageUrls: formData.imageUrls.filter((_,i)=> i!==index)})
  }

  const handleChange = (e)=>{
    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({...formData, type: e.target.id})
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setFormData({...formData, [e.target.id]: e.target.checked})
    }

    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({...formData, [e.target.id]: e.target.value})
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(formData.imageUrls.length < 1){
      enqueueSnackbar("Please upload at least one image.", {
        variant: "error",
      });
      return;
    }

    if(+formData.regularPrice < +formData.discountPrice && formData.offer){
      enqueueSnackbar("Discounted price cannot be higher than regular price.", {
        variant: "error",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/listing/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...formData, userRef: currentUser._id}),
      })
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        enqueueSnackbar("There was an error submitting the form. Try again.", {
          variant: "error",
        });
        return;
      }
      setLoading(false);
      enqueueSnackbar("Listing succesfully submitted.", {
        variant: "success",
      });
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("There was an error submitting the form. Try again.", {
        variant: "error",
      });
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 dark:text-white">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded-lg"
            id="title"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap dark:text-white">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "sale"}
                type="checkbox"
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "rent"}
                type="checkbox"
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.parking}
                type="checkbox"
                id="parking"
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.furnished}
                type="checkbox"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.offer}
                type="checkbox"
                id="offer"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p className="dark:text-white">Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p className="dark:text-white">Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p className="dark:text-white">Regular price</p>
                <span className="text-xs dark:text-white">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p className="dark:text-white">Discounted price</p>
                  <span className="text-xs dark:text-white">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold dark:text-white">
            Images:
            <span className="font-normal text-gray-600 ml-2 dark:text-white">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4 dark:text-white">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {/* <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p> */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Saving..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
