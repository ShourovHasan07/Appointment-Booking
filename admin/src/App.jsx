import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorDashBoard from './pages/Doctor/DoctorDashBoard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {



 const {aToken } = useContext(AdminContext)
 const {dToken } = useContext(DoctorContext)



  return aToken  || dToken ? (
    <div className='bg-[#F8F9FD]'>

<ToastContainer></ToastContainer>
<Navbar></Navbar>
<div className='flex items-start'>
  <Sidebar></Sidebar>
<Routes>
{/* admin routes */}
  <Route path='/' element={<></>} />
  <Route path='/admin-dashboard' element={<Dashboard/>} />
  <Route path='/all-appointments' element={<AllAppointments/>} />
  <Route path='/add-doctor' element={<AddDoctor/>} />
  <Route path='/doctor-list' element={<DoctorsList/>} />
{/* doctor routs */}
<Route path='/doctor-dashboard' element={<DoctorDashBoard/>} />
<Route path='/doctor-appointments' element={<DoctorAppointments/>} />
<Route path='/doctor-profile' element={<DoctorProfile/>} />

</Routes>


</div>

    </div>
  ):(<>

<Login></Login>
<ToastContainer></ToastContainer>

  </>)
}

export default App