import PageHeader from "../../ui/PageHeader";

import styles from "./dashboard.module.css";

function Dashboard() {
  return (
    <>
      <section className={styles.hero}>
        <PageHeader
          title="Your Dashboard"
          subtitle="Overview of your tasks and progress"
          icon="📝"
        />
      </section>
      <section className={styles.stats} aria-label="stats">
        <div className={styles.card}>
          <div>
            <div className={styles.statValue}>12</div>
            <div className={styles.statLabel}>Active</div>
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>Due Today</div>
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <div className={styles.statValue}>98%</div>
            <div className={styles.statLabel}>Completion</div>
          </div>
        </div>
      </section>
      <section className={styles.tasks} aria-label="tasks">
        <div className={styles.empty}>
          <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>
            No tasks yet
          </div>
          <div style={{ color: "var(--muted)" }}>
            Create your first task to get started
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <button className={styles.btn}>Add First Task</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
