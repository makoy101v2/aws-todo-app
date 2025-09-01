import styles from "./PageHeader/pageheader.module.css";

interface Props {
  title: string;
  subtitle: string;
  icon: string;
}

function PageHeader(props: Props) {
  return (
    <div className={styles.heroLeft}>
      <div className={styles.brand} aria-hidden>
        {props.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.subtitle}>{props.subtitle}</div>
      </div>
    </div>
  );
}

export default PageHeader;
