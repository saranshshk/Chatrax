import { useState } from "react";
import { logout } from "../../api/Api";
import { deleteAccount } from "../../api/Api";
import styles from "./Setting.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Setting({ open }) {
    const navigate=useNavigate()
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  if (!open) return null;
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("authToken");
      window.location.reload();
      console.log("logout");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    const form = {
      password: password,
    };
    try {
      const res = await deleteAccount(form);
      localStorage.removeItem("authToken");

      window.location.reload();
      console.log("account deleted ");
    } catch (err) {
      const backenderr = err.response?.data?.Error;
      const backendMsg=err.response?.data?.message
      if(!err.response){
        return alert("Internal error")
      }
      else if(!backenderr){
        return alert(backendMsg)
      }
      else {
        return alert(backenderr)
      }
    }
    console.log(form);
  };
  return (
    <>
      <div className={styles.container}>
        <button onClick={() => setShow(!show)}>Delete account</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/Forget-Password")}>
          Forgot Password
        </button>
        {show && (
          <form onSubmit={handleDeleteAccount}>
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit">Confirm Delete</button>
          </form>
        )}
      </div>
    </>
  );
}
