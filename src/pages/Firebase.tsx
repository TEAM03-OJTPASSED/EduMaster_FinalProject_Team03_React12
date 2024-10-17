import { useState } from "react";
import { storage } from "../configs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { message } from "antd";

const Firebase = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string>(""); // State to store the input image ID
  const [fetchedImageUrl, setFetchedImageUrl] = useState<string | null>(null); // State for fetched image

  // Upload Image to Firebase
  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    // Upload the image
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        // Get the download URL after uploading
        getDownloadURL(imageRef)
          .then((url) => {
            setImageUrl(url); // Set the uploaded image URL
            message.success("Image uploaded successfully!");
          })
          .catch((error) => {
            message.error("Error getting image URL:", error);
          });
      })
      .catch((error) => {
        message.error("Upload failed", error);
      });
  };

  // Fetch Image from Firebase by ID
  const fetchImageById = () => {
    if (imageId.trim() === "") {
      message.error("Please enter a valid image ID.");
      return;
    }

    const imageRef = ref(storage, `images/${imageId}`);
    getDownloadURL(imageRef)
      .then((url) => {
        setFetchedImageUrl(url); // Set the fetched image URL
      })
      .catch((error) => {
        message.error("Error fetching image:", error);
        alert("No image found for this ID.");
      });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-10/12 flex mt-10">
        {/* Left Column: Upload Image */}
        <div className="w-1/2 flex flex-col justify-center items-center border-r pr-4">
          <h2 className="mb-4 text-lg">Upload Image</h2>
          <input
            type="file"
            className="mb-4"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageUpload(e.target.files[0]);
              }
            }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4 cursor-pointer"
            onClick={uploadImage}
          >
            Upload Image
          </button>

          {/* Display Uploaded Image */}
          {imageUrl && (
            <div className="mt-4">
              <p>Uploaded Image:</p>
              <img src={imageUrl} alt="Uploaded" className="w-full h-auto" />
            </div>
          )}
        </div>

        {/* Right Column: Fetch Image by ID */}
        <div className="w-1/2 flex flex-col justify-center items-center pl-4">
          <h2 className="mb-4 text-lg">Get Image by ID</h2>
          <input
            type="text"
            placeholder="Enter Image ID"
            value={imageId}
            className="border mb-4 p-2 w-full"
            onChange={(e) => setImageId(e.target.value)} // Update the imageId state
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded mb-4 cursor-pointer"
            onClick={fetchImageById}
          >
            Get Image
          </button>

          {/* Display Fetched Image */}
          {fetchedImageUrl && (
            <div className="mt-4">
              <p>Fetched Image:</p>
              <img
                src={fetchedImageUrl}
                alt="Fetched"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Firebase;
