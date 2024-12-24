import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

import { assets } from './../assets/assets_frontend/assets';
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    
    try {

      const fromData =  new FormData()
      fromData.append('name',userData.name)
      fromData.append('phone',userData.phone)
      fromData.append('address',JSON.stringify(userData.address))
      fromData.append('gender',userData.gender)
      fromData.append('dob',userData.dob)

      image && fromData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',fromData,{headers:{token}})
      
      if (data.success) {
        toast.success(data.message)

        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  };

  return (
    userData && (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        {
          isEdit?
          <label htmlFor="image">
             <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={image? URL.createObjectURL(image):userData.image} alt="" />
              <img className="w-10 absolute bottom-12 right-12 " src={image? '' : assets.upload_icon } alt="" />

             </div>
             <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image"  hidden />
            
          </label>
          :<img

          src={userData.image}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
/>

        }



        
        

        <div className="text-center mb-4">
          {isEdit ? (
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full text-center"
              value={userData.name || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-xl font-semibold">{userData.name}</p>
          )}
        </div>

        <hr className="mb-4" />

        <div>
          <p className="text-lg font-semibold mb-2">CONTACT INFORMATION</p>
          <div className="mb-4">
            <p>Email:</p>
            <p>{userData.email}</p>
          </div>

          <div className="mb-4">
            <p>Phone:</p>
            {isEdit ? (
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={userData.phone || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <p>Address:</p>
            {isEdit ? (
              <p>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />

                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </p>
            ) : (
              <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>

          <div className="mb-4">
            <p>Gender:</p>
            {isEdit ? (
              <select
                className="border border-gray-300 p-2 rounded w-full"
                value={userData.gender || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          <div className="mb-4">
            <p>Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                className="border border-gray-300 p-2 rounded w-full"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        <div>
          {isEdit ? (
            <button
              onClick={updateUserProfileData }
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
