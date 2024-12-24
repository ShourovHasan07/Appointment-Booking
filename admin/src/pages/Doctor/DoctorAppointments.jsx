import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from './../../assets/assets';


const DoctorAppointments = () => {

  const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment} = useContext (DoctorContext)
 const {calculateAge,slotDateFormate,} = useContext (AppContext)
  useEffect (()=>{
    
    if(dToken){
      getAppointments()
    }

  },[dToken])

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-3 text-lg font-semibold text-gray-700">All Appointments</p>
  
      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-7 items-center border-b bg-gray-50 text-gray-600 py-3 px-6 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
  
        {/* Appointment List */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:grid grid-cols-7 gap-3 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
          >
            {/* Serial Number */}
            <p className="hidden sm:block">{index + 1}</p>
  
            {/* Patient Details */}
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full border border-gray-300"
                src={item.userData.image}
                alt="Patient"
              />
              <p className="font-medium">{item.userData.name}</p>
            </div>
  
            {/* Payment Method */}
            <div>
              <p
                className={`text-xs px-3 py-1 rounded-full ${
                  item.payment ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>
  
            {/* Patient Age */}
            <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>
  
            {/* Appointment Slot */}
            <p>{item.slotData}</p>
  
            {/* Fees */}
            <p className="font-medium text-gray-700">${item.amount}</p>
  
            {/* Actions */}
            <div className="flex items-center gap-3">
              {item.cancelled ? (
                <p className="text-red-500 font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-medium">Completed</p>
              ) : (
                <>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title="Cancel Appointment"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 h-8 cursor-pointer transition-transform transform hover:scale-110"
                    src={assets.tick_icon}
                    alt="Complete"
                    title="Complete Appointment"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default DoctorAppointments