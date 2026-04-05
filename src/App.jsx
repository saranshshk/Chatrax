import Login from "./components/login/login"
import { Routes,Route } from "react-router-dom"
import PrivateRoute from "./components/Route/PrivateRoute"
import PublicRoute from "./components/Route/PublicRoute"
function App(){
  return(
  <div>
    <Routes>
      <Route path="/"element={<Login/>}/>
    </Routes>
  </div>
  )
}
export default App




