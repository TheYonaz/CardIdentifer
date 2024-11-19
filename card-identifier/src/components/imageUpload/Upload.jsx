import React, { useState } from "react";

export const Upload = ({ onImageeUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a temporary URL for the image preview
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {imagePreview && (
          <img src={imagePreview} alt="uploadedImage" width="300vw" />
        )}
        <label htmlFor="fileUpload">Add card image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
    </>
  );
};
