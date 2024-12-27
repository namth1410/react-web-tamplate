import SidebarLayout from "layouts/SidebarLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { PathNames } from "../constants/pathNames";
import Notification from "./pages/notification/Notification";

function Admin() {
  return (
    <Routes>
      <Route path="/" element={<SidebarLayout />}>
        <Route path={PathNames.NOTIFICATION} element={<Notification />} />
        <Route
          path="/"
          element={
            <Navigate to={`${PathNames.ADMIN}${PathNames.NOTIFICATION}`} />
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={`${PathNames.ADMIN}${PathNames.NOTIFICATION}`} />
          }
        />
      </Route>
    </Routes>
  );
}

export default Admin;
