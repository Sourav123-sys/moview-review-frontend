

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SignIn from './Components/SignIn/SignIn';
import Signup from './Components/SignUp/Signup';
import Home from './Components/Home/Home';
import ConfirmPassword from './Components/ConFirmAndVerification/ConfirmPassword';
import EmailVerification from './Components/ConFirmAndVerification/EmailVerification';
import ForgetPassword from './Components/ConFirmAndVerification/ForgetPassword';
import { Toaster } from 'react-hot-toast';
import NotFound from './Components/NotFound.js/NotFound';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './Hooks/useTheme';
//import AdminNavigator from './Components/Admin/AdminNavigator/AdminNavigator';
import DashBoard from './Components/Admin/DashBoard';
import Movies from './Components/Admin/Movies';
import Actor from './Components/Admin/Actor';
import AdminNavbar from './Components/Admin/AdminNavbar';
import Header from './Components/Admin/Header';
import axios from "axios";
function App() {
  const { authInfo } = useAuth()
  console.log(authInfo, 'from app')
  const isAdmin = authInfo.profile?.role === 'admin'

  console.log(isAdmin)


  return (
    <div className="App">

      {
        isAdmin ?
          <div className='flex dark:bg-[#192232] bg-white'>
            <AdminNavbar />
          
            <div className="flex-1 p-2 max-w-screen-xl">
            <Header />
              <Routes>
                <Route path='/' element={<DashBoard />}></Route>
                <Route path='/movies' element={<Movies />}></Route>
                <Route path='/actors' element={<Actor />}></Route>



                <Route path='/signin' element={<SignIn />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/resetPassword' element={<ConfirmPassword />}></Route>
                <Route path='/email-verification' element={<EmailVerification />}></Route>
                <Route path='/forgot-password' element={<ForgetPassword />}></Route>
                <Route path='*' element={<NotFound />}></Route>

              </Routes>
            </div>

          </div>



          :
          <>
            <Navbar></Navbar>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/signin' element={<SignIn />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/resetPassword' element={<ConfirmPassword />}></Route>
              <Route path='/email-verification' element={<EmailVerification />}></Route>
              <Route path='/forgot-password' element={<ForgetPassword />}></Route>
              <Route path='*' element={<NotFound />}></Route>

            </Routes>
          </>

      }

      <Toaster />
      <ToastContainer />
    </div>
  );
}





export default App;
