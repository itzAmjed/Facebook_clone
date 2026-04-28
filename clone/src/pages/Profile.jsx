import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFileUpload } from "../hooks/useFileUpload";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { MdOutlineAddPhotoAlternate, MdOutlineOndemandVideo } from "react-icons/md";
import { FaUserTag, FaCamera } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { useFriendStatus } from "../hooks/useFriendStatus";
import { useSendFriendRequest } from "../hooks/useSendFriendRequest";
import { useUpdateFriendRequest } from "../hooks/useUpdateFriendRequest";

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { fileInputRef, handleFileButtonClick, handleFileChange } = useFileUpload();
  const queryClient = useQueryClient();

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  // -------- FETCH PROFILE USER --------
  const { data: profileUser, isLoading } = useQuery({
    queryKey: ["profileUser", id],
    queryFn: () =>
      fetch(`/api/profiles.php?id=${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((r) => r.json())
        .then((data) => (data.success ? data.user : null)),
    enabled: !!id,
  });

  // inside Profile:
const { friendStatus, relation } = useFriendStatus(id);
const { sendFriendRequest } = useSendFriendRequest(id);
const { updateFriendRequest } = useUpdateFriendRequest(id);

  // -------- COVER PHOTO UPLOAD --------
  const handleCoverChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("cover_photo", file);
    formData.append("user_id", user.id); // ✅ fixed — was using undefined user.id

    const res = await fetch("/api/updateCover.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      // ✅ invalidate profileUser cache so it refetches with new cover
      queryClient.invalidateQueries({ queryKey: ["profileUser", id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  };

  // -------- PROFILE PIC UPLOAD --------
  const handleProfileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("user_id", user.id); // ✅ fixed — was using undefined user.id

    const res = await fetch("/api/updateProfile.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      // ✅ invalidate both caches so UI updates everywhere
      queryClient.invalidateQueries({ queryKey: ["profileUser", id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  };

  if (isLoading) return <p className='text-white p-4'>Loading profile...</p>;
  if (!profileUser) return <p className='text-white p-4'>Profile not found</p>;

  const isOwnProfile = String(profileUser.id) === String(user?.id);

  return (
    <div className='bg-[#1a1a1a] min-h-screen text-white'>
      {/* Cover Photo */}
      <div className='w-full h-90 bg-[#1a1a1a] rounded-b-lg'>
        <img src={profileUser.cover_photo} alt='Cover' className='w-full h-full object-cover rounded-b-lg' />
      </div>

      {isOwnProfile && (
        <div className='max-w-5xl mx-auto px-4 -mt-10 flex justify-end'>
          <input type='file' ref={coverInputRef} onChange={handleCoverChange} className='hidden' accept='image/*' />
          <button onClick={() => coverInputRef.current.click()} className='bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1'>
            <FaCamera /> Edit cover photo
          </button>
        </div>
      )}

      <div className='max-w-5xl mx-auto px-4 relative'>
        <div className='absolute -top-20 left-6'>
          <img src={profileUser.profile_pic} alt='Profile' className='w-40 h-40 rounded-full border-4 border-gray-900 object-cover' />
        </div>

        {isOwnProfile && (
          <div className='absolute left-33 top-10'>
            <input type='file' ref={profileInputRef} onChange={handleProfileChange} className='hidden' accept='image/*' />
            <button onClick={() => profileInputRef.current.click()} className='bg-[#333334] text-white p-2 rounded-full cursor-pointer flex items-center gap-1'>
              <FaCamera />
            </button>
          </div>
        )}

        <div className='pt-24 pb-6 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-700'>
          <div>
            <h1 className='text-2xl font-bold'>
              {profileUser.first_name} {profileUser.last_name}
            </h1>
            <p className='text-gray-400'>19 friends</p>
          </div>

          <div className='flex gap-2 mt-4 md:mt-0'>
            {isOwnProfile ? (
              <button className='bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600'>Edit Profile</button>
            ) : (
              <>
                {friendStatus === "none" && (
                  <button onClick={sendFriendRequest} className='bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600'>
                    <IoMdPersonAdd className='inline-block mr-1' /> Add Friend
                  </button>
                )}

                {friendStatus === "pending" && relation === "sender" && (
                  <button disabled className='bg-gray-500 px-4 py-2 rounded-lg cursor-not-allowed'>
                    Request Sent ✅
                  </button>
                )}

                {friendStatus === "friends" && (
                  <button disabled className='bg-gray-500 px-4 py-2 rounded-lg cursor-not-allowed'>
                    Friends ✅
                  </button>
                )}

                {/* ✅ fixed — no longer uses undefined req variable */}
                {friendStatus === "pending" && relation === "receiver" && (
                  <div className='flex gap-2'>
                    <button onClick={() => updateFriendRequest("accept")} className='bg-gray-500 text-white px-2 py-1 rounded hover:bg-blue-500'>
                      Accept
                    </button>
                    <button onClick={() => updateFriendRequest("reject")} className='bg-gray-500 text-white px-2 py-1 rounded hover:bg-red-500'>
                      Decline
                    </button>
                  </div>
                )}

                <button className='bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500'>Message</button>
              </>
            )}
            <button className='bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600'>⋮</button>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex gap-6 mt-2 text-gray-400 border-b border-gray-700'>
          {["Posts", "About", "Friends", "Photos", "Check-ins", "Sports", "More"].map((tab) => (
            <button key={tab} className='py-3 hover:text-white border-b-2 border-transparent hover:border-blue-600'>
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
          <div className='space-y-4'>
            <div className='bg-[#333334] p-4 rounded-xl'>
              <h2 className='font-bold mb-2'>Intro</h2>
              <p className='text-gray-300'>Nothin special</p>
              <p className='text-gray-400 mt-2'>
                💼 Works at <span className='font-semibold'>NationTV</span>
              </p>
            </div>

            <div className='bg-[#333334] p-4 rounded-xl'>
              <h2 className='font-bold mb-2'>Photos</h2>
              <div className='grid grid-cols-3 gap-2'>
                <div className='bg-gray-700 h-20 rounded'></div>
                <div className='bg-gray-700 h-20 rounded'></div>
                <div className='bg-gray-700 h-20 rounded'></div>
              </div>
              <button className='text-blue-500 mt-2 text-sm'>See All Photos</button>
            </div>
          </div>

          <div className='md:col-span-2 space-y-4'>
            <div className='bg-[#333334] p-4 rounded-xl'>
              <input className='w-full p-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none' placeholder='Write something...' />
              <div className='flex gap-4 mt-3'>
                <input type='file' multiple ref={fileInputRef} onChange={handleFileChange} className='hidden' accept='image/*' />
                <button onClick={handleFileButtonClick} className='flex items-center gap-2 text-gray-400 cursor-pointer hover:bg-gray-600 rounded-md py-2 px-4'>
                  <MdOutlineAddPhotoAlternate className='text-2xl text-green-500' />
                  <p>Photo/Video</p>
                </button>
                <button className='flex items-center gap-2 text-gray-400 cursor-pointer hover:bg-gray-600 rounded-md py-2 px-4'>
                  <MdOutlineOndemandVideo className='text-2xl text-purple-500' />
                  <p>Reel</p>
                </button>
                <button className='flex items-center gap-2 text-gray-400 cursor-pointer hover:bg-gray-600 rounded-md py-2 px-4'>
                  <FaUserTag className='text-2xl text-red-500' />
                  <p>Tag people</p>
                </button>
              </div>
            </div>

            <div className='bg-[#333334] p-4 rounded-xl'>
              <p className='text-gray-300'>Example post placeholder.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
