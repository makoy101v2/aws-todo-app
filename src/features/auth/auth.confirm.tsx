import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { confirmationCode } from "./services/apiAuthServices"; // Adjust the import path as necessary

import styles from "../../ui/Login/auth.login.module.css";

function FeatureAuthLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValue = emailRef.current ? emailRef.current.value : "";
    const codeValue = codeRef.current ? codeRef.current.value : "";

    try {
      const result = await confirmationCode({
        email: emailValue,
        code: codeValue,
      });
      if (result?.isSignUpComplete) navigate("/login");
    } catch (error: any) {
      const message =
        error?.message ||
        error?.errors?.[0]?.message ||
        "An error occurred during confirmation. Please try again.";
      setErrorMessages([message]);
    }
  };

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.title}>Confirm Registration</h1>
      {/* Error messages */}
      {errorMessages.length > 0 && (
        <div
          role="alert"
          style={{
            color: "#b00020",
            background: "#fdecea",
            border: "1px solid #f5c6cb",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          {errorMessages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
      )}
      <form className={styles.form} onSubmit={handleConfirm}>
        <label className={styles.label}>
          <input
            ref={emailRef}
            defaultValue={email}
            className={styles.input}
            type="email"
            placeholder="Enter your email"
            required
          />
        </label>
        <label className={styles.label}>
          <input
            ref={codeRef}
            className={styles.input}
            type="text"
            placeholder="Enter your code"
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default FeatureAuthLogin;
