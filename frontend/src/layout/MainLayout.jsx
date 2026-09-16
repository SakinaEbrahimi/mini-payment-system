import { Outlet } from "react-router-dom";
import NavBar from "../component/Navbar.jsx";

export function MainLayout() {
  return (
    <>
      <NavBar />

      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}
