import React, { useState } from "react";
import useUpdateUserProfile from "./useUpdateUserProfile";
import toast from "react-hot-toast";
import BtnLoadingSpinner from "../../UI/BtnLoadingSpinner";

export default function ProfileImageForm({ userData, onClose }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { isUpdating, updateError, updateUserProfile } = useUpdateUserProfile();
  // Function to handle the image preview
  const handleImageChange = (e) => {
    // e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  function handleProfileImageUpload(e) {
    e.preventDefault();
    if (
      userData?.profileImageName &&
      userData?.profileImageName === profileImage.name
    ) {
      toast.error(
        "profile image is already uploaded , you can try uploading a different one ",
      );
      setPreviewImage(null);
      setProfileImage(null);
      return;
    }
    updateUserProfile(
      {
        id: userData.documentId,
        profileImage: profileImage,

        previousImageName: userData?.profileImageName || "",
      },
      { onSuccess: () => onClose() },
    );
  }

  return (
    <div className="flex h-fit items-center justify-center bg-gradient-to-r from-slate-400 via-slate-500 to-gray-500">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Update Profile Image
        </h2>

        <form onSubmit={handleProfileImageUpload}>
          {/* Image preview */}
          <div className="mb-4 flex justify-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="h-24 w-24 rounded-full border-4 border-pink-400 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* File input */}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="profileImage"
            >
              Choose Profile Picture
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition duration-150 focus:border-pink-300 focus:ring focus:ring-pink-200"
            />
          </div>

          {/* Submit button */}
          <button
            disabled={isUpdating}
            type="submit"
            className={`mt-4 w-full rounded-lg ${isUpdating ? "bg-slate-300 hover:bg-slate-300" : " bg-pink-500  hover:bg-pink-600"} flex justify-center gap-1 px-4 py-2 text-white shadow-md transition duration-150`}
          >
            Update Image
            {isUpdating && <BtnLoadingSpinner />}
          </button>
        </form>
      </div>
    </div>
  );
}
