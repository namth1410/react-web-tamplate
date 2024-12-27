import { useMemo, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./MasterLayout.module.scss";

function MasterLayout() {
  const location = useLocation();
  const pathsNotShowHeader = ["/practice", "/game"];
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const pathname = location.pathname;

  const visibleHeader = useMemo(() => {
    return !pathsNotShowHeader.some((path) => pathname.startsWith(path));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {visibleHeader && <div ref={headerRef}>{/* <HeaderV2 /> */}</div>}
      <div
        ref={contentRef}
        className={`${
          visibleHeader ? styles.master_layout_content_with_header_visible : ""
        } ${styles.master_layout_content}`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default MasterLayout;
