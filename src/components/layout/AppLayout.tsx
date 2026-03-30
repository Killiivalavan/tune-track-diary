import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AppLayout = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Sidebar />
    <main className="ml-[160px] pt-14">
      <Outlet />
      <Footer />
    </main>
  </div>
);

export default AppLayout;
