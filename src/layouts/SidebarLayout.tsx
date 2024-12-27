import Sidebar from "components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./SidebarLayout.module.scss";

function SidebarLayout() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar />
      <div className={styles.content_with_header}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;
