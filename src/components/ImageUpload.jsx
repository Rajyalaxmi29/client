import React, { useState, useRef } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);         // For preview
  const [file, setFile] = useState(null);           // For upload
  const [uploadedUrl, setUploadedUrl] = useState(""); // For uploaded image URL
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
      setUploadedUrl(""); // Reset uploaded image if selecting a new one
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedUrl(`http://localhost:5000/images/${data.filename}`);
        alert("Image uploaded successfully!");
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleUploadClick}>Choose Images</button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {image && (
        <div>
          <img src={image} alt="Preview" style={{ width: 200, margin: "10px 0" }} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      {uploadedUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedUrl} alt="Uploaded" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
