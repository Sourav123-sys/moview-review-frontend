

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

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
    
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signin' element={<SignIn  />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/resetPassword' element={<ConfirmPassword/>}></Route>
        <Route path='/email-verification' element={<EmailVerification/>}></Route>
        <Route path='/forgot-password' element={<ForgetPassword/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
     
      </Routes>
      <Toaster />
      <ToastContainer />
    </div>
  );
}

export default App;
