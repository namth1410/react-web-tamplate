import Admin from "admin/Admin";
import { getMe } from "appdata/myself/myselfSlice";
import { AppDispatch, RootState } from "appdata/store";
import MasterLayout from "layouts/MasterLayout";
import Home from "pages/home/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

function AppRoutes() {
  const dispatch = useDispatch<AppDispatch>();

  const myselfRedux = useSelector((state: RootState) => state.myselfRedux);

  useEffect(() => {
    /**
     * Buộc rerender khi myselfRedux.me thay đổi
     * để điều hướng tới Admin hay Main
     */
    console.log("AppRoutes");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myselfRedux]);

  useEffect(() => {
    dispatch(getMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
