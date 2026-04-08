import Login from "./components/login/login"
import { Routes,Route } from "react-router-dom"
import PrivateRoute from "./components/Route/PrivateRoute"
import PublicRoute from "./components/Route/PublicRoute"
import Signup from "./components/signup/Signup"
import VerifyOtp from "./components/Otp/Otp"
function App(){
  return(
  <div>
    <Routes>
      <Route path="/"element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/VerifyOtp"element={<VerifyOtp/>}/>
    </Routes>
  </div>
  )
}
export default App




