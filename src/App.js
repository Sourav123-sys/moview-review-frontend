

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SignIn from './Components/SignIn/SignIn';
import Signup from './Components/SignUp/Signup';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Signup></Signup>
    </div>
  );
}

export default App;
