import Login from "./components/login/login"
import { Routes,Route } from "react-router-dom"
import PrivateRoute from "./components/Route/PrivateRoute"
import PublicRoute from "./components/Route/PublicRoute"
import Signup from "./components/signup/Signup"
import VerifyOtp from "./components/Otp/Otp"
import Forget from "./components/ForgetPassword/Forget"
import ChatMain from "./components/Chat/ChatMain"
function App(){
  return(
  <div>
    <Routes>
      <Route path="/" element={<PrivateRoute><ChatMain/></PrivateRoute>}/>
      <Route path="/Login"element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>}/>
      <Route path="/VerifyOtp"element={<PublicRoute><VerifyOtp/></PublicRoute>}/>
      <Route path="/Forget-Password"element={<Forget/>}/>
    </Routes>
  </div>
  )
}
export default App




