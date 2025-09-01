import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import z from "zod";

import { loginUser } from "./services/apiAuthServices";

import styles from "../../ui/Login/auth.login.module.css";
import Loader from "../../ui/custom-loader";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function FeatureAuthLogin() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function checkUser() {
      try {
        await getCurrentUser();
        navigate("/dashboard");
      } catch {
        // User not logged in, do nothing
      }
    }
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const emailValue = emailRef.current?.value ?? "";
    const passwordValue = passwordRef.current?.value ?? "";

    // Zod validation
    const result = LoginSchema.safeParse({
      email: emailValue,
      password: passwordValue,
    });

    if (!result.success) {
      setErrorMessages([result.error.issues[0].message]);
      setLoading(false);
      return;
    }

    try {
      const result = await loginUser({
        email: emailValue,
        password: passwordValue,
      });

      if (result?.isSignedIn) navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.message ||
        error?.errors?.[0]?.message ||
        "An error occurred during confirmation. Please try again.";
      setErrorMessages([message]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.title}>Sign In</h1>
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
      <form className={styles.form} onSubmit={handleLogin}>
        <label className={styles.label}>
          <input
            ref={emailRef}
            className={styles.input}
            type="email"
            placeholder="Enter your email"
            required
          />
        </label>
        <label className={styles.label}>
          <input
            ref={passwordRef}
            className={styles.input}
            type="password"
            placeholder="Enter your password"
            required
          />
        </label>
        <button className={styles.button} type="submit">
          {loading ? <Loader /> : "Login"}
        </button>
        <div className={styles.linksRow}>
          <a className={styles.link} href="/forgot-password">
            Forgot password?
          </a>
          <span className={styles.divider}>|</span>
          <a className={styles.link} href="/register">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}

export default FeatureAuthLogin;
