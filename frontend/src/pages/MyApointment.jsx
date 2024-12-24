import React, { useContext, useEffect, useState } from "react";
import { doctors } from "./../assets/assets_frontend/assets";
import { AppContext } from "./../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const MyApointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [
    " ",
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormate = (slotData) => {
    const dateArray = slotData.split("_");

    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());

        //console.log(data.appointments)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      
        //console.log('get doctor data is avaliable ?',  getDoctorsData )

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
     
    }
  }, [token]);

  return (
    <div>
      <p className=" pb-3 mt-12  font-medium text-zinc-700 border-b ">
        My appointments
      </p>
      <div className="flex flex-col">
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:gap-6 sm:flex py-2 border-b "
            key={index}
          >
            <div className="w-32 bg-indigo-50">
              <img src={item.docData.image} alt="" />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1"> Address</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                {" "}
                <span className="text-sm text-neutral-800 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormate(item.slotData)}{" "}
              </p>
            </div>
            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 px-4 border border-stone-300 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">
                  Pay here
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 px-4 border border-stone-300 rounded-lg hover:bg-red-600 hover:text-white transition duration-300 ease-in-out"
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-red-600 text-center font-semibold sm:min-w-48 py-2 px-4 border border-stone-300 rounded-l hover: transition duration-300 ease-in-out"
                >
                    appointment Canceled
                </button>
              )}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApointment; 
