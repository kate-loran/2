import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import { routes } from "../config/routes.tsx";

const Pages = () => {
  return (
    <Routes>
      <Route path={routes.admin.path} element={<AdminPage />} />
    </Routes>
  );
};

export default Pages;
