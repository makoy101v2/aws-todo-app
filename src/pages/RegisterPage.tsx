import FeatureAuthRegister from "../features/auth/auth.register";
import styles from "../ui/Login/auth.register.module.css";

function RegisterPage() {
  return (
    <div className={styles.RegisterPageContainer}>
      <FeatureAuthRegister />
    </div>
  );
}

export default RegisterPage;
