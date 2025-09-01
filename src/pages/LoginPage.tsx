import FeatureAuthLogin from "../features/auth/auth.login";
import styles from "../ui/Login/auth.login.module.css";

function LoginPage() {
  return (
    <div className={styles.loginPageContainer}>
      <FeatureAuthLogin />
    </div>
  );
}

export default LoginPage;
