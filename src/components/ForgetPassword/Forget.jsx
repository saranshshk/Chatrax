import styles from "./forget.module.css";
import { useState } from "react";
import { resetPass } from "../api/Api";
import { verifyResetPass } from "../api/Api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Forget() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [verifyForm, setVerifyForm] = useState({
    otp: "",
    new_password: "",
  });

  const handleEmail = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
        try {
        setloading(true)
      const res = await resetPass(data);
      setStep(2);
      
    } catch (err) {
      const backendMsg = err.response?.data?.Error;
      if (!backendMsg){
        toast.error("Internal error", {toastId: "one-toast-only"})
      }
      else{
        toast.error(backendMsg,{toastId: "one-toast-only"})
      }
    }
    finally{
      setloading(false)
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      otp: verifyForm.otp,
      new_password: verifyForm.new_password,
    };
    console.log(data);
    try {
      setloading(true)
      const res = await verifyResetPass(data);
      navigate("/login")
      
    } catch (err) {
      const backendMsg = err.response?.data?.message;
      if (!backendMsg){
        toast.error("Internal error", {toastId: "one-toast-only"})
      }
      else{
        toast.error(backendMsg,{toastId: "one-toast-only"})
      }
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer autoClose={1500} />
      {/* <div className={styles.card}> */}
      <div className={`${styles.card} ${step === 2 ? styles.expand : ""}`}>
        <h2 className={styles.title}>Reset Password</h2>

        {step == 1 && (
          <>
            <form onSubmit={handleEmail}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.input}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className={styles.button} disabled={loading} type="submit">
              {loading ? "Sending..." : "Send Otp"}
              </button>
            </form>
          </>
        )}

        {step == 2 && (
          <>
            <form onSubmit={handleVerify}>
              <input
                name="otp"
                value={verifyForm.otp}
                type="text"
                inputMode="numeric"
                placeholder="Enter OTP"
                className={styles.input}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setVerifyForm({
                    ...verifyForm,
                    otp: value,
                  });
                }}
                maxLength={6}
              />
              <input
                type="password"
                placeholder="New Password"
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
                name="new_password"
                onChange={(e) => {
                  const value = e.target.value.trim();
                  setVerifyForm({
                    ...verifyForm,
                    new_password: value,
                  });
                }}
              />
              <button className={styles.button} disabled={loading} type="submit">
              {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
