import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from './../models/appointmentModel.js';
import userModel from './../models/userModel.js';

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    console.log(req.body);  // Add this line for debugging

    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const available = req.body.available !== undefined ? req.body.available : true;

    const imageFile = req.file;
    

    console.log({ name, email, password, speciality, degree, experience, about, available, fees, address }, imageFile,);

    // Checking for all required data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !available || !fees || !address) {
      return res.json({ success: false, message: 'Missing details' });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
    const imageUrl = imageUpload.secure_url;

    // Parse address if needed
    let parsedAddress;
    try {
      if (typeof address === 'string') {
        parsedAddress = JSON.parse(address);
      } else {
        parsedAddress = address;
      }
    } catch (error) {
      return res.json({ success: false, message: "Invalid address format" });
    }

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      available,
      date: Date.now()
    };

    // Save the new doctor in the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully!" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// api for admin login

 const loginAdmin = async (req,res)=>{
  try {
     const {email,password}= req.body
     if (email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       const token = jwt.sign(email+password,process.env.JWT_SECRET)
       res.json({success:true,token})
     } else {
      res.json({success:false,message: "invalid credentials"})
     }

  } catch (error) {

    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
 }

 //API  to get all doctors list form admin pannel

 const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to all doctor  appointment list 

 const appointmentAdmin = async (req,res)=>{
    try {

      const appointments = await appointmentModel.find({})

      res.json({success:true,appointments})
      

    } catch (error) {
      
      console.log(error);
    res.json({ success: false, message:error.message});


    }
 }
 

 // api for appointment cancellation 

 
const appointmentCancel  = async (req, res) => {
  try {
    const {appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

   

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked || {}; // Check if slots_booked exists, if not, set as an empty object

    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = []; // Initialize slotDate if it doesn't exist
    }
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: 'Appointment Canceled' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// api to get dashboard data  for  admin panel 
const adminDashboard = async (req,res)=>{

  try {

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})
    const dashData = {
      doctors:doctors.length,
      appointments : appointments.length,
      patients : users.length,
      latestAppointments : appointments.reverse().slice(0,5)


    }

    res.json({success:true,dashData})


    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }

}



export {addDoctor,loginAdmin,allDoctors,appointmentAdmin,appointmentCancel,adminDashboard };
