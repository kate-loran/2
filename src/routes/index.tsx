import { Route, Routes, useNavigate } from "react-router-dom";
import AdminPage from "../pages/admin";
import { routes } from "../config/routes.ts";
import AdminEdit from "../pages/adminEdit";
import { useEffect } from "react";

const Pages = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.admin.path);
  }, []);

  return (
    <Routes>
      <Route path={routes.admin.path} element={<AdminPage />} />
      <Route path={routes.adminEdit.path} element={<AdminEdit />} />
    </Routes>
  );
};

export default Pages;
