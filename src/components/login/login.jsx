import styles from "./login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Api";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [form, setform] = useState({ username: "", password: "" });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      toast.error("Please fill all field", { toastId: "one-toast-only" });
      return;
    }

    try {
      setloading(true);

      const res = await login(form);
      const token = res.data.token_key;
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", res.data.user_id);
        navigate("/");
      } else {
        toast.error("Login failed: Token not found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid username or password");
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <ToastContainer autoClose={1500} />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.bg}></div>
            <div className={styles.tagline}>
            <h2>Connect. Chat. Share.</h2>
            
            <p>Experience seamless conversations that feel alive 💬</p>
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.heading}>Chatrax</h2>
            {/* <div className={styles.right_container}> */}
            {/* <div className={styles.input_con}> */}
            <form onSubmit={handlelogin}>
              <input
                type="text"
                placeholder="Email or Username"
                name="username"
                value={form.username}
                onChange={handlechange}
                className={styles.inputbox}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handlechange}
                className={styles.inputbox}
              />

              <div className={styles.forget} >
                <Link to="/Forget-Password" className={styles.forget}>Forget Password</Link>
           </div>

              <button type="submit" disabled={loading} className={styles.btn}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            
            <div className={styles.bottomtext}>
                Don't have a Account? 
              <Link to="/Signup" >
               Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
