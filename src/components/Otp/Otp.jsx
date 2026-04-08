import { useState, useRef } from "react";
import styles from "./Otp.module.css";
import { Link,  useLocation } from "react-router-dom";
import { verifyOtp } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function VerifyOtp() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate=useNavigate()
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
 
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
    
  
  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      toast.error("Please enter the full 6-digit OTP",{toastId:"one-toast-only"});
      return;
    }

    try {
      const res = await verifyOtp( finalOtp);
      toast.success (res.message || "OTP Verified Successfully!");

      navigate("/Login")
    } catch (err) {
      console.log(err);
      toast.error("Invalid OTP or verification failed",{toastId: "one-toast-only"});
    }
  };

  return (
    <div className={styles.body}>
      <ToastContainer autoClose={1500} />
      <div className={styles.otpcard}>
        <h2>Verify OTP</h2>
        <p>Please enter the 6-digit OTP sent to your registered email.</p>

        <div className={styles.otpbox}>
          <span>Email OTP — sent to {email}</span>

          <div className={styles.otpinputs}>
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleOtpChange(e, i)} 
                onKeyDown={(e)=>handleKeyDown(e,i)}
              />
            ))}
          </div>

          <button className={styles.btn} onClick={handleVerify}>
            Verify Email
          </button>
        </div>

   
    <div className={styles.backlink}>
      Wrong Email <Link to="/Signup">Sign Up</Link>
    </div>
  </div>
</div>

    )
}