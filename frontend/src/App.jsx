import {Navigate, Route ,Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useAuthContext } from "./context/AuthContext";
import {Toaster} from 'react-hot-toast';


function App() {
  const {auth} = useAuthContext();
  return (
		<div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={auth ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={auth ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={auth ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <Toaster />
		</div>
	);
  
}

export default App
