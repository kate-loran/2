import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import { routes } from "../config/routes.ts";
import AdminEdit from "../pages/adminEdit";

const Pages = () => {
  return (
    <Routes>
      <Route path={routes.admin.path} element={<AdminPage />} />
      <Route path={routes.adminEdit.path} element={<AdminEdit />} />
    </Routes>
  );
};

export default Pages;
