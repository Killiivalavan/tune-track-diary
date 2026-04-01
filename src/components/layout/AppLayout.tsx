import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-14">
      <Outlet />
      <Footer />
    </main>
  </div>
);

export default AppLayout;
