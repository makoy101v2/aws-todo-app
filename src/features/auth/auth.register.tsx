import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { registerUser } from "./services/apiAuthServices";

import styles from "../../ui/Login/auth.login.module.css";
import Loader from "../../ui/custom-loader";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function FeatureAuthLogin() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const emailValue = emailRef.current ? emailRef.current.value : "";
    const passwordValue = passwordRef.current ? passwordRef.current.value : "";

    // Zod validation
    const result = registerSchema.safeParse({
      email: emailValue,
      password: passwordValue,
    });
    if (!result.success) {
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser({
        email: emailValue,
        password: passwordValue,
      });

      if (
        result &&
        result.isSignUpComplete === false &&
        result.nextStep?.signUpStep === "CONFIRM_SIGN_UP"
      ) {
        navigate("/confirm", { state: { email: emailValue } }); // or use query params if preferred
      }
    } catch (error: any) {
      if (error?.message) {
        setError(error.message);
      } else {
        setError("Error registering user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.title}>Register Account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button
          className={styles.button}
          type="submit"
          disabled={loading}
          data-testid="register-btn"
        >
          {loading ? <Loader /> : "Register"}
        </button>
      </form>
    </div>
  );
}

export default FeatureAuthLogin;
