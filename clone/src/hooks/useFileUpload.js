
import { useState, useRef } from 'react';

export function useFileUpload() {
  const [imagePreview, setImagePreview] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreviews]);
    setImgFiles((prev) => [...prev, ...files]);
  };

  const clearFiles = () => {
    setImagePreview([]);
    setImgFiles([]);
  };

  return { imagePreview, imgFiles, fileInputRef, handleFileButtonClick, handleFileChange, clearFiles };
}