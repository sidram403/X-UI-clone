"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import {app} from '../firebase'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'


const Input = () => {
  const { data: session } = useSession();
  const ImagePickRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false)

  const addImageToPost = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToStorage = () =>{
    setImageFileUploading(true)

    const storage = getStorage(app)
    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile)
    uploadTask.on(
      'state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
      },
      (error) =>{
        console.log(error);
        setImageFileUploading(false)
        setImageFileUrl(null)
        setSelectedFile(null)
        
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUploading(downloadUrl);
          setImageFileUploading(false)
        })
      }
    )

  }

  useEffect(() => {
    if(selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile])
  

  if (!session) return null;
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={session.user.image}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 "
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
          rows="2"
          placeholder="Whats happening"
        ></textarea>
        {selectedFile && (
          <img src={imageFileUrl} alt='image' className="w-full max-h-[250px] object-cover cursor-pointer" />
        )}
        <div className="flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            onClick={() => ImagePickRef.current.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          />
          <input
            className="hidden"
            type="file"
            ref={ImagePickRef}
            accept="image/*"
            onChange={addImageToPost}
          />
          <button
            disabled
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
