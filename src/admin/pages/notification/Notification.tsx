import { useState } from "react";
import styles from "./Notification.module.scss";
import NotificationForm from "./notification-form/NotificationForm";

function Notification() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab_button} ${
            activeTab === 0 ? styles.active : ""
          }`}
          onClick={() => setActiveTab(0)}
        >
          admin_detail_patient_page.createNotification
        </button>
        <button
          className={`${styles.tab_button} ${
            activeTab === 1 ? styles.active : ""
          }`}
          onClick={() => setActiveTab(1)}
        >
          admin_detail_patient_page.notificationHistory
        </button>
      </div>

      <div className={styles.tab_content}>
        {activeTab === 0 && (
          <div className={styles.tab_panel}>
            <NotificationForm />
          </div>
        )}
        {/* {activeTab === 1 && (
          <div className={styles.tab_panel}>
            <NotificationHistory />
          </div>
        )} */}
      </div>
    </>
  );
}

export default Notification;
