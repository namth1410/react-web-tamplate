import { RootState } from "appdata/store";
import PriceIcon from "assets/icons/price.svg";
import MiraboImg from "assets/img/mirabo-logo.svg";
import { PathNames } from "constants/pathNames";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Roles } from "types/roles";
import { MenuTab, RoleBasedMenu } from "./RoleBasedMenu";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  const myselfRedux = useSelector((state: RootState) => state.myselfRedux);

  const menuTabs: MenuTab[] = useMemo(
    () => [
      // Admin menu
      {
        path: `${PathNames.ADMIN}${PathNames.NOTIFICATION}`,
        icon: PriceIcon,
        title: "price_setup_page.title",
        roles: [Roles.ADMIN],
        activePaths: [`${PathNames.ADMIN}${PathNames.NOTIFICATION}`],
      },
    ],
    []
  );

  return (
    <div className={styles.sidebar_wrapper}>
      <div className={styles.top}>
        <img src={MiraboImg} alt="Mirabo" />
      </div>

      <div className={styles.bottom}>
        {myselfRedux.me?.role && (
          <RoleBasedMenu
            currentRole={myselfRedux.me.role}
            menuTabs={menuTabs}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
