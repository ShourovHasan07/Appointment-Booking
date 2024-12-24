import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";


const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorsList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Api for doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "invalid credentials form doctor controlers ",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.jwt_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials from doctor controler js",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to get doctor appointment for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to mark  Appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "Appointment  Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed " });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to cancel   Appointment  for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return res.json({ success: true, message: "Appointment  Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get dashboard  data for  doctor panel  

const doctorDashboard= async (req,res) =>{
    try {

        const {docId} = req.body

        const appointments = await appointmentModel.find({ docId });

        let earning = 0

        appointments.map((item) => {
          if (item.isCompleted || item.payment) {

            earning += item.amount 
          }
        })

        let patients = []

        appointments.map((item)=>{
         if (!patients.includes(item.userID)) {
            patients.push(item.userID)
            
         }
        })

        const dashData = {
            earning,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData })

    }
    
    catch (error) {console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

export {
  changeAvailablity,
  doctorsList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard
};
