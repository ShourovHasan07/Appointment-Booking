import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Apontment = () => {
  const { docId } = useParams();
  const { doctors,backendUrl,token, getDoctorsData } = useContext(AppContext);
  const daysOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
    const navigate= useNavigate()


 

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocslots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  const getAvailableSlots = async () => {
    // Ensure docInfo is available before running the function
    if (!docInfo) return;
  
    setDocslots([]);
  
    // Get the current date
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      // Get date for the current day in the loop
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      // Set ending time for the current day
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // End time set to 9:00 PM
  
      // Adjust starting time if it's the current day
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
  
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
  
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;
  
        // Check if the slot is available, using optional chaining to avoid errors
        const isSlotAvailable =
          !(docInfo?.slots_booked?.[slotDate]?.includes(slotTime));
  
        if (isSlotAvailable) {
          // Add available slot to the array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
  
        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      setDocslots((prev) => [...prev, timeSlots]);
    }
  };
  

   const bookAppointment = async () =>{
    if(!token){
      toast.warn('first Login than book appointment')

      return navigate ('/login')

    }

 try {

  const date = docSlots[slotIndex][0].datetime

  let day = date.getDate()

  let month = date.getMonth() +1
  let year = date.getFullYear()

  const slotDate = day + "_"+ month + "_" + year

  const {data } = await axios.post(backendUrl + "/api/user/book-appointment",{docId,slotDate,slotTime},{headers:{token}})
  
  if (data.success) {
    toast.success(data.message)
   getDoctorsData()

    navigate('/my-appointment')
    
  } else{
    toast.error(data.message)
  }


 } catch (error) {

  console.log(error)
  toast.error(error.message)
  
 }

   }

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/*doctors details  */}

        <div className="flex  flex-cols sm:flex-row gap-4 ">
          <div>
            <img
              className=" bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          {/* doc info like name ,degree , exprence  */}

          <div
            className="flex-1 border border-gray-600 rounded-lg p-8 py-7 bg-white mx-2
            sm:mx-0 -mt-20 sm:mt-0"
          >
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-900">
              <p>
                {docInfo.degree}-{docInfo.speciality}{" "}
              </p>
              <button className=" py-0.5 px-2 border text-xs rounded-full ">
                {docInfo.experience}
              </button>
            </div>
            {/* doctors about  */}
            <div>
              <p className="flex items-center gap-3 font-medium mt-3 text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4 ">
              Appointment fee:{" "}
              <span className="text-gray-600"> ${docInfo.fees}</span>{" "}
            </p>
          </div>
        </div>
        {/* Booking slots  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex == index
                      ? "bg-primary text-white "
                      : "border border-gray-600"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>

                  <p>{item[0] && item[0].datetime.getDate()} </p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-600"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <div>
            <button onClick={bookAppointment} className=" bg-primary rounded-full  hover:shadow-xl transition-all duration-300  transform hover:scale-105  mt-10 font-semibold text-white py-5 px-8 ">
              {" "}
              Book an appointment
            </button>
          </div>
        </div>
          
          {/*  relatet doctor component  */}
          <RelatedDoctors docId={ docId}  speciality = {docInfo.speciality}></RelatedDoctors>

      </div>
    )
  );
};

export default Apontment;
