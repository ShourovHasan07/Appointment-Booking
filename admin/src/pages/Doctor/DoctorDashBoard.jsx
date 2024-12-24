import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "./../../../../frontend/src/assets/assets_admin/assets";

const DoctorDashBoard = () => {
  const { dToken, dashData, setDashData, getDashData,completeAppointment } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className=" text-xl font-semibold text-gray-600">
                $ {dashData.earning}
              </p>
              <p className=" text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className=" text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>

              <p className=" text-gray-400"> Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className=" text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className=" text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white  ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border ">
            <div className=" flex-1 pt-4 border border-t-0">
              <div className="flex items-center  gap-2.5 px-4 py-4 mt-10 border-b ">
                <img src={assets.list_icon} alt="" />

                <p className="font-semibold ">Latest Bookings </p>
              </div>

              {dashData.latestAppointments.map((item, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className="rounded-full w-10"
                    src={item.userData.image}
                    alt=""
                  />

                  <div className="flex-1">
                    <p>{item.userData.name}</p>
                    <p>{item.slotData}</p>
                  </div>

                  {<div className="flex items-center gap-3">
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
            </div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashBoard;
