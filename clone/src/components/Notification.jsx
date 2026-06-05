import React,{useState , useEffect} from 'react'
 import { useUpdateFriendRequest } from "../hooks/useUpdateFriendRequest";
 import { useGetFriendRequests } from "../hooks/useGetFriendRequests";
import { useParams } from "react-router-dom";
   
const Notification = () => {
 const { id } = useParams();
   const { requests: friendRequests} = useGetFriendRequests();
    const { updateFriendRequest } = useUpdateFriendRequest(id);

  return (
    <div className='absolute w-auto top-14 right-3 bg-[#333334] shadow-lg rounded-md p-2 text-white'>
            <h3 className='font-bold mb-2 text-xl'>Notifications</h3>
            {friendRequests.length > 0 ? (
              friendRequests.map((req) => (
                <div key={req.id} className='flex items-center gap-2 p-2 border-b border-gray-700'>
                  <img src={req.profile_pic} className='w-8 h-8 rounded-full' />
                  <span>{req.first_name} {req.last_name}</span>
                  <div className='ml-auto flex gap-2'>
                    {req.status === "pending" ? (
                      <>
                        <button className='bg-gray-500 text-white px-2 py-1 rounded hover:bg-blue-500' onClick={() => updateFriendRequest({ requestId: req.id, action: "accept" })}>Accept</button>
                        <button className='bg-gray-500 text-white px-2 py-1 rounded hover:bg-red-500' onClick={() => updateFriendRequest({ requestId: req.id, action: "reject" })}>Decline</button>
                      </>
                    ) : req.status === "accepted" ? (
                      <span className='text-green-400 font-semibold'>Accepted ✅</span>
                    ) : req.status === "rejected" ? (
                      <span className='text-red-400 font-semibold'>Denied ❌</span>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className='p-2 w-70'>No new notifications</div>
            )}
          </div>
  )
}

export default Notification