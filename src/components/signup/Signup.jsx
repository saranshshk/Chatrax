import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import { signup } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


import { useEffect, useState } from "react";
export default function Signup() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    password: "",
    email: "",
    username: "",
  });
  const [loading, setloading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.email || !form.username || !form.password) {
      return toast.error("Please fill all fields",{toastId: "one-toast-only"});
    }
    if (form.password !== confirmPassword) {
      toast.error("Password Not match",{toastId: "one-toast-only"});
      return;
    }
    

    try {
      setloading(true);

      // STEP 1 → Send details to backend (email OTP)
      const res = await signup(form);

      navigate("/VerifyOtp", { state: { email: form.email } });
      
    } catch (err) {
      const backenderr = err.response?.data?.Error;
      const backendMsg= err.response?.data?.message;
      if (!err.response) {
        toast.error("Internal Error",{toastId: "one-toast-only"});
      }
      else if (!backenderr){
        toast.error(backendMsg,{toastId: "one-toast-only"});
      }
      else{
        toast.error(backenderr,{toastId: "one-toast-only"});
      }
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
          <h2>
            Join the <span>Conversation.</span>
          </h2>
          <p>
            Chat freely, share openly, and experience the digital world that
            feels real.
          </p>
        </div>
        <div className={styles.right}>
          <h2>Chatrax</h2>
          <form onSubmit={handleSignup}>
            <div className={styles.inputbox1}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              className={styles.inputbox}
              required
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={form.username}
              className={styles.inputbox}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              className={styles.inputbox}
              required
            />
            <input
              name="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputbox}
              required
            />
  </div>
            <button type="submit" className={styles.btn} disabled={loading}>
              {" "}
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
          <div className={styles.bottomtext}>
              Already have an account?
            <Link to="/Login"> Login </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
