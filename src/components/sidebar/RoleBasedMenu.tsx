import { Link, useLocation } from "react-router-dom";
import { Role } from "types/roles";
import styles from "./RoleBasedMenu.module.scss";

export interface MenuTab {
  path: string;
  icon: string;
  title: string;
  roles: Role[];
  activePaths: string[];
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}
interface RoleBasedMenuProps {
  currentRole: Role;
  menuTabs: MenuTab[];
}

export const RoleBasedMenu: React.FC<RoleBasedMenuProps> = ({
  currentRole,
  menuTabs,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const filteredTabs = menuTabs.filter((tab) =>
    tab.roles.includes(currentRole)
  );

  const handleClickMenu = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: MenuTab
  ) => {
    if (tab.onNavigate) {
      e.preventDefault();
      tab.onNavigate(e, tab.path);
    }
  };

  return (
    <div
      className={styles.menu}
      style={{
        display: "flex",
        flexDirection: ["/admin", "/super-admin", "/sale"].some((path) =>
          currentPath.startsWith(path)
        )
          ? "column"
          : "row",
      }}
    >
      {filteredTabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`${styles.menu_item} ${
            tab.activePaths.some((path) => currentPath.startsWith(path))
              ? styles.active
              : ""
          }`}
          onClick={tab.onNavigate ? (e) => handleClickMenu(e, tab) : undefined}
        >
          <img src={tab.icon} alt="Icon" />
          <div className={styles.menu_title}>{tab.title}</div>
        </Link>
      ))}
    </div>
  );
};
