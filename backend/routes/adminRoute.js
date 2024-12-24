import express from "express";

import { addDoctor,allDoctors,loginAdmin,appointmentAdmin, appointmentCancel,adminDashboard } from '../controllers/adminControllers.js'; // Note the .js extension

import upload from '../middlewares/multer.js';

// Ensure the `.js` extension is included
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";


const adminRouter = express.Router();
adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailablity);
adminRouter.get('/appointments', authAdmin, appointmentAdmin);
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;
