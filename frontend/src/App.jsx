import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
        {/* <Home /> */}
        <Routes>
          <Route path='/' element= {authUser ? <Home /> : <Navigate to={"/login"} />}/>
          <Route path='/login' element= {authUser ? <Navigate to="/" /> : <Login />}/>
          <Route path='/signup' element= {authUser ? <Navigate to="/" /> : <SignUp />}/>
          {/* Means if we have a value for authUser, means some user signed up and we navigate user to home page */}
        </Routes>
        <Toaster/>
        {/* We use toaster to show error alerts on website */}
    </div>
  )
}

export default App
