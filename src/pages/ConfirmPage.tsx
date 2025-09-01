import FeatureAuthConfirm from "../features/auth/auth.confirm";
import styles from "../ui/Login/auth.register.module.css";

function ConfirmPage() {
  return (
    <div className={styles.RegisterPageContainer}>
      <FeatureAuthConfirm />
    </div>
  );
}
export default ConfirmPage;
